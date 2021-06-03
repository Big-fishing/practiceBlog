const md5 = require('md5');
const jwt = require('jsonwebtoken')
const Users = require('../mongodbs/utils/users');
const Utils = require('../utils/utils')



module.exports = async ctx =>{
    const {username,password,captcha} = ctx.request.body.values;
    if(ctx.session.captcha !== captcha){
        //判断验证码是否正确
        ctx.body = {
            status: 1,
            msg: '验证码错误或过期，有效期60秒'
        }
        return
    }
    if(!username && !password) return //判断内容

    const namea = await Users.findOne({username,password:md5(password)})
    if(namea){//判断用户是否存在
        const setTokenKey = process.env.JWT_SECRET_KEY;//token加密密钥
        const setTokenBoolean = true;//是否更新touken的布尔值
        const tokenTime = 60 * 60 * 24;//设定token的有效时间为24小时 
        const IP = Utils.getUserIp(ctx.request)//获取客户端IP
        if(namea.token){
            // 有token解析
            try{
                const tokenState = await Utils.checkToken(namea.token);
                const datename = Math.floor(new Date().getTime() / 1000);
                const nserip = namea.IP
                if((tokenState.exp - datename) > (60 * 60) && (nserip) === IP){
                    //当token的有效时间大于一小时则不更新token
                    setTokenBoolean = false;
                }
            }catch(err){
                console.log(err+'token已失效，重新生成')
            }
        }
        let token = namea.token;
        //token有效时间小于80秒则更新token
        if(setTokenBoolean){
            token = jwt.sign({username},setTokenKey,{
                expiresIn:tokenTime
            })
            await Users.updataOne({username},{token,IP});
        }
        ctx.body = {
            status: 0,
            data: token,
            msg: '用户登录成功'
        }
    }else{
        ctx.body = {
            status: 1,
            msg: '用户名或者密码不正确'
        }
    }
}