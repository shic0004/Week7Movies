//https://hub.packtpub.com/building-movie-api-express/
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();
app.listen(8080);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb://34.129.14.178:27017/Week7_movies', function (err) { //change database from movies to Week7_movies
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);

//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);

//My Additions 
//Question 1 - DONE
app.delete('/movies/:id', movies.deleteOne);

//Question 2 - DONE?
app.delete('/actors/movies/:id', actors.deleteOneAndMovies);

//Question 3 - NOT WORKING
app.delete('/actors/:idA/:idM', actors.deleteActorMovies);


//Quesiton 4 - NOT WORKING 

//Question 5
app.post('/movies/:id/actors', movies.addActor);


 //Question 6 - DONE
app.get('/movies/:year1/:year2', movies.getMovieWithinYears);

//Question 7 - DONE (changed getAll actors)
//Question 8 - DONE (changed getAll movies)

//Question 9 - DONE 
app.delete('/movies', movies.deleteMovieWithinYears);





