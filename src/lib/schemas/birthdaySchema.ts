import { Schema } from 'mongoose';

const birthdaySchema = new Schema({
    userID: String,
    month: Number,
    day: Number,
    lastYear: Number,
});

export default birthdaySchema;