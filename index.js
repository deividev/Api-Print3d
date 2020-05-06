
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
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'uploads/images')
  },
  filename: (req, file, callBack) => {
      callBack(null, `${file.originalname}`)
  }
})

const upload = multer({ storage: storage })


//** Routes**

app.use('/api', require('./routes/categories.router.js'));

app.use('/api', require('./routes/users.router.js'));

app.use('/api', require('./routes/models.router.js'));

app.get('/', (req, res) => {
  res.render('');
  console.log('Server online');
}); 

app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  (req.file);
  res.send('file');
  console.log('uploaded');
});

app.post('/upload/models', upload.single('model'), (req, res) => {
  console.log(req.file);
  (req.file);
  res.send('file');
  console.log('uploaded');
});



//Start the serve
app.listen(app.get('port'), () => {
 console.log(`Server on port ${app.get('port')}`);
});

//   app.use(async (ctx, next) => {
//     logger.info(`Last request was ${ctx.session.lastRequest}`);
//     ctx.session.lastRequest = new Date();
//     await next();
//   });


//   app.use(async (ctx, next) => {
//     logger.info(`The request url is ${ctx.url}`);
//     await next();
//   });




