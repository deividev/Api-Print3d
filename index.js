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
    destination: function (req, files, cb) {
      cb(null, "public/uploads/images");
    },
    filename: function (req, files, cb) {
      // cb(null, file.filename + path.extname(file.originalname)); //Appending extension
      const extension = files.mimetype.split('/')[1];
      const name = files.originalname.split('.')[0];
      try {
        let count = 0;
        if (!fs.existsSync("public/uploads/images" + files.originalname)) {
          cb(null, files.originalname);
        } else {
          let count = 0;
          while (fs.existsSync(`public/uploads/images ${name}_${count}.${extension}`)) {
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

  app.use("/api", require("./routes/license.router.js"));

  app.get("/", (req, res) => {
    res.render("");
    console.log("Server online");
  });


  var filesUpload = upload.fields([{ name: 'model', maxCount: 1 }, { name: 'image', maxCount: 8 }])

  app.post("/api/upload", filesUpload, async (req, res, next) => {
    console.log(req.files);
    const imgName = `http://localhost:3000/uploads/images/${req.files.image[0].filename}`;
    const modelName = `http://localhost:3000/uploads/images/${req.files.model[0].filename}`;

    const model3d = await new ModelModel({
      title: req.body.title,
      userId: req.body.userId,
      userName: req.body.userName,
      img: imgName,
      model: modelName,
      likes: 0,
      downloads: 0,
      categories: req.body.categories,
      description: req.body.description,
      settings: req.body.settings,
      custom: req.body.custom,
      license: req.body.license,
      tags: req.body.tags,
    }).save();

    return res.json({model3d});
  });

  app.use(express.static(path.join(__dirname, 'public')));

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
    useFindAndModify: false
  },
  OnDBReady
);

module.exports = app;
