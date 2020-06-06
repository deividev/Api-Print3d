const { Router } = require('express');
const commentModel = require('../models/comment');
const mongoose = require('mongoose');
const router = Router();

router.get('/comment', async(req, res) => {
  console.log(req.body);
  const comment  = await commentModel.findById(req.params);
  return res.json(comment);
})

router.get('/comments', async(req, res) => {
  console.log(req.body);
  const comments  = await commentModel.find();
  return res.json(comments);
})

router.post('/comments', async(req, res) => {
  const newcomment = new commentModel(req.body);
  await newcomment.save();
  res.send('Create comment');
})


router.delete('/comment/:id', async(req, res) => {
  console.log(req.params.id);
  await commentModel.findByIdAndDelete(req.params.id);
  console.log('comment delete');

});

router.put('/comment/update/:id', async(req, res) => {
  await commentModel.findByIdAndUpdate(req.params.id);
  console.log('comment update');

});

module.exports = router;  