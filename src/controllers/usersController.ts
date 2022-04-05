import { Request, Response } from 'express';
import { usersRepo } from '../repos';
import bcryptjs from 'bcryptjs';
import IUser from 'models/IUser';
import jwt from 'jsonwebtoken';
import IConfig from 'models/IConfig';
import IUsersRepo from 'repos/IUsersRepo';
import { ExpressRouteFunction } from '../types';


const getAllUsersHandler = (usersRepo: IUsersRepo): ExpressRouteFunction => {
    return (req: Request, res: Response) => {
        const users = usersRepo.getAllUsers();
        return res.json({
            users,
            count: users.length 
        });  
    }
}


const loginUserHandler = (config: IConfig, usersRepo: IUsersRepo): ExpressRouteFunction => {

    return (req: Request, res: Response) => {
        const { email, password } = req.body;
    
        // validate email and pasword
        if ((!email) || (!password))
            return res.status(400).json({
                code: '400',
                message: 'Email and password required'
            });
    
        try {
            const user = usersRepo.getUserByEmail(email);
    
            //validate if user exists
            if (!user)
                return res.status(404).json({
                    code: '404',
                    message: `User with email: ${email} not found.`
                })            
    
            //authenticate passwords
            const validPassword: boolean = bcryptjs.compareSync(password, user.password);
            if (!validPassword)
                return res.status(401).json({
                    code: '401',
                    message: 'Unauthorized'
                });
    
            //generate token
            signJWT(config, user, (err, token) => {
                if (err){
                    console.log('Unable to sign token');
                    console.log(err);
                    return res.status(401).json({
                        code: '401',
                        message: 'Unauthorized',
                        error: err
                    });  
                }
                else if (token){
                    return res.json({
                        message: 'Authentication successful',
                        token: token,
                        user: {
                            email: user.email
                        }
                    });
                }
            });
        }
        catch (error){
            return res.status(500).json({
                code: '500',
                message: error
            })        
        }
    }
    
}


const registerUserHandler = (usersRepo: IUsersRepo): ExpressRouteFunction => {
    
    return (req: Request, res: Response) => {
        const { email, password } = req.body;
        if ((!email) || (!password))
            return res.status(400).json({
                code: '400',
                message: 'Bad Request: Email and Password are required.'
            });
        
    
        const userFound: IUser | undefined = usersRepo.getUserByEmail(email);
        if (userFound)
            return res.status(409).json({
                code: '409',
                message: `User with email: ${email} already exists.`
            })
       
        bcryptjs.hash(password, 10, (err, hash) => {
            if (err)
                return res.status(500).json({
                    code: '500',
                    message: err.message,
                    error: err
                });
            
            const user: IUser = {
                email: email,
                password: hash
            };
    
            try {
                const newUser = usersRepo.addUser(user);
                return res.status(201).send({
                    email: newUser.email,
                    password: '###############'
                });        
            }
            catch (error){
                return res.status(500).json({
                    code: '500',
                    message: error
                })
            }
    
        })
    }
}


//internal function
const signJWT = (config: IConfig, user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
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

export { getAllUsersHandler, registerUserHandler, loginUserHandler };