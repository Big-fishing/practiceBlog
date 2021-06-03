const Users = require('../mongodbs/utils/users');


module.exports = async ctx =>{
    //判断是否有管理者
    const nameSta = await Users.findOne({})
    if(!nameSta){
        ctx.body = {
            status: 0,
            msg: '请注册用户'
        }
    }else{
        ctx.body = {
            status: 1,
            msg: '已存在管理员，禁止注册'
        }
    }
}