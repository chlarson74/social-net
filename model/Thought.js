// **`/api/thoughts`**
const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
        type: Schema.Types.ObjectId, // Use Mongoose's ObjectId data type
        default: ()=> new Types.ObjectId() // Default value is set to a new ObjectId
        },
        reactionBody: {
            type: String,
            require: true,
            minLength:1,
            maxLength:280
        },
        username: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => timestamp
        }
    },
    {
        toJSON: { // virtuals are part of the acceptance criteria
            virtuals: true,
        },
        id: false, // id: false won't return the id of the thought element
        }
)

// Schema for what makes up a thought
const thoughtSchema = new Schema(
    {

    thoughtText: {
        type: String,
        require: true,
        minLength:1,
        maxLength:280
    },
    username: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => timestamp //needs a formating library like dayjs
    },
    reactions: [reactionSchema], //stores a subdocument instead of id  
    },
    {
        toJSON: { // virtuals are part of the acceptance criteria
            virtuals: true,
        },
        id: false, // id: false won't return the id of the thought element
        }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length //gets information of reaction length, computed properties, isn't stored in db
});

// Initialize the thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

// Thought:

// thoughtText
// String
// Required
// Must be between 1 and 280 characters

// createdAt
    // Date
    // Set default value to the current timestamp
    // Use a getter method to format the timestamp on query

// username (The user that created this thought)
    // String
    // Required

// reactions (These are like replies)
    // Array of nested documents created with the reactionSchema


// Schema Settings:

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.