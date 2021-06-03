const Dynam = require('../mongodbs/utils/dynam')

module.exports = async ctx=>{
    const id = ctx.request.query.values;
    const result = await Dynam.findOne({_id:id});
    if(result){
        const bol = await Dynam.updataOne({_id:result._id},{$set:{visits:result.visits + 1}})
        if(bol.n === 1 && bol.nModified === 1){
            ctx.body ={
                code:1
            }
            return
        }
        ctx.body ={
            code:0,
            msg:'出错'
        }
        return
    }
    ctx.body ={
        code:0,
        msg:'出错'
    }
}