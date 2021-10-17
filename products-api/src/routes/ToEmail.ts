import { Request, Response, NextFunction, Router } from "express";
import { route } from "../types";
import RabbitmqServer from "../rabbitmqServer";
import axios from "axios";



export class ToEmail implements route
{
    private path:string = '/toEmail';
    private router:Router = Router();

    constructor()
    {      
        this.initRoutes();
    }

    private initRoutes():void
    {
        this.router.get(this.path, this.productsToEmail);
    }

    private async productsToEmail(req:Request, res:Response, next:NextFunction)
    {    
        const params = {
            path: req.query.path,
            targetEmail: req.query.targetEmail
        }
        

        const validateEmail:boolean = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(params.targetEmail));

        const validateUrl:boolean = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(String(params.path));
        

        if((params.path === undefined) ||(params.targetEmail === undefined) || !validateEmail || !validateUrl)
        {
            return res.status(400).json("400 Bad Request");
        }

        try
        {
            const result:any = await axios.get((params.path as string), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if(typeof(result.data) !== 'object')
            {
                return res.status(400).json("400 Bad Request");
            }

            const queueHost:string = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;
            
            const rabbitmqServer:RabbitmqServer = new RabbitmqServer(queueHost);
            await rabbitmqServer.start();
            await rabbitmqServer.publishInQueue(process.env.RABBITMQ_SEND_EMAIL_QUEUE, JSON.stringify({...params, numProducts: result.data.length}));
            return res.status(200).json("Email sent");

        }
        catch(err:any)
        {
            console.error(err);
            return res.status(err.response.status).json(`${err.response.status} ${err.response.statusText}`);
        }
        

    }

    public getRouter():Router
    {
        return this.router;
    }

}