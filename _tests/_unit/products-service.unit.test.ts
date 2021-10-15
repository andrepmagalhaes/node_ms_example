import { getData } from "../../products-service/src/helpers";
import { params as parameters } from './params'



describe('products-service unit test', () => {

    const params = parameters;

    it('getData helper status -->', () => {
        getData(params.path, params.options)
        .then((res:any) => {
            expect(res.status).toBe(200);
        });
        
    });

    it('getData helper length -->', () => {
        getData(params.path, params.options)
        .then((res:any) => {
            expect(res.data.length).toBe(200);
        });
    });
});