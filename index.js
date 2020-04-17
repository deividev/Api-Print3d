const Koa = require('koa');
const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/print3d';
const logger = require('logger');
const body = require('koa-body');
const usersRouter = require('routes/users.router');
const modelsRouter = require('routes/models.router');
const categoryRouter = require('routes/categories.router');

const koaLogger = require('koa-logger');
const mount = require('koa-mount');
const validate = require('koa-validate');

const convert = require('koa-convert');
const session = require('koa-generic-session');
const File = require('koa-generic-session-file');
const cors = require('@koa/cors');



const onDBReady = (err) => {
  if (err) {
    logger.error('Error connecting', err);
    throw new Error('Error connecting', err);
  }
  const app = new Koa();
  if (process.env.NODE_ENV === 'dev') {
    app.use(koaLogger());
  }

  app.use(body());


  validate(app);

  app.keys = ['claveSuperSecreta'];

  var options = {
    origin: '*'
  };
  app.use(cors(options));

  app.use(convert(session({
    store: new File({
      sessionDirectory: __dirname + '/sessions'
    })
  })));

  app.use(async (ctx, next) => {
    logger.info(`Last request was ${ctx.session.lastRequest}`);
    ctx.session.lastRequest = new Date();
    await next();
  });


  app.use(async (ctx, next) => {
    logger.info(`The request url is ${ctx.url}`);
    await next();
  });


  app.use(mount('/api/v1', usersRouter.routes()));

  app.use(mount('/api/v1', modelsRouter.routes()));

  app.use(mount('/api/v1', categoryRouter.routes()));

  


  app.listen(3001, function (err) {
    if (err) {
      logger.error('Error listening in port 3001', err);
      process.exit(1);
    }
    logger.info('Koa server listening in port 3001');
  });
};

mongoose.connect(mongoUri, onDBReady);


