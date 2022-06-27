import config from './startup/config';
import application from './app';
import {usersRepo, comicsRepo}  from './repos';
import Logger from './utils/Logger';

// initialize application and inject dependencies
const app = application(config, usersRepo, comicsRepo);

app.listen(config.port, () => {
    Logger.info(`Server running on port ${config.port}`);
});