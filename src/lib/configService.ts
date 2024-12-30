let config:any;
let headers = {};

export const setConfiguration = (data:any) => {
    config = data;
    headers = {
        "Content-Type": "application/json",
        "clientAuth": config.CLIENT_AUTH,
        "client": config.CLIENT_CODE,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Accept": "application/json"
    };
};

export const getConfig = () => config;
export const getHeaders = () => headers;