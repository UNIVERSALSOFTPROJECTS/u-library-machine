import { setConfiguration } from "./configService";

const commonConfig: Pick<Config, 'API' | 'GAMEAPI_URL' | 'WS_URL' | 'API_GAMES_NODE' > = {
    API: "https://lobby-bff.apiusoft.com",
    GAMEAPI_URL: "https://prod-nd.apiusoft.com/api",
    WS_URL: "wss://lobby-bff.apiusoft.com/lobbybff",
    API_GAMES_NODE: "https://prod-nd.apiusoft.com",
};

export default{
    start:()=>{
        setConfiguration({
            CLIENT_ID: '100',
            CLIENT_AUTH: "DJTHDAJARTCHGAMES7DARAJATECHGAMES7123",
            CLIENT_CODE: "DJTH",
            ORG: "DJTH",
            domain: "https://machinevlt.shop/",
            currency:'USD',
            platform:'Dajaratech',
            ...commonConfig,
        });
    }
}