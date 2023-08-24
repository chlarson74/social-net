const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
// * `GET` to get all thoughts
async getthoughts(req, res) {
    try {
      const thoughts = await thought.find();
      const thoughtObj = {
        // ```json
        // // example data
        // {
        //   "thoughtText": "Here's a cool thought...",
        //   "username": "lernantino",
        //   "userId": "5edff358a0fcb779aa7b118b"
        // }
        // ```
      };
      return res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
// * `GET` to get a single thought by its `_id`
async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')  // research this
        .lean(); // research this

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json({
        thought,
        grade: await grade(req.params.thoughtId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
// * `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },


// * `PUT` to update a thought by its `_id`
async updateThought(req, res) {
    try {
        const thought = await thought.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }//research this
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id.' });
        };
        res.json(thought);
    }   catch (err) {
        res.status(500).json(err);
    }
},


// * `DELETE` to remove a thought by its `_id`
async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' })
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought deleted, but no users found',
        });
      }

      res.json({ message: 'thought successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
}

// ---

// **`/api/thoughts/:thoughtId/reactions`**

// * `POST` to create a reaction stored in a single thought's `reactions` array field

// * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
