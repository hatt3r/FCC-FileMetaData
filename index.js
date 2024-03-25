var express = require('express');
var cors = require('cors');
require('dotenv').config()
var app = express();

//using multer npm package for file management
var multer = require('multer')
//create new variable for upload files multer will store files at dest with random filename
var upload = multer({dest:'uploads/'})
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

//showing the index.html file at first request
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//post method to path and handler/middleware function for upload with single file associated with form field 'upfile'
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {

  //trying responding json with name for files original name
  //type of file from the requested file mimetype
  //size of file requested file object size in single()
  try {
    res.json({
      "name": req.file.originalname,
      "type": req.file.mimetype,
      "size": req.file.size
    });
  } 
  //catching the erro and responding with err 400
  catch (err) {
    res.send(400);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
