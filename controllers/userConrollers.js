const { User, Thought } = require('../models');

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
            const user = await user.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }//research this
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with this id.' });
            };
            res.json(user);
        }   catch (err) {
            res.status(500).json(err);
        }
    },

    // * `DELETE` to remove user by its `_id`
    async deleteUser(req, res) {
        try {
            const user = await user.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that id.' });
            }
            // **BONUS**: Remove a user's associated thoughts when deleted.
            await Thought.deleteMany({ _id: { $in: user.thoughts } });//check on this
            res.json({ message: 'User and thoughts deleted.' });
        }   catch (err) {
            res.status(500).json(err);
        }
    }


// **`/api/users/:userId/friends/:friendId`**  // ask tutor about this

// * `POST` to add a new friend to a user's friend list

// * `DELETE` to remove a friend from a user's friend list

}