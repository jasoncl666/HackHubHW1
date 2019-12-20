var express = require('express');
var fs = require('fs')

const bodyParser = require('body-parser'); 
var app = express();

app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.get('/:file', function (req, res) {
  res.send(req.params);
});


app.post('/:file', function (req, res) {
  res.send('Posting file!');
  var filename = req.body;
  console.log(filename);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
