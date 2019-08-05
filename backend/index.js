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
        // console.log(titleObjects.length);
        let promiseArray = titleObjects.map(item => {
            const options = {
                url: 'https://api.themoviedb.org/3/search/movie?api_key=5620c9ef014e2151ab6862dd92e79231&query=' + item.TitleName
              };
              return rp(options);
        });
        // console.log(promiseArray.length);
        Promise.all(promiseArray)
            .then(results => {
                let movieDbResults = results.length ? JSON.parse(results[0]) : 'none';

                // loop thru results from db query and compare to results from moviedb to return matching images
                let matchedArray = [];
                titleObjects.forEach(titleObject => {
                    console.log('hey')
                    let matched = movieDbResults.results.map(movieDbItem =>{
                        let date = new Date(movieDbItem.release_date).getFullYear();
                        console.log('outside', movieDbItem.title, titleObject.TitleName, titleObject.ReleaseYear, date);
                        if (movieDbItem.title.toLowerCase() == titleObject.TitleName.toLowerCase() && titleObject.ReleaseYear == date) {
                            titleObject.imageUrl = movieDbItem.backdrop_path ? movieDbItem.backdrop_path : '';
                            console.log('inside', movieDbItem.title, titleObject.TitleName, titleObject.ReleaseYear, date);
                        } else {
                            // matchedArray.push(titleObject);
                        }
                    });
                });
                // let mergedArray = [...titleObjects, ...matchedArray];
                console.log('test', matchedArray.length, matchedArray);
                res.send(JSON.stringify(titleObjects));
            });
        // console.log(test);
        // res.send(JSON.stringify(test));
  });
});

MongoClient.connect(connectionString, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);
  db = client.db('dev-challenge'); // whatever your database name is
  
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});

