const About = require('../mongodbs/utils/about')

module.exports = async ctx =>{
    let bol = ctx.request.query.values
    let result = await About.findOne();
    if(bol){
        const visitsadd = await About.updataOne({_id:result._id},{$set:{visits:result.visits+1}});
        if(visitsadd.n ===1 && visitsadd.nModified === 1){
            result = await About.findOne();
        }
    }
    if(result){
        const {content,_id} = result
        ctx.body={
            result,
            id:_id,
            data:content,
            code:1,
            msg:'请求成功'
        }
    }else{
        ctx.body={
            code:2,
            msg:'没有数据'
        }
    }
}