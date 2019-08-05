const MongoClient = require('mongodb').MongoClient;

var connectionString = "mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge";

MongoClient.connect(connectionString, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("dev-challenge");
  var query = {TitleName: 'Cavalcade'};
  dbo.collection("Titles").find(query).toArray(function(err, result) {
    if (err) {
        console.log('Error!');
        throw err;
    }
    console.log(result);
    db.close();
  });
});

