import config from './config';
// import WebApplication from './WebApplication';
import application from './app';
import {usersRepo, comicsRepo}  from './repos';

// initialize application and inject dependencies
const app = application(config, usersRepo, comicsRepo);
// const app = (new WebApplication(config)).getApp();

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});