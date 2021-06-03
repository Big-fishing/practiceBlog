const Note = require('../mongodbs/utils/note')
const Dynam = require('../mongodbs/utils/dynam')
const Comment = require('../mongodbs/utils/comment')

module.exports = async ctx=>{
    const wNum = await Note.findNum();
    const dNum = await Dynam.findDocuments();
    const {list,tol} = await Comment.findNum();
    let pNum = 0;
    await list.forEach(itme =>{
            if(itme.children.length){
                for(let i = 0;i < itme.children.length ; i++){
                    pNum += 1
                }
            }
        })
    ctx.body = {
        code:1,
        data:{w:wNum,d:dNum,p:pNum+tol}
    }
}