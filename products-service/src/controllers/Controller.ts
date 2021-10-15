import { Router } from "express";
import { Connection } from 'amqplib'

export class Controller
{
    private router:Router = Router();
    private queueConnection:Connection;

    constructor(queueConnection:Connection)
    {
        this.queueConnection = queueConnection;
        this.initRoutes();
    }

    protected initRoutes():void
    {
    }

    protected getQueueConnecton():Connection
    {
        return this.queueConnection;
    }

    public getRouter():Router
    {
        return this.router;
    }

    public getPath()
    {
    }

}