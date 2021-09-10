const mongoose = require('mongoose');
const actor = require('../models/actor');
const Actor = require('../models/actor');
const Movie = require('../models/movie');

module.exports = {
    getAll: function (req, res) {
        Actor.find({}).populate('movies').exec(function (err, actor) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actor);
            }
        });
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },
    deleteOneAndMovies: function (req, res) {
        Actor.findOneAndDelete({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
                for (let i = 0; i < actor.__v; i++) {
                    Movie.findOneAndDelete({ _id: actor.movies[i]._id }, function (err, movie) {
                        if (err) return res.status(400).json(err);
                        if (!movie) return res.status(404).json();
                        console.log(actor.movies[i]._id);
                    })
                }
            });
    },
    // deleteActorMovies: function (req, res) {
    //     Actor.findOne({ _id: req.params.idA }, function (err, actor) {
    //         if (err) return res.status(400).json(err);
    //         if (!actor) return res.status(404).json();
         
    //             console.log(actor.movies.length());
    
    //             // for (let i = 0; i > actor.movies.length();i++){
    //             //     if (actor.movies[i].id == req.params.idM) {
    //             //         actor.movies.splice(i, 1);
    //             //     }
    //             // }
    //             actor.save(function (err) {
    //                 if (err) return res.status(500).json(err);
    //                 res.json(actor);
    //             });
    //         })
    // }
};
