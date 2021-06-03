const Dynam = require('../mongodbs/utils/dynam')

module.exports = async ctx =>{
    const _id = ctx.request.query.values;
    const check_id = await Dynam.findOne({_id});
    if(check_id){
        const result = await Dynam.updataOne({_id:check_id._id},{$set:{good:check_id.good+1}})
        if(result.n === 1 && result.nModified === 1){
            ctx.body = {
                code:1
            }
        }else{
            ctx.body = {
                code:2,
                msg:'服务端繁忙，请稍后在点'
            }
        }
    }
}