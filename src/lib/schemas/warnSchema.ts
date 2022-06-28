import mongoose, { Schema } from 'mongoose';

const warnSchema = new Schema({
    userID: String,
    moderator: String,
    reason: String,
    date: Date,
});

const Warn = mongoose.model('Warn', warnSchema);

export default Warn;
