import methods from './Methods'

export interface route {
    path:String,
    controller:Function,
    method:methods.methods,
    children:Array<route>
}