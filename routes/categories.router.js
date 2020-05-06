
const { Router } = require('express');
const categoriesModel = require('../models/categories.model');
const mongoose = require('mongoose');
const router = Router();

router.get('/categories', async(req, res) => {
  console.log(req.body);
  const categories  = await categoriesModel.find();
  return res.json(categories);
})
 
router.post('/categories', async(req, res) => {
  const { title, description } = req.body;
  const newCategories = new categoriesModel({title, description});
  await newCategories.save();
  res.send('hola');
})


router.delete('/categories/:id', async(req, res) => {
  console.log(req.params.id);
  await categoriesModel.findByIdAndDelete(req.params.id);
  console.log('Categorie delete');

});

router.put('/categories/update/:id', async(req, res) => {
  await categoriesModel.findByIdAndUpdate(req.params.id);
  console.log('Categorie update');

});

module.exports = router;  