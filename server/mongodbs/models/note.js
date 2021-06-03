const mongoose =  require('mongoose')

//设置用户表的数据格式
const noteSchema = new mongoose.Schema({
    title:{type:String,default:''},//标题
    title_img:{type:String,default:''},//封面
    content:{type:String,default:''},//内容 
    content_title:{ type:String,default:'作者未设置目录'},//目录
    noteClass:{type:String,default:''},//分类
    create_time:{    //创建时间
        type:Date,
        default:Date.now
    },
    good:{type:Number,default:0},//点赞
    visits:{type:Number,default:0},//访问量
})

//project 数据库下的note 使用noteSchema
module.exports = mongoose.model('note',noteSchema)