const logger = require('logger');
const Router = require('koa-router');
const UserValidator = require('validators/user.validator');
const modelsModel = require('models/model');
const mongoose = require('mongoose');




class modelsRouter {
  static async get(ctx) {
    logger.info('Obtaining all models');
    ctx.body = await modelsModel.find();
    ctx.response.status = 200;
  }
  static async getById(ctx) {
    logger.info(`Obtaining model with id ${ctx.params.id}`);
    const model = await modelsModel.findById(ctx.params.id);
    ctx.response.status = 200;
    if (!model) {
      ctx.throw(404, 'model not found');
      return;
    }
    ctx.body = model;
  }
  static async create(ctx) {
    logger.info(`Creating new model with body ${ctx.request.body}`);
    ctx.body = await new modelsModel(ctx.request.body).save();
  }
  static async update(ctx) {
    logger.info(`Updating model with id ${ctx.params.id}`);
    let model = await modelsModel.findById(ctx.params.id);
    logger.info(`model`)
    if (!model) {
      ctx.throw(404, 'model not found');
      return;
    }
    model = Object.assign(model, ctx.request.body);
    ctx.body = await model.save();
  }
  static async delete(ctx) {
    logger.info(`Borrado modelo con la id ${ctx.params.id}`);
    const numDeleted = await modelsModel.deleteOne({
      _id: mongoose.Types.ObjectId(ctx.params.id)
    });
    logger.debug('Elementos eliminados', numDeleted);
    if (numDeleted.result.ok <= 0) {
      ctx.throw(404, 'model not found');
      return;
    }
    ctx.body = numDeleted.result;
  }
}


const router = new Router({
  prefix: '/models'
});

router.get('/', modelsRouter.get);
router.get('/:id', modelsRouter.getById);
router.post('/', modelsRouter.create);
router.put('/:id', modelsRouter.update);
router.delete('/:id', modelsRouter.delete);
module.exports = router;