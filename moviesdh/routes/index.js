var express = require('express');
var router = express.Router();
let moviesController = require('../controllers/moviesController')

/* GET home page. */
router.get('/', moviesController.redirect);
router.get('/movies', moviesController.all)
router.get('/episodes', moviesController.showEpisode);
router.get('/migrations', moviesController.showMigration);
router.get('/series', moviesController.showSerie);
router.get('/users', moviesController.showUser);
router.get('/seasons', moviesController.showSeason);

module.exports = router;