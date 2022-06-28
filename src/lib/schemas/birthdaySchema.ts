import mongoose, { Schema } from 'mongoose';

const birthdaySchema = new Schema({
    userID: String,
    month: Number,
    day: Number,
    utcDatetime: Date,
    timezone: Number,
});

const Birthday = mongoose.model('Birthday', birthdaySchema);

export default Birthday;
