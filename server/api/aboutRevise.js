const About = require('../mongodbs/utils/about')

module.exports = async ctx =>{
    const {id,content} = ctx.request.body.values;
    const checkvalue = await About.findOne({});
    if(checkvalue){
        if(checkvalue.content === content){
            ctx.body ={
                code:2,
                msg:'您未做任何修改'
            }
            return
        }
        const result = await About.updataOne({_id:id},{$set:{content}})
        if(result.n === 1 && result.nModified === 1){
            ctx.body ={
                code:1,
                msg:'修改成功'
            }
        }else{
            ctx.body ={
                code:2,
                msg:'修改失败'
            }
        }
    }else{
        const result = await About.save({content});
        if(result.n === 1 && result.nModified === 1){
            ctx.body ={
                code:1,
                msg:'添加成功'
            }
        }else{
            ctx.body ={
                code:2,
                msg:'添加失败'
            }
        }
    }
}