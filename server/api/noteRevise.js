const Note = require('../mongodbs/utils/note')

module.exports = async ctx=>{
    const {_id,formInit} = ctx.request.body.values;
    const check_id = await Note.findOne({_id});
    if(check_id.title === formInit.title &&
        check_id.title_img === formInit.title_img && 
        check_id.content === formInit.content && 
        check_id.content_title === formInit.content_title){
        ctx.body = {
            code:1,
            msg:'您未作如何修改'
        }
        return
    }
    const result = await Note.updataOne(check_id,{$set:formInit})
    if(result.n === 1 && result.nModified === 1){
        ctx.body = {
            code:0,
            msg:'修改成功'
        }
    }else{
        ctx.body = {
            code:1,
            msg:'修改失败'
        }
    }
}