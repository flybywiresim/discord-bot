import mongoose from 'mongoose';

const serverSchema = new mongoose.Schema({
    serverId: {
        default: '1',
        type: String,
    },
    name: {
        default: 'emptyServer',
        type: String,
    },
    members: [],
});

export default mongoose.model('Server', serverSchema, 'servers');
