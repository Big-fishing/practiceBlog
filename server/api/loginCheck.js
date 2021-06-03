const {checkToken} = require('../utils/utils');
const Users = require('../mongodbs/utils/users');


module.exports = async ctx =>{
    const token = ctx.request.body.values;
    const user = await Users.findOne({token});//查询数据库
    if(user){
        //判断数据库的token和请求的token否相同
        try{
            //判断token是否有效
            const result = await checkToken(token);
            if(result){
                ctx.body = {
                    code:0,
                    tokrntime:result.exp
                }
                return
            }
        }catch{
            ctx.body = {
                code:1,
            }
        }
    }
    ctx.body = {
        code:1,
    }
}