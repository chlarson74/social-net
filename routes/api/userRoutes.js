const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('./userRoutes');

// api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
    .route('/:userID')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;    