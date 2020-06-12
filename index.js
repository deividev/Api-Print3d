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
const favicon = require("express-favicon");

const app = express();

//Inizialition

const mongoUri =
  "mongodb+srv://david:17rGxHNfLqtjGRN3@print3ddb-n71er.mongodb.net/factory3ddb?retryWrites=true&w=majority";
// const mongoUri = "mongodb://localhost:27017/print3d"
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
  app.set("port", process.env.PORT || 3000);
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");

  //Middelwares
  // var upload = multer({ dest: 'uploads/' })

  var storage = multer.diskStorage({
    destination: function (req, files, cb) {
      cb(null, "/public/uploads/images");
    },
    filename: function (req, files, cb) {
      // cb(null, file.filename + path.extname(file.originalname)); //Appending extension
      const extension = files.mimetype.split("/")[1];
      const name = files.originalname.split(".")[0];
      try {
        let count = 0;
        if (!fs.existsSync("/public/uploads/images" + files.originalname)) {
          cb(null, files.originalname);
        } else {
          let count = 0;
          while (
            fs.existsSync(
              `/public/uploads/images ${name}_${count}.${extension}`
            )
          ) {
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

  app.use("/api", require("./routes/comments.router.js"));

  app.get("/", (req, res) => {
    res.render("");
    console.log("Server online");
  });

  var filesUpload = upload.fields([
    { name: "model", maxCount: 8 },
    { name: "image", maxCount: 8 },
  ]);

  app.post("/api/upload", filesUpload, async (req, res) => {
    console.log(req.files);

    // const imageName =
    //   req.files.image && req.files.image.length
    //     ? req.files.image[0].filename
    //     : "";
    // const modelName =
    //   req.files.model && req.files.model.length
    //     ? req.files.model[0].filename
    //     : "";

    const imgUrl = `${path.join(__dirname, "/public/uploads/images/")}vue.png`;
    const modelUrl = `${path.join(
      __dirname,
      "/public/uploads/images/"
    )}vue.png`;

    const model3d = await new ModelModel({
      title: req.body.title,
      userId: req.body.userId,
      userName: req.body.userName,
      img: imgUrl,
      model: modelUrl,
      likes: 0,
      downloads: 0,
      categories: req.body.categories,
      description: req.body.description,
      settings: req.body.settings,
      custom: req.body.custom,
      license: req.body.license,
      tags: req.body.tags,
      comments: req.body.comments,
    }).save();

    return res.json({ model3d });
  });

  app.use(express.static(path.join(__dirname, "public")));
  //app.use(favicon(__dirname + ""));

  app.get("/api/download/:id", async (req, res, next) => {
    const model = await ModelModel.findById(req.params.id);
    const file = `${__dirname}${model.model}`;
    res.download(file); // Set disposition and send it.
    console.log(file);
  });

  //Start the serve
  app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
    console.log(process.env.NODE_ENV);
  });
};

mongoose.connect(
  mongoUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  OnDBReady
);

module.exports = app;
