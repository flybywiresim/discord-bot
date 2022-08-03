import mongoose, { Schema } from 'mongoose';

const walletSchema = new Schema({
    userId: String,
    balance: Number,
    lastIssued: Date,
    lastUpdated: Date,
});

const Wallet = mongoose.model('Wallet', walletSchema);
export default Wallet;
