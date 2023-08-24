// ### API Routes
const { Schema, model } = require('mongoose');

// **`/api/users`**
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    {
    toJSON: { // virtuals are part of the acceptance criteria
        virtuals: true,
    },
    id: false, // id: false won't return the id of the thought element
    }
);
userSchema.virtual('friendCount').get(function(){
    return this.friends.length //gets information of friends length, computed properties, isn't stored in db
});

const User = model('User', userSchema);

module.exports = User

// User:

// username

    // String
    // Unique
    // Required
    // Trim

// email

    // String
    // Required
    // Unique
    // Must match a valid email address (look into Mongoose's matching validation)

// thoughts

    // Array of _id values referencing the Thought model
    // friends

// Array of _id values referencing the User model (self-reference)

// Schema Settings:

    // Create a virtual called friendCount that retrieves the length of the user's friends array field on query.