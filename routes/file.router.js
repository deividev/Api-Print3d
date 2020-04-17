
const Router = require('koa-router')
const route = new Router()
const multer = require('@koa/multer')
const path = require('path')

//Upload File Storage Path and File Naming
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname ,'/public'))
    },
    filename: function (req, file, cb) {
        let type = file.originalname.split('.')[1]
        cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
    }
})
//File upload restrictions
const limits = {
    fields: 10,//Number of non-file fields
    files: 1//Number of documents
}
const upload = multer({storage,limits})

route.post('/user/file', upload.single('file'), async (ctx,next)=>{
    ctx.body = {
        code: 1,
        data: ctx.file
    }
})

app.use(router.routes()).users(router.allowedMethods());

