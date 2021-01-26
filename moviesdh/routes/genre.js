let express = require('express');
let router = express.Router();
let moviesController = require('../controllers/moviesController');

router.get('/', moviesController.showGenre)
router.get('/:id', moviesController.actuallyShowGenre);

module.exports = router;