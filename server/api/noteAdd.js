const Note = require('../mongodbs/utils/note')

module.exports = async ctx =>{
    const value = ctx.request.body.values;
    const checktitle = await Note.findOne({title:value.title})
    if(checktitle){
        ctx.body = {
            code:1,
            msg:'该文章已存在！'
        }
        return
    }
    const result = await Note.save(value)
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