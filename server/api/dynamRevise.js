const Dynam = require('../mongodbs/utils/dynam')

module.exports = async ctx=>{
    const {_id,formInit} = ctx.request.body.values;
    const check_id = await Dynam.findOne({_id});
    let imgs = null;
    let length = 0;
    //判断数组内的图片是否变化
    if(check_id.imgs.length === formInit.imgs.length){
        imgs = true
        while(imgs && length<check_id.imgs.length){
            imgs = check_id.imgs[length] === formInit.imgs[length];
            length = ++length
        }
    }else{
        imgs = false
    }
    if(check_id.title === formInit.title &&
        imgs && 
        check_id.content === formInit.content){
        ctx.body = {
            code:1,
            msg:'您未作如何修改'
        }
        return
    }
    const result = await Dynam.updataOne(check_id,{$set:formInit})
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