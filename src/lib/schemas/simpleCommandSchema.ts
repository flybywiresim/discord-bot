import mongoose, { Schema } from 'mongoose';

const simpleCommandSchema = new Schema({
    command: String,
    moderator: String,
    content: String,
    date: Date,
    title: String,
    severity: String,
});

const SimpleCommand = mongoose.model('SimpleCommand', simpleCommandSchema);

export default SimpleCommand;
