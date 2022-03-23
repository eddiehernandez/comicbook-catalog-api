import { Router, Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import IUser from 'models/IUser';
import { usersRepo } from '../repos';
import Middleware from './Middleware';

const usersRouter: Router = Router();

//use this for testing purposes only!
usersRouter.get('/', (req: Request, res: Response) => {
    const users = usersRepo.getAllUsers();
    return res.json({
        users,
        count: users.length 
    });
});

usersRouter.post('/register', (req: Request, res: Response) => {
    
    const { email, password } = req.body;
    if ((!email) || (!password))
        return res.status(400).json({
            code: '400',
            message: 'Bad Request: Email and Password are required.'
        });
    
    //TODO: verify if user already exists, if true return 400?
    const validateUser = usersRepo.getUserByEmail(email);
    if (validateUser)
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
});

usersRouter.post('/login', (req: Request, res: Response) => {
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
        Middleware.signJWT(user, (err, token) => {
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




});

export default usersRouter;