import application from './app';
import config from './config';


const app = application(config);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});