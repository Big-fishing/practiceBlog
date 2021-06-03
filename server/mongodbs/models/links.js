const mongoose =  require('mongoose')

//设置用户表的数据格式
const linksSchema = new mongoose.Schema({
    title:{type:String,default:''},//标题
    links_src:{type:String,default:''},//链接 
    links_img:{type:String,default:''},//头像
    create_time:{    //创建时间
        type:Date,
        default:Date.now
    },
})

//project 数据库下的links 使用noteSchema
module.exports = mongoose.model('links',linksSchema)