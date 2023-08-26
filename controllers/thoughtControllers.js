const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../model');

module.exports = {
// * `GET` to get all thoughts
async getThoughts(req, res) {
  //   try {
  //     const thought = await Thought.find();
  //     const thoughtObj = {
  //       // ```json
  //       // // example data
  //       // {
  //       //   "thoughtText": "Here's a cool thought...",
  //       //   "username": "lernantino",
  //       //   "userId": "5edff358a0fcb779aa7b118b"
  //       // }
  //       // ```
  //     };
  //     return res.json(thoughtObj);
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json(err);
  //   }
  // },
    try {
      const thoughts = await Thought.find(); // Fetch thoughts from the database
      return res.json(thoughts); // Return the fetched thoughts
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find(); // Fetch thoughts from the database
      return res.json(thoughts); // Return the fetched thoughts
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
      console.log(err);
    }
  },


// * `PUT` to update a thought by its `_id`
async updateThought(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
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
  // ---

// **`/api/thoughts/:thoughtId/reactions`**

// * `POST` to create a reaction stored in a single thought's `reactions` array field
  // * `POST` to add a new reactions to a user's reactions list
async createReactions(req, res) {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'thought not found' });
    }

const reactionsId = req.params.reactionsId

    // Push the new reactions to the reactions array of the user
    thought.reactions.push(req.body);
    await thought.save();

    return res.status(201).json({ message: 'reactions created' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},
// * `DELETE` to remove a reactions from a user's reactions list
async deleteReactions(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
      $pull:{reactions:req.params.reactionsId}
    },
    {
      new:true
    });
    if (!thought) {
      return res.status(404).json({ message: 'thought not found' });
    }
      // await thought.save();
  
    return res.json({ message: 'reaction removed' });
  } catch (err) {
    return res.status(500).json(err);
    console.log(err);
  }
},
}


