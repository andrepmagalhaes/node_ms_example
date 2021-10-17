import App from "./App";
require('dotenv').config()

const app = new App(Number(process.env.PRODUCTS_API_PORT));

app.listen();