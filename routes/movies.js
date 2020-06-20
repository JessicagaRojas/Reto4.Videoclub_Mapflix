const router = require('express').Router();
const MovieController = require('../controllers/MovieController.js')

router.get('/allmovies', MovieController.getAllmovies);
router.get('/title/:title', MovieController.searchtitle);
router.get('/id/:id', MovieController.searchId);

module.exports = router;