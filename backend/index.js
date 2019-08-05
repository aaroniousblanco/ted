const express = require('express');
const app = express();
const port = 3001;
const request = require('request');
const rp = require('request-promise');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const connectionString = "mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge";
let db = '';

app.use(bodyParser.urlencoded({extended: true}))

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/title-search/:searchterm', (req, res) => { 
    // allow for a case-insensitive and fragment search
    var query = {TitleName: {'$regex' : `${req.params.searchterm}`, '$options' : 'i'}};

    db.collection("Titles").find(query).toArray((err, titleObjects) => {
        if (err) {
            console.log('Error!');
            throw err;
        }
        res.send(JSON.stringify(titleObjects));
  });
});

app.get('/fetch-image/', (req, res) => {
    const options = {
        url: 'https://api.themoviedb.org/3/search/movie?api_key=5620c9ef014e2151ab6862dd92e79231&query=' + req.query.q
    };
    rp(options)
        .then(payload => {
            let movieDbResults = payload.length ? JSON.parse(payload) : 'none';
            console.log(movieDbResults.results.length);
            movieDbResults.results.forEach(movieDbItem => {
                    let date = new Date(movieDbItem.release_date).getFullYear();
                if (movieDbItem.title.toLowerCase() == req.query.q.toLowerCase() && req.query.d == date) {
                    let imageUrl = movieDbItem.backdrop_path ? movieDbItem.backdrop_path : '';
                    console.log('inside', imageUrl);
                    res.send(JSON.stringify(imageUrl));
                }
            });
        });
});

MongoClient.connect(connectionString, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);
  db = client.db('dev-challenge'); 
  
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});

