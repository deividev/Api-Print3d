
const { Router } = require('express');
const categoriesModel = require('../models/categories.model');
const mongoose = require('mongoose');
const router = Router();

router.get('/categories', async(req, res) => {
  console.log(req.body);
  categories  = await categoriesModel.find();
  return res.json(categories);
})
 
router.post('/categories', async(req, res) => {
  const { title, description } = req.body;
  const newCategories = new categoriesModel({title, description});
  await newCategories.save();
  res.send('hola');
})


router.delete('/categories/:id', async(req, res) => {
})

router.put('/categories/:id', async(req, res) => {
})

module.exports = router;  