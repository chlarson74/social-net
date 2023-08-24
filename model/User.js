// ### API Routes
const { Schema, model } = require('mongoose');

// **`/api/users`**
const userSchema = new Schema(
    {
        username: String,
        email: String ,
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    },
    {
    toJSON: { // virtuals are part of the acceptance criteria
        virtuals: true,
    },
    id: false, // id: false won't return the id of the thought element
    }
);