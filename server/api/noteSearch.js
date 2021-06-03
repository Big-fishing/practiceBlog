const Note = require('../mongodbs/utils/note')

module.exports = async ctx=>{
    let {type ,page='1',num='8',search} = JSON.parse(ctx.request.query.values);
    page = +page
    num = +num
    const start = (page-1) * num
    const result = await Note.findSearch(type,start,num,search)
    if(result){
        ctx.body = {
            data:result,
            msg:'搜索内容成功',
            code:0
        }
        return
    }
    ctx.body = {
        msg:'没有内容',
        code:1
    }
}