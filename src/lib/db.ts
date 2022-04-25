import mongoose from 'mongoose';

var _connection: mongoose.Connection;

export async function connect(url, callback) {
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

export async function getConn(callback) {
    if (!_connection || _connection.readyState !== mongoose.ConnectionStates.connected) {
        callback(new Error('Not connected to database'));
    } else {
        return _connection;
    }
}

