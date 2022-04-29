import { Schema } from 'mongoose';

const birthdaySchema = new Schema({
    userID: String,
    guildID: String,
    birthday: Date,
    channelID: String,
    lastUpdated: Date,
});

export default birthdaySchema;