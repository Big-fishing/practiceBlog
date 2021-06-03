const Comment = require('../mongodbs/utils/comment');
const {main} = require('../utils/utils')

module.exports = async ctx =>{
    const {forminit,userid,pathname,nodeemail} = ctx.request.body.values;
    const reg =/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
    if(userid){
        const result = await Comment.findOne({_id:userid})
        if(result){
            const n = await Comment.updataOne({_id:result._id},{$set:{children:[...result.children,forminit]}})
            if(n.n === 1 && n.nModified === 1){
                reg.test(nodeemail) && await main(nodeemail,`${pathname}?_id=${result.nameid}`,forminit.content,forminit.name)
                ctx.body = { code:1 }
                return
            }
        }
        ctx.body = { code:0 , msg:'繁忙' }
        return
    }
    //新建评论
    const result = await Comment.save(forminit)
    if(result){
        await main('964345264@qq.com',`${pathname}?_id=${result.nameid}`,forminit.content,forminit.name)
        ctx.body = { code:1 }
        return
    }
    ctx.body = { code:0 , msg:'繁忙' }
}