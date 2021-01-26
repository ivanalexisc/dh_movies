let {Movie, Genre, Episode, Actor, Migration, Season, User, Serie, Actor_movie, sequelize, db} = require('../database/models')
let moment = require('moment')
const {Op} = require("sequelize");
let moviesController = {
    all: async function(req, res) {
        try {
            const movies = await Movie.findAll({
                include: ["Genre", "actores"]
            })
            res.render('index', {movies: movies});
        } catch (error) {
            console.log(error);
        }
    },
    showGenre: async function(req, res) {
        try {
            const genres = await Genre.findAll()
            res.render('genres', {genres: genres});

        } catch(error) {
            console.log(error);
        }
    },
    actuallyShowGenre: async function(req, res) {
        try {
            const specificGenre = await Genre.findByPk(req.params.id)
            const movies = await Movie.findAll({include: ["Genre"]});
            res.render('genre_detail', {specificGenre, movies})
        } catch(error) {
            console.log(error);
        }
    },
    showActor: async function(req, res) {
        try {
            const actors = await Actor.findAll()
            res.render('actors', {actors: actors});
        } catch(error) {
            console.log(error);
        }
    },
    showActorAgain: async function(req, res) {
        try {
            const actors = await Actor.findByPk(req.params.id, {include: ["peliculas"]});
            res.render('actor_detail', {actors})
        } catch(error) {
            console.log(error);
        }
    },
    showEpisode: async function(req, res) {
        try {
            const episodes = await Episode.findAll()
            res.render('episode', {episodes: episodes})
        } catch(error) {
            console.log(error);
        }
    },
    showMigration: async function(req, res) {
        try {
            const migrations = await Migration.findAll();
            res.render('migration', {migrations: migrations});
        } catch(error) {
            console.log(error);
        }
    },
    showSerie: async function(req, res) {
        try {
            const series = await Serie.findAll();
            res.render('series', {series: series});
        } catch(error) {
            console.log(error);
        }
    },
    showUser: async function(req, res) {
        try {
            const users = await User.findAll();
            res.render('users', {users: users})
        } catch(error) {
            console.log(error);
        }
    },
    showSeason: async function(req, res) {
        try {
            const seasons = await Season.findAll();
            res.render('seasons', {seasons: seasons})
        } catch(error) {
            console.log(error);
        }
    },
    findMovie: async function(req, res) {
        let id = req.params.id
        try {
            const search = await Movie.findByPk(id, {
                include: ["Genre", "actores"]
            })
            const date = moment(search.release_date).format("MMM DO YYYY")
            res.render('list', {list: search, date})
        } catch(error) {
            console.log(error);
        }
    },
    showNew: async function(req, res) {
        try {
            const newMovies = await Movie.findAll({
                order: [
                    ['release_date', 'DESC']
                ],
                limit: 5
            })
            const date = moment(newMovies.release_date).format("MMM DO YYYY")
            res.render('newMovies', {newMovies: newMovies, date});
        } catch (error) {
            console.log(error);
        }
    },
    showRecommended: async function(req, res) {
        try {
            const recommendedMovies = await Movie.findAll({
                where: {
                    rating: {[Op.gte]: 8},
                },
                order: [
                    ['title', 'DESC']
                ]
            })
            const date = moment(recommendedMovies.release_date).format("MMM DO YYYY")
            res.render("recommend", {recommend: recommendedMovies,date});
        } catch(error) {
            console.log(error);
        }
    },
    search: function (req, res) {
        res.render('search');
    },
    searchIndex: async function(req, res) {
        let buscar = req.body.buscar;
        try {
            let result = await Movie.findAll({
                where: {
                    title: {[Op.like]: '%' + buscar + '%'}, 
                },
                order: [
                    [req.body.orden, req.body.asc_desc]
                ]
            })
            res.render(await 'searchResult', {result: result});
        } catch(error) {
            console.log();
        }
    },
    add: async function(req, res) {
        const generos =  await Genre.findAll();
        const actores = await Actor.findAll();
        res.render('add', {generos:generos, actores:actores});
    },
    addMovie: async function(req, res) {
        const newMovie = await Movie.create({
            title: req.body.titulo,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release,
            length: req.body.length,
            genre_id: req.body.genre_id
        })
        await newMovie.addActores(req.body.actores);
        res.redirect('/');
    },
    edit: async function(req, res) {
        const movieId = req.params.id;
        const generos = await Genre.findAll();
        const actores = await Actor.findAll();  
        const pelicula = await Movie.findByPk(movieId, {
            include:['Genre', 'actores']
        })
        const date = moment(pelicula.release_date).format("MMM DO YYYY")
        res.render('edit', {generos, actores, pelicula, date})
    },
    editMovie: async function(req, res) {
        const movieId = req.params.id
        const changedMovie = await Movie.findByPk(movieId, {include: ['Genre', 'actores']})
        await changedMovie.removeActores(changedMovie.actores);
        await changedMovie.addActores(req.body.actores);
        await changedMovie.update({
            title: req.body.titulo,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release,
            length: req.body.length,
            genre_id: req.body.genre_id
        });
        res.redirect("/movies/detail/" + req.params.id);
    },
    deleteMovie: async function(req, res) {
        const peliEncontrada = await Movie.findByPk(req.params.id, {
            include: ["actores"]
        })
        peliEncontrada.removeActores(peliEncontrada.actores)
        await Movie.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/movies");
    },
    associate: async function(req, res) {
        const pelii = await Movie.findByPk(req.params.id);
        const actorii = await Actor.findAll();
        res.render('associateActor', {pelii, actorii});
    },
    associateMovie: async function(req, res) {
        const id = req.params.id;
        const peliculaEncontrada = await Movie.findByPk(id, {
            include:["actores"]
        })
            peliculaEncontrada.addActores(req.body.actor_id);
        await res.redirect('/movies/detail/' + id);
    },
    redirect: function(req, res) {
        res.redirect('/movies')
    },
    
}

module.exports = moviesController;