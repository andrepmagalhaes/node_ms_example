import express from 'express'
import {routes} from './routes'



export default class App {
    private app:express.Application;
    private port:number;

    constructor(port:number)
    {
        this.port = port;
        this.app = express();
        this.initMiddlewares();
        this.initRoutes();
    }

    private initMiddlewares():void
    {
    }

    private initRoutes():void
    {
        routes.forEach(el => {
            this.app.use('/', el.getRouter());
        });
    }

    public listen():void
    {
        this.app.listen(this.port, () => {
            console.log(`products-service listening @${this.port}`);
        });
    }

    public getApp():express.Application
    {
        return this.app;
    }

}