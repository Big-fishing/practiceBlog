const Note = require('../mongodbs/utils/note')

module.exports = async ctx=>{
    let {type,page='1',num='8'} = JSON.parse(ctx.request.query.values);
    // console.log(11111)
    page = +page
    num = +num
    const start = (page-1) * num
    const result = await Note.find(type,start,num)
    if(result){
        ctx.body = {
            data:result,
            msg:'获取成功',
            code:0
        }
        return
    }
    ctx.body = {
        msg:'当前分类没有内容',
        code:1
    }
}