const Note = require('../mongodbs/utils/note')
const Dynam = require('../mongodbs/utils/dynam')
const About = require('../mongodbs/utils/about')


module.exports = async ctx=>{
    //获取列表
    const html = await Note.findClass('Hmtl_css',true);
    const js = await Note.findClass('javascript',true);
    const node = await Note.findClass('nodeJs',true);
    const react = await Note.findClass('reactjs',true);
    const dynam = await Dynam.findDocuments(true);
    const about = await About.findOne()
    //设定默认值
    let htmlnumber = 0
    let jsnumber = 0
    let nodenumber = 0
    let reactnumber = 0
    let dynamnumber = 0
    let Aboutnumber =  about ? about.visits : 0
    //通过循环获取各分类的总访问量
    html && html.forEach(itme => htmlnumber += itme.visits)
    js && js.forEach(itme => jsnumber += itme.visits)
    node && node.forEach(itme => nodenumber += itme.visits)
    react && react.forEach(itme => reactnumber += itme.visits)
    dynam && dynam.forEach(itme => dynamnumber += itme.visits)
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
            value:dynamnumber,
            name:'动态'
        },
        {
            value:Aboutnumber,
            name:'关于'
        }
    ]

    ctx.body = {
        code:1,
        data:result,
    }
}
