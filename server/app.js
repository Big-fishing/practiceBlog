require('dotenv').config();//配置全局变量
require('./mongodbs/db');//mongoose链接
const Koa = require('koa');
const router = require('@koa/router')();               
const logger = require("koa-logger")();  
const compress = require('koa-compress') 
const bodyParser = require('koa-bodyparser');
const session = require('koa-session')
const {historyApiFallback} = require('koa2-connect-history-api-fallback')
const api = require('./routes/index');


const app = new Koa();

const options = { threshold: 2048 };
app.use(compress(options))

app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa.sess',
  maxAge: 60000, //过期时间
  autoCommit: true, 
  overwrite: true, 
  httpOnly: true, 
  signed: true, 
  rolling: true, //每次请求重新设置cookies
  renew: false, 
  sameSite: null,
};
app.use(session(CONFIG, app));


router.use(bodyParser({
  formLimit:process.env.URLENCODED_LIMT,
  jsonLimit:process.env.JSON_LIMT
}));



app.use(historyApiFallback({ whiteList: ['/apis'] }));
// 配置静态路径
app.use(require('koa-static')('build'));
router.use('/apis',api.routes());

app.use(logger);  
app.use(router.routes()).use(router.allowedMethods());


//配置启动3000端口
app.listen(process.env.PORT,()=>{
  console.log(process.env.PORT+'启动服务')
})