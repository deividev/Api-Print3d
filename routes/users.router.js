
const { Router } = require('express');
const router = Router();

const mongoose = require('mongoose');

const User = require('../models/users.model');

const jwt = require('jsonwebtoken');


router.get('/user/:id', async(req, res) => {
  const user  = await User.findById(req.params.id);
  return res.json(user);
})

router.post('/signup', async(req, res) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    img: "",
    location: "",
    instagram: "",
    personalSite: "",
    bio: ""
  });
  
  await newUser.save();
  const token = jwt.sign({_id: newUser._id}, 'secretKey');
  res.status(200).json({token});
  console.log('User register');
})


router.post('/signin',  async(req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (!user) return res.status(401).send('The email doesn´t exists');
  if (user.password !== password) return res.status(401).send('Wrong password');

  const token = jwt.sign({_id: user._id}, 'secretKey');

  return res.status(200).json({token, user}), 
  console.log(req.userId);
})

router.delete('/user/:id', async(req, res) => {
  console.log(req.params.id);
  await User.findByIdAndDelete(req.params.id);
  console.log('User delete');

});

router.put('/user/update/:id', async(req, res) => {
  await User.findByIdAndUpdate(req.params.id);
  console.log('User update');
});



async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = router;  



