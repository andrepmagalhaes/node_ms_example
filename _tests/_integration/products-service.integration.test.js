const req = require("supertest");
const server = require("../../products-service/src/server");
//const params = require("./params");

const params = {
    accountName: "apiexamples",
    enviroment: "vtexcommercestable",
    targetEmail: "andrepimentelm@gmail.com"
}

describe('products-service integration test', () => {
    it('GET /toEmail', () => {
        return req(server).get('/toEmail').send({
            accountName: params.accountName,
            environment: params.enviroment,
            targetEmail: params.targetEmail
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
           expect(res.body).toEqual(
               expect.objectContaining({
                   msg: expect("Email sent")
               })
           );
        });
    });
});