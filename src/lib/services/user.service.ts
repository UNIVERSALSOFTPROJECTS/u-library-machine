import axios from "axios";
import { getConfig, getHeaders } from "$lib/configService";

const conf = getConfig();
const headers = getHeaders();

export const userService = (() => {
    const login = async (username: string, password: string) =>  {
        let url = { username, password, org: conf.ORG };
        const response = await axios.post(`${conf.API}/login`, url, { headers });
        return response.data;
    }
    const getBalance = (userToken:string) => {
        let url = `${conf.API}/balance/${userToken}`;
        return axios.get(url, { headers });
    }

    return { login, getBalance }
})();