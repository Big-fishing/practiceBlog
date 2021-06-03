const mongoose =  require('mongoose')

//设置用户表的数据格式
const commentSchema = new mongoose.Schema({
    nameid:{type:String,default:''},//网址
    name:{type:String,default:''},//用户
    src:{type:String,default:''},//网址
    eMail:{type:String,default:''},//邮箱
    content:{type:String,default:''},//内容 
    color:{type:String,default:''},//颜色
    admin:{type:Boolean,default:false},
    children:{type:Array,default:[]},//封面
    create_time:{    //创建时间
        type:Date,
        default:Date.now
    }
})

//project 数据库下的comment 使用commentSchema
module.exports = mongoose.model('comment',commentSchema)