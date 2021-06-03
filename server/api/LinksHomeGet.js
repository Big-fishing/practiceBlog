const Links = require('../mongodbs/utils/links')

module.exports = async ctx=>{
    const result = await Links.findhoem()
    if(result){
        ctx.body = {
            code:1,
            data:result
        }
    }
}