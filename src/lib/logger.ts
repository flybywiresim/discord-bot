import winston from 'winston';

const level = () => {
    if (process.env.DEBUG_MODE === 'true') {
        return 'debug';
    }

    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'info';
};

const format = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? winston.format.simple() : winston.format.json();
};

const Logger = winston.createLogger({
    level: level(),
    format: format(),
    transports: [
        new winston.transports.Console(),
    ],
});

export default Logger;
