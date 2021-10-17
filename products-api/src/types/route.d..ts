import { Router } from 'express';

interface getRouter {
    (): Router
}

interface getPath {
    (): string
}

interface initRoutes {
    (): void
}

export interface route{
    getRouter:getRouter
}