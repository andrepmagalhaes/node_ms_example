import { Request, Response, NextFunction, Router } from "express";
import { route } from "../types";

class ToEmail implements route
{
    private router:Router = Router();
    private path:string = '/toEmail';
    private queueConnection;

    constructor(queueConnection)
    {
        this.queueConnection = queueConnection;
        this.initRoutes();
    }

    private async productsToEmail(req:Request, res:Response, next:NextFunction)
    {
        const params = {
            accountName: req.body.accountName,
            enviroment: req.body.enviroment,
            targetEmail: req.body.targetEmail
        }

        
        
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