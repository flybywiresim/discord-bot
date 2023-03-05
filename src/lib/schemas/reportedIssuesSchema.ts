import mongoose, { Schema } from 'mongoose';

const reportedIssuesCommandSchema = new Schema({
    id: String,
});

const ReportedIssuesCommand = mongoose.model('ReportedIssuesCommand', reportedIssuesCommandSchema);

export default ReportedIssuesCommand;
