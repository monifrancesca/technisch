var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var app = express();
var connection = require('../modules/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.post('/', function(req, res) {
  //console.log('in the module', req.body);
  var addWord = {
      newWord: req.body.newWord,
      description: req.body.description
    };
  //console.log('add word var', addWord);

  pg.connect(connection, function(err, client, done) {
    client.query('INSERT INTO words (word, description) VALUES ($1, $2)',
        [addWord.newWord, addWord.description],
        function(err, result) {
          done();
          if (err) {
            console.log("Error inserting data: ", err);
            res.send(false);
          } else {
            res.send(result);
          }
        });
  });
});

router.get('/', function(req, res) {
  var results = [];  // create an empty array for results
  pg.connect(connection, function(err, client, done) {
    var query = client.query('SELECT * FROM words;');

    query.on('row', function(row) { // add data to a row each time it repeats
      results.push(row);
    });

    query.on('end', function() { // return the results array at the end then go back to the data factory
      client.end();
      return res.json(results);
    });

    if(err) {
      console.log(err);
    }
  })
});

router.delete('/wordList:id', function(req, res) {
  var wordId = req.params.id;
  pg.connect(connection, function(err, client, done) {
    client.query('DELETE FROM words WHERE id = $1',
        [wordId],
        function (err, result) {
          done();
          if (err) {
          console.log("Error deleting data: ", err);
          res.send(false);
          } else {
            res.send(result);
          }
        });
  });

});


module.exports = router;