import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import IUser from '../models/IUser';

export default class Middleware {
    
    public static extractJWT (req: Request, res: Response, next: NextFunction){
        
        const token = req.headers.authorization?.split(' ')[1];

        if (!token){
            console.log('no token was found in header');
            return res.status(401).json({
                code: '401',
                message: 'Unauthorized'
            });

        }
        else {

            jwt.verify(token, config.token.secret, (err, decoded) => {
                if (err) {
                    return res.status(404).json({
                        code: '404',
                        message: err.message,
                        error: err
                    });
                }
                else {
                    res.locals.jwt = decoded;
                    next();
                }

            });            
        }

    }


    public static signJWT (user: IUser, callback: (error: Error | null, token: string | null) => void): void {
        const timeNow = new Date().getTime();
        const expirationTime = timeNow + Number(config.token.expireTime) * 100000; // time in ms
        const expirationTimeInSecs = Math.floor(expirationTime / 1000);


        try {
            jwt.sign({
                email: user.email
            },
            config.token.secret,
            {
                issuer: config.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSecs
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                }
                else if (token){
                    callback(null, token);
                }
                else {
                    callback(new Error('Unexpected: no token found'), null);
                }
            })
        }
        catch (error){
            console.log(error);
            callback(<Error> error, null);

        }

    }


}