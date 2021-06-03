const Note = require('../mongodbs/utils/note')

module.exports = async ctx =>{
    const id = ctx.request.query.values
    let result = await Note.findOne({_id:id})
    if(result){
        const bol = await Note.updataOne({_id:result._id},{$set:{good:result.good+1}})
        if(bol.n === 1 && bol.nModified === 1){
            result = await Note.findOne({_id:id})
            ctx.body = {
                code:1,
                good:result.good
            }
        }else{
            ctx.body = {
                code:2,
                msg:'繁忙'
            }
        }
    }
}