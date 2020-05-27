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
router.put('/models/update/:id', async (req, res) => {
  await Model.findByIdAndUpdate(req.params.id);
  console.log('Model update');
});

module.exports = router;

