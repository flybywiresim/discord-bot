import mongoose, { Schema } from 'mongoose';

const temporaryCommandSchema = new Schema({
    command: String,
    moderator: String,
    content: String,
    date: Date,
    title: String,
    severity: String,
});

const TemporaryCommand = mongoose.model('TemporaryCommand', temporaryCommandSchema);

export default TemporaryCommand;
