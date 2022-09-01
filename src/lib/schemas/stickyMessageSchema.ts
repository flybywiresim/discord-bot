import mongoose, { Schema } from 'mongoose';

const stickyMessageSchema = new Schema({
    channelId: {
        type: String,
        unique: true,
    },
    message: String,
    imageUrl: String,
    timeInterval: Number,
    messageCount: Number,
    moderator: String,
    updatedTimestamp: Date,
    lastPostedId: String,
});

const stickyMessage = mongoose.model('StickyMessage', stickyMessageSchema);

export default stickyMessage;
