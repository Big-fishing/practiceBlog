const router = require('@koa/router')();
// POST api 
const adminLogin = require('../api/adminLogin');
const adminRegister = require('../api/adminRegister');
const loginCheck = require('../api/loginCheck');
const noteAdd = require('../api/noteAdd');
const noteRevise = require('../api/noteRevise');
const dynamAdd = require('../api/dynamAdd');
const dynamRevise = require('../api/dynamRevise');
const linksAdd = require('../api/linksAdd');
const linksRevise = require('../api/linksRevise');
const aboutRevise = require('../api/aboutRevise');
const passwordRevise = require('../api/passwordRevise');
const createComment = require('../api/createComment');
// GET api
const setCaptcha = require('../api/setCaptcha');
const checkadmin = require('../api/checkadmin');
const Getcontentlist = require('../api/getcontentlist');
const noteDelete = require('../api/noteDelete');
const noteSearch = require('../api/noteSearch');
const dynamiList = require('../api/dynamiList');
const dynamDelete = require('../api/dynamDelete');
const Linksget = require('../api/Linksget');
const linksDelete = require('../api/linksDelete');
const aboutGet = require('../api/aboutGet');
const categoryAll = require('../api/categoryAll');
const visitsAll = require('../api/visitsAll');
const dynamGoodAdd = require('../api/dynamGoodAdd');
const LinksHomeGet = require('../api/LinksHomeGet');
const aboutGoodAdd = require('../api/aboutGoodAdd');
const noteGetItme = require('../api/noteGetItme');
const notegoodadd = require('../api/notegoodadd');
const getCommentsList = require('../api/getCommentsList');
const dynamVisitsAdd = require('../api/dynamVisitsAdd');
const getContentNum = require('../api/getContentNum');


//POST
router.post('/adminlogin',adminLogin); //登陆请求
router.post('/adminregister',adminRegister);//用户注册
router.post('/logincheck',loginCheck);//检查用户是否已登录
    //note
router.post('/noteadd',noteAdd);//添加文章
router.post('/noterevise',noteRevise);//修改文章
    //dynama
router.post('/dynamadd',dynamAdd);//添加动态
router.post('/dynamrevise',dynamRevise);//修改动态
    //links
router.post('/linksadd',linksAdd);//添加友链
router.post('/linksrevise',linksRevise);//修改友链
    //about
router.post('/aboutrevise',aboutRevise);//修改关于
    //passwordr
router.post('/passwordrevise',passwordRevise);//修改密码
    //comment
router.post('/createcomment',createComment);//提交评论



//GET
router.get('/captcha',setCaptcha);//请求验证码
router.get('/checkadmin',checkadmin);//检查是否存在管理员
router.get('/visitsall',visitsAll);//获取访问量
router.get('/categoryall',categoryAll);//获取分类内容总数
router.get('/getcontentnum',getContentNum);//获取各分类数量（评论）
    //note
router.get('/getcontentlist',Getcontentlist);//请求文章列表
router.get('/notedelete',noteDelete);//删除文章
router.get('/notesearch',noteSearch);//搜索文章
router.get('/notegetitme',noteGetItme);//获取文章
router.get('/notegoodadd',notegoodadd);//文章点赞
    //dynam
router.get('/dynamilist',dynamiList);//请求动态列表
router.get('/dynamdelete',dynamDelete);//删除动态
router.get('/dynamgoodadd',dynamGoodAdd);//动态点赞
router.get('/dynamvisitsadd',dynamVisitsAdd);//动态访问量添加
    //links
router.get('/getlinks',Linksget);//请求友链列表
router.get('/linksdelete',linksDelete);//删除友链
router.get('/linkshomeget',LinksHomeGet);//获取访问量
    //about
router.get('/aboutget',aboutGet);//获取关于
router.get('/aboutgoodadd',aboutGoodAdd);//关于点赞
    //comment
router.get('/getcommentslist',getCommentsList);//获取评论列表


module.exports = router