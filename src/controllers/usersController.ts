import { Request, Response } from 'express';
import { usersRepo } from '../repos';
import bcryptjs from 'bcryptjs';
import IUser from 'models/IUser';
import jwt from 'jsonwebtoken';
import IConfig from 'models/IConfig';
import IUsersRepo from 'repos/IUsersRepo';
import { ExpressRouteFunction } from '../types';
import Logger from '../utils/Logger';


const getAllUsersHandler = (usersRepo: IUsersRepo): any => {
    return async (req: Request, res: Response) => {
        const users = await usersRepo.getAllUsers();
        return res.json({
            users,
            count: users.length 
        });  
    }
}


const loginUserHandler = (config: IConfig, usersRepo: IUsersRepo): any => {

    return async (req: Request, res: Response) => {
        const { email, password } = req.body;
    
        // validate email and pasword
        if ((!email) || (!password))
            return res.status(400).json({
                code: '400',
                message: 'Email and password required'
            });
    
        try {
            const user = await usersRepo.getUserByEmail(email);
    
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
                    Logger.error('Unable to sign token', err);
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


const registerUserHandler = (usersRepo: IUsersRepo): any => {
    
    return async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if ((!email) || (!password) || (!validEmail(email)) || (!validPassword(password)))
            return res.status(400).json({
                code: '400',
                message: 'Bad Request: Email and Password are missing or invalid.'
            });
        
    
        const userFound: IUser | undefined = await usersRepo.getUserByEmail(email);
        if (userFound)
            return res.status(409).json({
                code: '409',
                message: `User with email: ${email} already exists.`
            })
       
        bcryptjs.hash(password, 10, async (err, hash) => {
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
                const newUser = await usersRepo.addUser(user);
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

    try {
        jwt.sign({
            email: user.email
        },
        config.token.secret,
        {
            issuer: config.token.issuer,
            algorithm: 'HS256',
            expiresIn: config.token.expireTime
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
        Logger.error('Error signing jwt', error);
        callback(<Error> error, null);

    }

}

const validEmail = (email: string): boolean => {
    return (new RegExp(/^\S+@\S+\.\S+$/)).test(email);
}

const validPassword = (password: string): boolean => {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    return (new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).test(password);
}

export { getAllUsersHandler, registerUserHandler, loginUserHandler, validEmail, validPassword };