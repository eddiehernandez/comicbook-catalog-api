import config from './config';
// import WebApplication from './WebApplication';
import application from './app';

const app = application(config);
// const app = (new WebApplication(config)).getApp();

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});