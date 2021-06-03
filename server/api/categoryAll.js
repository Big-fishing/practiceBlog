const Note = require('../mongodbs/utils/note')
const Dynam = require('../mongodbs/utils/dynam')
const Links = require('../mongodbs/utils/links')
const About = require('../mongodbs/utils/about')


module.exports = async ctx=>{
    //获取列表
    const htmlnumber = await Note.findClass('Hmtl_css');
    const jsnumber = await Note.findClass('javascript');
    const nodenumber = await Note.findClass('nodeJs');
    const reactnumber = await Note.findClass('reactjs');
    const Dynamnumber = await Dynam.findDocuments();
    const Linksnumber = await Links.findDocuments();
    const result = [
        {
            value:htmlnumber,
            name:'Hmtl_css'
        },
        {
            value:jsnumber,
            name:'javascript'
        },
        {
            value:nodenumber,
            name:'nodeJs'
        },
        {
            value:reactnumber,
            name:'reactjs'
        },
        {
            value:Dynamnumber,
            name:'动态'
        },
        {
            value:Linksnumber,
            name:'友链'
        }
    ]

    ctx.body = {
        code:1,
        data:result
    }
}
