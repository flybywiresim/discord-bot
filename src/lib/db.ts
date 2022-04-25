import mongoose from 'mongoose';
import Logger from './logger';

var _connection: mongoose.Connection;

export async function connect(url: string, callback = Logger.error) {
    try {
        await mongoose.connect(url);
        _connection = mongoose.connection;
    } catch ({ name, message, stack }) {
        callback({ name, message, stack });
    }

    mongoose.connection.on('error', err => {
        callback(err);
    });
}

export async function getConn(callback = Logger.error) {
    if (!_connection || _connection.readyState !== mongoose.ConnectionStates.connected) {
        callback(new Error('Not connected to database'));
    } else {
        return _connection;
    }
}

