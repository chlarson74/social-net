// **`/api/thoughts`**
const { Schema, model } = require('mongoose');

// Schema for what makes up a thought
const thoughtSchema = new Schema({
    thoughtText: String,
    username: String,
    userID: Number,

});

// Initialize the thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;