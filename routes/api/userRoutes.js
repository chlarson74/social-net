const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend,
} = require('../../controllers/userConrollers');

router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend);
// api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;    