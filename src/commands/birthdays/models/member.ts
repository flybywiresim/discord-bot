import { Schema, model } from 'mongoose';

const memberSchema = new Schema({
    birthday: {
        default: '',
        type: Date,
    },
    user: {
        default: '',
        type: String,
    },
});

export default model('Member', memberSchema, 'members');
