//导入封装的请求方法
import ajax from './ajax';

//设定默认前缀
// const BASE = '/api/apis' //测试
const BASE = '/apis' //打包


// export const Reqcaptcha = '/api/apis/captcha?time='//测试
export const Reqcaptcha = '/apis/captcha?time='//打包

//post
export const ReqLogin = values => ajax(`${BASE}/adminlogin`,{values},'post'); //登陆接口
export const ReqRegister = values => ajax(`${BASE}/adminregister`,{values},'post');//用户注册登陆
export const Reqlogincheck = values => ajax(`${BASE}/logincheck`,{values},'post');//判断登陆是否有效
export const Reqnoteadd = values => ajax(`${BASE}/noteadd`,{values},'post');//添加文章
export const Reqnoterevise = values => ajax(`${BASE}/noterevise`,{values},'post');//修改文章
export const ReqDynamadd = values => ajax(`${BASE}/dynamadd`,{values},'post');//添加动态
export const ReqDynamrevise = values => ajax(`${BASE}/dynamrevise`,{values},'post');//修改动态
export const ReqLinksadd = values => ajax(`${BASE}/linksadd`,{values},'post');//添加友链
export const ReqLinksrevise = values => ajax(`${BASE}/linksrevise`,{values},'post');//修改友链
export const Reqaboutrevise = values => ajax(`${BASE}/aboutrevise`,{values},'post');//修改关于
export const Reqpasswordrevise = values => ajax(`${BASE}/passwordrevise`,{values},'post');//修改密码
export const Reqcreatecomment = values => ajax(`${BASE}/createcomment`,{values},'post');//提交评论


//get
export const Checkadmin = values => ajax(`${BASE}/checkadmin`,{values},'get');//判断是否有管理者
export const Getcontentlist = values => ajax(`${BASE}/getcontentlist`,{values},'get');//获取文章列表
export const Reqnotedelete = values => ajax(`${BASE}/notedelete`,{values},'get');//删除文章
export const ReqnoteSearch = values => ajax(`${BASE}/notesearch`,{values},'get');//搜索文章
export const ReqDynamlist = values => ajax(`${BASE}/dynamilist`,{values},'get');//获取动态列表
export const ReqDynamdelete = values => ajax(`${BASE}/dynamdelete`,{values},'get');//删除动态
export const ReqDynamGoodAdd = values => ajax(`${BASE}/dynamgoodadd`,{values},'get');//动态点赞
export const ReqGetlinksAll = values => ajax(`${BASE}/getlinks`,{values},'get');//获取友链列表
export const ReqLinksdelete = values => ajax(`${BASE}/linksdelete`,{values},'get');//删除友链
export const ReqLinkshomeget = values => ajax(`${BASE}/linkshomeget`,{values},'get');//获取访问量
export const ReqAboutget = values => ajax(`${BASE}/aboutget`,{values},'get');//获取关于
export const ReqCategoryall = values => ajax(`${BASE}/categoryall`,{values},'get');//获取分类内容总数
export const ReqVisitsall = values => ajax(`${BASE}/visitsall`,{values},'get');//获取访问量
export const ReqAboutGoodAdd = values => ajax(`${BASE}/aboutgoodadd`,{values},'get');//关于点赞
export const Reqnotegetitme = values => ajax(`${BASE}/notegetitme`,{values},'get');//获取文章详情页
export const Reqnotegoodadd = values => ajax(`${BASE}/notegoodadd`,{values},'get');//获取文章详情页
export const ReqGetcommentslist = values => ajax(`${BASE}/getcommentslist`,{values},'get');//获取评论列表
export const ReqDynamvisitsAdd = values => ajax(`${BASE}/dynamvisitsadd`,{values},'get');//添加动态访问量
export const Reqgetcontentnum = values => ajax(`${BASE}/getcontentnum`,{values},'get');//添加动态访问量