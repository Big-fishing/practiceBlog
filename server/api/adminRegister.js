const Users = require('../mongodbs/utils/users');
const md5 = require('md5')

module.exports = async ctx => {
    const {username,password} = ctx.request.body.values;
    if(!username && !password) return //
    const userInfo = {
        username,
        password:md5(password)
    }
    const hasUers = await Users.findOne({}) //查询
    if(hasUers) return
    await Users.save(userInfo);
    ctx.body = {
        status: 1,
        msg:'注册成功'
    }
}