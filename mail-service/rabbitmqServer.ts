import { Connection, Channel, connect, Message, ConsumeMessage } from "amqplib";

export default class RabbitmqServer {
    private conn: Connection;
    private channel: Channel;
    private uri: string;

    constructor(uri:string)
    {
        this.uri = uri;
    }

    public async start(): Promise<void> {
        this.conn = await connect(this.uri);
        this.channel = await this.conn.createChannel();
    }

    public async publishInQueue(queue: string, message: string) {
        await this.channel.assertQueue(queue);
        return this.channel.sendToQueue(queue, Buffer.from(message));
    }

    public async consume(queue: string, callback: (message: Message) => void) {
        await this.channel.assertQueue(queue);
        return this.channel.consume(queue, (message: ConsumeMessage) => {
            callback(message);
            this.channel.ack(message);
        });
    }
}