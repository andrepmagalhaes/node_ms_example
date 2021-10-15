import { Request, Response, NextFunction, Router } from "express";
import { route } from "../types";
import { Connection } from 'amqplib'
import { getData } from "../helpers";

class ToEmail implements route
{
    private router:Router = Router();
    private path:string = '/toEmail';
    private queueConnection:Connection;

    constructor(queueConnection: Connection)
    {
        this.queueConnection = queueConnection;
        this.initRoutes();
    }

    private async productsToEmail(req:Request, res:Response, next:NextFunction)
    {
        const params = {
            path: req.body.path,
            targetEmail: req.body.targetEmail
        }

        getData(params.path, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res:any) => {
            
        })
        
    }

    private initRoutes()
    {

    }

    public getRouter():Router
    {
        return this.router;
    }

    public getPath():string
    {
        return this.path;
    }

}