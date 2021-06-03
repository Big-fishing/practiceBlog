const Note = require('../mongodbs/utils/note')

module.exports = async ctx=>{
    const {_id} = JSON.parse(ctx.request.query.values)
    let result = await Note.findOne({_id})
    if(result){
        const visitsadd = await Note.updataOne({_id:result._id},{$set:{visits:result.visits+1}})
        if(visitsadd.n === 1 && visitsadd.nModified === 1){
            result = await Note.findOne({_id})
        }
    }
    if(result){
        ctx.body = {
            code:1,
            data:result
        }
    }
}