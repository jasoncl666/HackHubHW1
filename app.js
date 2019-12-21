var express = require('express');
var fs = require('fs')

const bodyParser = require('body-parser'); 
var app = express();
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.json());


const path = process.cwd() + '/'


app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.get('/:file', function (req, res) {

  var filename = req.params.file;
  try {
    if (fs.existsSync(path+filename)) {
      fs.readFile(path+filename, function(err, data){
        if (err) throw err;
        console.log('content: ' + data.toString());
      });
    }
  }catch(err) {
    console.error(err)
  }
});


app.post('/:file', function (req, res) {

  res.send('New Post created!');

  var filename = req.params.file;  
  var content = req.body;

  fs.writeFile(path+filename, content, (err)=>{
    if (err) throw err;
  });
});

app.put('/:file', function (req, res) {
  res.send('Got a PUT request at /user');

  var filename = req.params.file;

  try {
    if (fs.existsSync(path+filename)) {
      var content = req.body;
      const postfix = '.txt';

      var newFilename = filename.split('.')[0]+content+postfix;

      fs.rename(filename, newFilename, (err)=>{
        if(err) throw err;
      });      
    }
  }catch(err) {
    console.error(err)
  }
});

app.delete('/:file', function (req, res) {
  res.send('Got a DELETE request at /user')

  var filename = req.params.file;
  
  try {
    if (fs.existsSync(path+filename)) {
  
      fs.unlink(path+filename, (err)=>{
        if(err) throw err;
      });
    }
  }catch(err) {
    console.error(err)
  }
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
