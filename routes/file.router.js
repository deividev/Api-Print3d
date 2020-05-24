const { Router} = require('express');
const Model = require('../models/model');


//Multer
const multer = require('multer');
const upload = multer({ dest: 'images/' });
const app = require('../index');
app.use(upload.any());

//** */



const Router = require('koa-router');


const fileRouter = new Router({
  prefix: '/files'
});

router.get('/uploads', async (req, res) => {
  const models = await Model.findById();
  res.json(models);
})
module.exports = router;