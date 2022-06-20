import config from './config';
import application from './app';
import { usersRepo, comicsRepo } from './repos';

import text from './test';

import express from 'express';
const app = express()
console.log(config.port);
// const app = application(config, usersRepo, comicsRepo);
const PORT : string|number = process.env.PORT || 5000;

app.use("*",(req, res) =>{
    res.send("<h1>Welcome to your simple server! Awesome right</h1>" + text + ' -- port =' + config.port.toString());
});

app.listen(PORT,() => console.log(`hosting @${PORT}`));