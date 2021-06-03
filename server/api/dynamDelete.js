const Dynam = require('../mongodbs/utils/dynam')

module.exports = async ctx=>{
    const id = ctx.request.query.values;
    const result = await Dynam.deleteOne({_id:id});
    if(result){
        ctx.body={
            code:0,
            msg:'删除成功'
        }
        return
    }
    ctx.body={
        code:1,
        msg:'删除失败'
    }
}