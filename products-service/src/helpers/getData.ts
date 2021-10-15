import axios, { AxiosRequestConfig } from 'axios';

export async function getData(path:string, options:AxiosRequestConfig)
{
    try
    {
        return await (await axios.get(path, options)).data;

    }
    catch (err) {
        console.error(err);
    }
}

