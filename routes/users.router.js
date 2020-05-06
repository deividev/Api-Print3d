
const { Router } = require('express');
const router = Router();

const mongoose = require('mongoose');

const User = require('../models/users.model');

const jwt = require('jsonwebtoken');


router.get('/user', async(req, res) => {
  categories  = await User.find();
  return res.json(categories);
})
 
router.post('/signup', async(req, res) => {
  const values = req.body;
  const newUser = new User(values);
  await newUser.save();
  const token = jwt.sign({_id: newUser._id}, 'secretKey');
  res.status(200).json({token});
  console.log('User register');
})


router.post('/signin', async(req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (!user) return res.status(401).send('The email doesn´t exists');
  if (user.password !== password) return res.status(401).send('Wrong password');

  const token = jwt.sign({_id: user._id}, 'secretKey');

  return res.status(200).json({token}), 
  console.log(req.userId);
  // return res.send(req.userId);

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



// class UsersRouter {
//   static async get(ctx) {
//     logger.info('Obtaining all users');
//     ctx.body = await UserModel.find();
//   }
//   static async getById(ctx) {
//     logger.info(`Obtaining user with id ${ctx.params.id}`);
//     const user = await UserModel.findById(ctx.params.id);
//     if (!user) {
//       ctx.throw(404, 'user not found');
//       return;
//     }
//     ctx.body = user;
//   }
//   static async create(ctx) {
//     logger.info(`Creating new user with body ${ctx.request.body}`);
//     ctx.body = await new UserModel(ctx.request.body).save();
//   }
//   static async update(ctx) {
//     logger.info(`Updating user with id ${ctx.params.id}`);
//     let user = await UserModel.findById(ctx.params.id);
//     logger.info(`user`)
//     if (!user) {
//       ctx.throw(404, 'user not found');
//       return;
//     }
//     user = Object.assign(user, ctx.request.body);
//     ctx.body = await user.save();
//   }
//   static async delete(ctx) {
//     logger.info(`Deleting user with id ${ctx.params.id}`);
//     const numDeleted = await UserModel.remove({
//       _id: mongoose.Types.ObjectId(ctx.params.id)
//     });
//     logger.debug('Elementos eliminados', numDeleted);
//     if (numDeleted.result.ok <= 0) {
//       ctx.throw(404, 'user not found');
//       return;
//     }
//     ctx.body = numDeleted.result;
//   }
//   static async postForm(ctx) {
//     console.log(req.file);
//     logger.info(`Creating new imagen user with body ${ctx.request.body}`).save;
//     ctx.response.status = 200;
//   }
// }

