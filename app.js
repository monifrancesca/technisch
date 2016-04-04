var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

//route modules
var word = require('./routes/wordmodule');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/word', word);

app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/scripts/controllers'));
app.use(express.static('public/scripts/factories'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));


app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
  console.log('Server is ready on port ' + app.get('port'));
});