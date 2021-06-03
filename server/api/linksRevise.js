const Links = require('../mongodbs/utils/links')

module.exports = async ctx=>{
    const {_id,formInit} = ctx.request.body.values;
    const check_id = await Links.findOne({_id});
    if(check_id.title === formInit.title &&
        check_id.links_src === formInit.links_src &&
        check_id.links_img === formInit.links_img){
        ctx.body = {
            code:1,
            msg:'您未作如何修改'
        }
        return
    }
    const result = await Links.updataOne(check_id,{$set:formInit})
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