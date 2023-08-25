const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReactions,
    deleteReactions,
} = require('../../controllers/thoughtControllers');

// api/Thoughts
router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId/reactions').post(createReactions)
router.route('/:thoughtId/reactions/:reationId').delete(deleteReactions);

// /api/Thoughts/:ThoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)
    
// check on this route. discovered through research
// router.post('/:thoughtId/reactions', thoughtController.createReaction);
// router.delete('/:thoughtId/reactions/:reactionId', thoughtController.deleteReaction);

module.exports = router;  