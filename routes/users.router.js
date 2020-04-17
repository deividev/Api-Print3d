const logger = require('logger');
const Router = require('koa-router');
const UserValidator = require('validators/user.validator');
const UserModel = require('models/users.model');
const mongoose = require('mongoose');




class UsersRouter {
  static async get(ctx) {
    logger.info('Obtaining all users');
    ctx.body = await UserModel.find();
  }
  static async getById(ctx) {
    logger.info(`Obtaining user with id ${ctx.params.id}`);
    const user = await UserModel.findById(ctx.params.id);
    if (!user) {
      ctx.throw(404, 'user not found');
      return;
    }
    ctx.body = user;
  }
  static async create(ctx) {
    logger.info(`Creating new user with body ${ctx.request.body}`);
    ctx.body = await new UserModel(ctx.request.body).save();
  }
  static async update(ctx) {
    logger.info(`Updating user with id ${ctx.params.id}`);
    let user = await UserModel.findById(ctx.params.id);
    logger.info(`user`)
    if (!user) {
      ctx.throw(404, 'user not found');
      return;
    }
    user = Object.assign(user, ctx.request.body);
    ctx.body = await user.save();
  }
  static async delete(ctx) {
    logger.info(`Deleting user with id ${ctx.params.id}`);
    const numDeleted = await UserModel.remove({
      _id: mongoose.Types.ObjectId(ctx.params.id)
    });
    logger.debug('Elementos eliminados', numDeleted);
    if (numDeleted.result.ok <= 0) {
      ctx.throw(404, 'user not found');
      return;
    }
    ctx.body = numDeleted.result;
  }
  static async postForm(ctx) {
    logger.info(`Creating new imagen user with body ${ctx.request.body.form}`);
    ctx.response.status = 200;
  }
}

const router = new Router({
  prefix: '/users'
});

router.get('/', UsersRouter.get);
router.get('/:id', UsersRouter.getById);
router.post('/', UsersRouter.create);
router.put('/:id', UsersRouter.update);
router.delete('/:id', UsersRouter.delete);





router.post('/images', UsersRouter.postForm);
module.exports = router;