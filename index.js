
//Express
const express = require('express');
const ejs = require('ejs');
const cors = require('cors');
const bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');

const app = express();


require('./database.js')
//Inizialition


app.use(cors());

if (process.env.NODE_ENV === 'development') {
  // CORS settings
}
app.use(express.json());
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

//Settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')


//Middelwares
var upload = multer({ dest: 'uploads/' })


//** Routes**

app.use('/api', require('./routes/categories.router.js'));

app.use('/api', require('./routes/users.router.js'));

app.use('/api', require('./routes/models.router.js'));


app.get('/', (req, res) => {
  res.render('');
  console.log('Server online');
}); 

// app.post('/api/upload', upload.single('image'), (req, res) => {
//   res.json({
//     message: 'File uploaded successfully',
//     path: req.file.path
//   });
// });

app.post('/api/upload', upload.single('image'), async (req, res, next) => {
  console.log(req.file);
  const imagePath = req.file.path;
  res.json(imagePath);
});


app.use('/api/upload', express.static(path.resolve('uploads')))

// app.post('/api/upload/models', upload.single('model'), (req, res) => {
//   console.log(req.file);
//   (req.file);
//   res.send('file');
//   console.log('uploaded model');
// });



//Start the serve
app.listen(app.get('port'), () => {
 console.log(`Server on port ${app.get('port')}`);
});


module.exports = app;