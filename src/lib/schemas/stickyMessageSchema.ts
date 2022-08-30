import mongoose, { Schema } from 'mongoose';

const stickyMessageSchema = new Schema({
    channelId: {
        type: String,
        unique: true,
    },
    message: String,
    timeInterval: Number,
    messageCount: Number,
    moderator: String,
    updatedDate: Date,
    lastPostedId: String,
});

const stickyMessage = mongoose.model('StickyMessage', stickyMessageSchema);

export default stickyMessage;
