import IConfig from './models/IConfig';
import dotenv from 'dotenv'
dotenv.config();

const PORT: number = parseInt(<string> process.env.PORT, 10) || 3000;
const TOKEN_EXPIRETIME: number = parseInt(<string> process.env.TOKEN_EXPIRETIME_SECS, 10) || 3600 //one hour default;
const TOKEN_ISSUER: string = <string> process.env.TOKEN_ISSUER || 'MyTestIssuer';
const TOKEN_SECRET: string = <string> process.env.TOKEN_SECRET || 'supersecret';

const config: IConfig = {
    port: PORT,
    token: {
        expireTime: TOKEN_EXPIRETIME,
        issuer: TOKEN_ISSUER,
        secret: TOKEN_SECRET
    }
};

export default config;