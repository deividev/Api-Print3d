const { Router } = require('express');
const licenseModel = require('../models/license');
const mongoose = require('mongoose');
const router = Router();

router.get('/license', async(req, res) => {
  console.log(req.body);
  const license  = await licenseModel.findById(req.params);
  return res.json(license);
  })

router.get('/licenses', async(req, res) => {
  console.log(req.body);
  const licenses  = await licenseModel.find();
  return res.json(licenses);
})

router.post('/licenses', async(req, res) => {
  const newLicense = new licenseModel(req.body);
  await newLicense.save();
  res.send('Create license');
})


router.delete('/license/:id', async(req, res) => {
  console.log(req.params.id);
  await licenseModel.findByIdAndDelete(req.params.id);
  console.log('License delete');

});

router.put('/license/update/:id', async(req, res) => {
  await licenseModel.findByIdAndUpdate(req.params.id);
  console.log('License update');

});

module.exports = router;  