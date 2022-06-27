import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../startup/config';
import Logger from '../utils/Logger';


const extractJWT = (req: Request, res: Response, next: NextFunction) => {
        
    const token = req.headers.authorization?.split(' ')[1];

    if (!token){
        Logger.error('no token was found in header');
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

export {extractJWT};