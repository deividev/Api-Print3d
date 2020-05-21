//Express
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const ModelModel = require("./models/model");
const fs = require("fs");

const app = express();

// require("./database.js");
//Inizialition

const mongoUri = "mongodb://localhost:27017/print3d"

const OnDBReady = (err) => {
  if (err) {
    logger.error("Error connecting", err);
    throw new Error("Error connecting", err);
  }

  app.use(cors());

  if (process.env.NODE_ENV === "development") {
    // CORS settings
  }
  app.use(express.json());
  // app.use(bodyParser.json())
  // app.use(bodyParser.urlencoded({ extended: true }))

  //Settings
  app.set("port", 3000);
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");

  //Middelwares
  // var upload = multer({ dest: 'uploads/' })

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      // cb(null, file.filename + path.extname(file.originalname)); //Appending extension
      const extension = file.mimetype.split('/')[1];
      const name = file.originalname.split('.')[0];
      try {
        let count = 0;
        if (!fs.existsSync("uploads/" + file.originalname)) {
          cb(null, file.originalname);
        } else {
          let count = 0;
          while (fs.existsSync(`uploads/${name}_${count}.${extension}`)) {
            count++;
          }
          cb(null, `${name}_${count}.${extension}`);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  var upload = multer({
    storage,
  });

  //** Routes**

  app.use("/api", require("./routes/categories.router.js"));

  app.use("/api", require("./routes/users.router.js"));

  app.use("/api", require("./routes/models.router.js"));

  app.get("/", (req, res) => {
    res.render("");
    console.log("Server online");
  });

  app.post("/api/upload", upload.single("image"), async (req, res, next) => {
    console.log(req.file.filename);
    const imgName = req.file.filename;
    console.log(req);
    

    const model3d = await new ModelModel({
      title: req.body.title,
      // author_id: new mongoose.Types.ObjectId(),
      img: imgName,
      model: req.body.model,
      likes: 0,
      downloads: 0,
      // categorie_id: ObjectId(''),
      description: req.body.description,
      settings: req.body.settings,
      custom: req.body.custom,
      // license_id: ObjectId(''),
      tags: req.body.tags,
    }).save();

    return res.json({model3d});
  });

  app.use("/api/upload", express.static(path.resolve("uploads")));

  // app.post('/api/upload/models', upload.single('model'), (req, res) => {
  //   console.log(req.file);
  //   (req.file);
  //   res.send('file');
  //   console.log('uploaded model');
  // });

  //Start the serve
  app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
  });
};

mongoose.connect(
  mongoUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  OnDBReady
);

module.exports = app;
