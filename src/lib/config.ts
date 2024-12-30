type Config = {
    GAMEAPI_URL: string;
    API: string;
    CLIENT_AUTH: string;
    CLIENT_CODE: string;
    WS_URL: string;
    domain: string;
    ORG: string;
    CLIENT_ID: string;
    API_GAMES_NODE: string;
    currency: string;
};

const commonConfig: Pick<Config, 'API' | 'GAMEAPI_URL' | 'WS_URL' | 'API_GAMES_NODE' > = {
    API: "https://lobby-bff.apiusoft.com",
    GAMEAPI_URL: "https://prod-nd.apiusoft.com/api",
    WS_URL: "wss://lobby-bff.apiusoft.com/lobbybff",
    API_GAMES_NODE: "https://prod-nd.apiusoft.com",
};


const configMap: Record<string, Config> = {
    local: {
        CLIENT_ID: '100',
        CLIENT_AUTH: "DJTHDAJARTCHGAMES7DARAJATECHGAMES7123",
        CLIENT_CODE: "DJTH",
        ORG: "DJTH",
        domain: "https://machinevlt.shop/",
        currency:'USD',
        ...commonConfig,
    }
};

const getConfiguration = (): Config => {
    const defaultConfig = configMap['local'];
    return { ...defaultConfig };
};

const getHeaders = (): Record<string, string> => {
    const config = getConfiguration();
    return {
        "Content-Type": "application/json;charset=UTF-8",
        "clientAuth": config.CLIENT_AUTH,
        "client": config.CLIENT_CODE,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Accept": "application/json"
    };
};