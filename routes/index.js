// controllers/api/index.js based on the 27-mini project.
const router = requrie('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send('Incorrect route.'));

module.exports = router;