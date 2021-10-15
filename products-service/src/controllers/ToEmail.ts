import { Request, Response, NextFunction, Router } from "express";
import { route } from "../types";
import { Connection } from 'amqplib'
import { getData as requestFromApi } from "../helpers";
import { Controller } from './Controller'

export class ToEmail extends Controller implements route
{
    private path:string = '/toEmail';

    constructor(queueConnection:Connection)
    {
        super(queueConnection);
    }

    private async productsToEmail(req:Request, res:Response, next:NextFunction)
    {
        const params = {
            path: req.body.path,
            targetEmail: req.body.targetEmail
        }

        requestFromApi(params.path, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((data:any) => {
            if((data.status == 200) || (data.status == 206))
            {

            }

            return res.status(data.status).json(`Error ${data.status}`)
        });  
    }

    protected initRoutes():void
    {
        super.getRouter().get(this.path, this.productsToEmail);
    }

    public getRouter():Router
    {
        return super.getRouter();
    }

    public getPath():string
    {
        return this.path;
    }

}