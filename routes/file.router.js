
//Multer
const multer = require('multer');
const upload = multer({ dest: 'images/' });
const app = require('../index');
app.use(upload.any());

//** */



const Router = require('koa-router');


const fileRouter = new Router({
  prefix: '/files'
});

fileRouter.post(
  '/',
  upload.single('img'),
  ctx => {
    console.log('ctx.request.file', ctx.request.file);
    console.log('ctx.file', ctx.file);
    console.log('ctx.request.body', ctx.request.body);
    ctx.body = 'done';
  }
);