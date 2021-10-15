import express from 'express'
import { route } from './types'
import amqp from 'amqplib';
import * as controllers from './controllers'


class App {
    private app:express.Application;
    private queueConnection:Promise<amqp.Connection | undefined>;

    constructor(port:number, routes:Array<route>)
    {
        this.app = express();
        this.initMiddlewares();
        this.queueConnection = this.initQueueService();
        this.initRoutes(routes);
        this.listen(port);
    }

    private async initQueueService()
    {
        try
        {
            return await amqp.connect(`amqp://${process.env.HOST}:${process.env.RABBITMQ_PORT}`);
        }
        catch(err)
        {
            console.error(err);
        }
    }

    private initMiddlewares():void
    {

    }

    private initRoutes(routes:Array<route>):void
    {

    }

    public listen(port:number):void
    {
        this.app.listen(port, () => {
            console.log(`products-service listening @${port}`);
        });
    }

    public getApp():express.Application
    {
        return this.app;
    }

}