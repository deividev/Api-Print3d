const { Router} = require('express');
const Model = require('../models/model');
const router = Router();


router.get('/model/:id', async (req, res) => {
  const models = await Model.findById(req.params.id);
  res.json(models);
})

router.get('/models', async (req, res) => {
  const models = await Model.find();
  res.json(models);
})


router.post('/models',async function createModels(req, res) {
    const values = req.body;
    const newModel = { values};
    const model3d = new Model(newModel);
    await model3d.save();
});

router.delete('/models/:id', async (req, res) => {
  console.log(req.params.id);
  await Model.findByIdAndDelete(req.params.id);
  console.log('Model delete');
})

router.put('/models/:id', async (req, res) => {
  console.log('hola');
  
  const updateModel3d = await Model.findByIdAndUpdate(req.params.id, {
    title: req.body[0].title,
    userId: req.body[0].userId,
    userName: req.body[0].userName,
    img: req.body[0].img,
    model: req.body[0].model,
    likes: req.body[0].likes,
    downloads: req.body[0].downloads,
    categories: req.body[0].categories,
    description: req.body[0].description,
    settings: req.body[0].settings,
    custom: req.body[0].custom,
    license: req.body[0].license,
    tags: req.body[0].tags,
    comments: req.body[0].comments
  });

  return res.json({updateModel3d});
});




module.exports = router;

