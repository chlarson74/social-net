const { User, Thought } = require('../model');

module.exports = {
    // * `GET` all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // * `GET` a single user by its `_id` and populated thought and friend data
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v'); //Code from mini-project 27 - Research it.

            if (!user) {
                return res.status(404).json({ message: 'No user with that id.'});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // * `POST` a new user:
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);//research req.body
            res.json(user);
            // ```json
            // // example data
            // {
            //   "username": "lernantino",
            //   "email": "lernantino@gmail.com"
            // }
            // ````
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // * `PUT` to update a user by its `_id`
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }//research this
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with this id.' });
            };
            res.json(user);
        }   catch (err) {console.log(err);
            res.status(500).json(err);
        }
    },

    // * `DELETE` to remove user by its `_id`
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that id.' });
            }
            // **BONUS**: Remove a user's associated thoughts when deleted.
            await Thought.deleteMany({ _id: { $in: user.thoughts } });//check on this
            res.json({ message: 'User and thoughts deleted.' });
        }   catch (err) {
            res.status(500).json(err);
        }
    },


// **`/api/users/:userId/friends/:friendId`**  // ask tutor about this



// * `POST` to add a new friend to a user's friend list
async createFriend(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }

const friendId = req.params.friendId

      // Push the new friend to the friends array of the user
      user.friends.push(friendId);
      await user.save();

      return res.status(201).json({ message: 'friend created' });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
// * `DELETE` to remove a friend from a user's friend list
  async deleteFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, {
        $pull:{friends:req.params.friendId}
      },
      {
        new:true
      });
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
// console.log(user.friends);
//       // Find the index of the friend with the given friendId
//       const friendIndex = user.friends.findIndex(friend => friend._Id.toString() === req.params.friendId);
//       if (friendIndex === -1) {
//         return res.status(404).json({ message: 'friend not found' });
//       }

//       // Remove the friend
//       user.friends.splice(friendIndex, 1);
//       await user.save();
    
      return res.json({ message: 'friend removed' });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
}







//second set of routes -- user and controllers -- thought routes and thought controllers