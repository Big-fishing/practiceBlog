const Comment = require('../mongodbs/utils/comment')

module.exports = async ctx =>{
    let {id,page='1',num='20'} = JSON.parse(ctx.request.query.values)
    page = +page
    num = +num
    const start = (page-1) * num
    const result = await Comment.find(id,start,num)
    if(result){
        ctx.body = {
            code:1,
            data:result
        }
        return
    }
    ctx.body = {
        code:0,
        msg:'网络繁忙'
    }
}