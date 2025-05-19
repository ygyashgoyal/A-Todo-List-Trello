// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    status: String,
    userId: String, // store Firebase or OAuth UID
});

module.exports = mongoose.model("Task", taskSchema);
