var express = require('express');
var router = express.Router();
let moviesController = require('../controllers/moviesController')

router.get('/new', moviesController.showNew);
router.get('/recommended', moviesController.showRecommended);
router.get('/search', moviesController.search);
router.get('/add', moviesController.add);
router.post('/add', moviesController.addMovie);
router.post('/search', moviesController.searchIndex);
router.get('/detail/:id', moviesController.findMovie);
router.get('/edit/:id/associate', moviesController.associate);
router.put('/edit/:id/associate', moviesController.associateMovie);
router.get('/edit/:id', moviesController.edit);
router.put('/edit/:id', moviesController.editMovie);
router.delete('/delete/:id', moviesController.deleteMovie);
module.exports = router;