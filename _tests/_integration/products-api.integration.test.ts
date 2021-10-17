import supertest from 'supertest';
import App from '../../products-api/src/App';

beforeEach(() => {
    process.env = (Object.assign(process.env, {
        RABBITMQ_HOST:"localhost",
        RABBITMQ_PORT:"5672",
        RABBITMQ_PANEL_PORT:"15672",
        RABBITMQ_USER:"admin",
        RABBITMQ_PASSWORD:"admin",
        RABBITMQ_SEND_EMAIL_QUEUE:"sendEmailQueue"
    }))
});

describe('products-service integration test', () => {
    const params = {
        path: "https://jsonplaceholder.typicode.com/todos",
        targetEmail: "andrepimentelm@gmail.com"
    }

    it('GET /toEmail', async () => {
        await supertest(new App(1234).getApp())
        .get(`/toEmail`)
        .query(params)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect('"Email sent"')

    });
});