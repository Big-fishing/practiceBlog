const User = require('../mongodbs/utils/users')
const md5 = require('md5')

module.exports = async ctx=>{
    const {password,newpassword,captcha} = ctx.request.body.values;
    if(ctx.session.captcha !== captcha){
        //判断验证码是否正确
        ctx.body = {
            code: 2,
            msg: '验证码错误或过期，有效期60秒'
        }
        return
    }
    const userimte = await User.findOne({password:md5(password)})
    if(userimte){
        const bol = await User.updataOne(userimte,{$set:{password:md5(newpassword),token:''}})
        if(bol.n === 1 && bol.nModified === 1){
            ctx.body = {
                code: 1,
                msg:'修改成功请重新登陆'
            }
        }else{
            ctx.body = {
                code: 2,
                msg:'修改失败，请求修复'
            }
        }
    }else{
        ctx.body = {
            code: 2,
            msg:'旧密码错误'
        }
    }
}