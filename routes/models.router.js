const { Router} = require('express');
const Model = require('../models/model');
const mongoose = require('mongoose');
const router = Router();








router.get('/models', async (req, res) => {
  const models = await Model.find();
  res.json(models);
})



// router.post('/models', async (req, res) => {
//   const values = req.body;
//   const newModel = new Model(values);
//   await newModel.save();
//   res.send('hola');
//   console.log(newModel);
// })


router.post('/models',async function createModels(req, res) {
    const values = req.body;
    const newModel = { values};
    const model3d = new Model(newModel);
    await model3d.save();
    return res.json({
      message: 'Model Saved Successfully',
      model3d
  });
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

