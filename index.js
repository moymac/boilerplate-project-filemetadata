// Solving
var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config()
const upload = multer()
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {

  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  const result = {
    "name": file.originalname,
    "type": file.mimetype,
    "size": file.size
  }
  res.json(result);
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
