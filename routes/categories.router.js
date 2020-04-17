const logger = require('logger');
const Router = require('koa-router');
const categoriesModel = require('models/categories.model');
const mongoose = require('mongoose');




class CategoriesRouter {
  static async get(ctx) {
    logger.info('Obtaining all categories');
    ctx.body = await categoriesModel.find();
    ctx.response.status = 200;
  }
  static async getById(ctx) {
    logger.info(`Obtaining category with id ${ctx.params.id}`);
    const category = await categoriesModel.findById(ctx.params.id);
    if (!category) {
      ctx.throw(404, 'category not found');
      return;
    }
    ctx.body = category;
  }
  static async create(ctx){
    logger.info(`Creating new category with body ${ctx.request.body}`);
    ctx.body = await new categoriesModel(ctx.request.body).save();
    }
    static async update(ctx) {
      logger.info(`Updating category with id ${ctx.params.id}`);
      let category = await categoriesModel.findById(ctx.params.id);
      logger.info(`category`)
      if (!category) {
        ctx.throw(404, 'category not found');
        return;
      }
      category = Object.assign(category, ctx.request.body);
      ctx.body = await category.save();
    }
  static async delete(ctx) {
    logger.info(`Deleting user with id ${ctx.params.id}`);
    const numDeleted = await categoriesModel.deleteOne({
      _id: mongoose.Types.ObjectId(ctx.params.id)
    });
    logger.debug('Elementos eliminados', numDeleted);
    if (numDeleted.result.ok <= 0) {
      ctx.throw(404, 'user not found');
      return;
    }
    ctx.body = numDeleted.result;
  }
}


const router = new Router({
  prefix: '/categories'
});

router.get('/',CategoriesRouter.get);
router.get('/:id',CategoriesRouter.getById);
router.post('/',CategoriesRouter.create);
router.put('/:id',CategoriesRouter.update);
router.delete('/:id',CategoriesRouter.delete);
module.exports = router;