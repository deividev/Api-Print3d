//Express
const express = require('express');
const ejs = require('ejs');
const cors = require('cors');
const bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');
const ModelModel = require('./models/model');
const fs = require('fs');

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
// var upload = multer({ dest: 'uploads/' })

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + path.extname(file.originalname)) //Appending extension


    try {
      let count = 0;
      if (!fs.existsSync('uploads/' + file.originalname)) {
        cb(null, file.originalname)
      } else {
        let count = 0;
        while(fs.existsSync(`uploads/ ${file.originalname}_${count}`)) {
          count++;
        }
        cb(null, `${file.originalname}_${count}`);
      } 
    } catch (err) {
      console.error(err);
    }
  }
})

var upload = multer({
  storage
});

//** Routes**

app.use('/api', require('./routes/categories.router.js'));

app.use('/api', require('./routes/users.router.js'));

app.use('/api', require('./routes/models.router.js'));


app.get('/', (req, res) => {
  res.render('');
  console.log('Server online');
});

app.post('/api/upload', upload.single('image'), async (req, res, next) => {
  console.log(req.file);

  const model3d = await new ModelModel({
    title: '',
    // author_id: new mongoose.Types.ObjectId(),
    img: req.file.filename,
    model: '',
    likes: 0,
    downloads: 0,
    // categorie_id: ObjectId(''),
    description: '',
    settings: '',
    custom: '',
    // license_id: ObjectId(''),
    tags: ''
  }).save();
  res.json(model3d);

  res.body = {
    path: req.file.filename,
  }
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