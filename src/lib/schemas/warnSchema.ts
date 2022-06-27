import { Schema } from 'mongoose';

const warnSchema = new Schema({
    userID: String,
    moderator: String,
    reason: String,
    date: Date,
});

export default warnSchema;
