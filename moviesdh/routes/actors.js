let express = require('express');
let router = express.Router();
let moviesController = require('../controllers/moviesController');

router.get('/', moviesController.showActor);
router.get('/:id', moviesController.showActorAgain);

module.exports = router;