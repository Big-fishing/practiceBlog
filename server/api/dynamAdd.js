const Dynam = require('../mongodbs/utils/dynam')


module.exports = async ctx =>{
    const value = ctx.request.body.values;
    const result = await Dynam.save(value)
    if(result){
        ctx.body = {
            code:0,
            msg:'添加成功！'
        }
        return
    }
    ctx.body = {
        code:1,
        msg:'添加失败！'
    }
}