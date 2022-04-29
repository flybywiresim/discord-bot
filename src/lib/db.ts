import mongoose from 'mongoose';
import Logger from './logger';

import birthdaySchema from './schemas/birthdaySchema';

var _connection: mongoose.Connection;

export async function connect(url: string, callback = Logger.error) {
    try {
        await mongoose.connect(url);
        _connection = mongoose.connection;

        // Register schemas
        _connection.model("Birthday", birthdaySchema);
    } catch ({ name, message, stack }) {
        callback({ name, message, stack });
    }

    mongoose.connection.on('error', err => {
        callback(err);
    });
}

export function getConn(callback = Logger.error) {
    if (!_connection || _connection.readyState !== mongoose.ConnectionStates.connected) {
        callback(new Error('Not connected to database'));
    } else {
        return _connection;
    }
}