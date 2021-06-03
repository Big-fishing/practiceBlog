const mongoose =  require('mongoose')

//设置用户表的数据格式
const aboutSchema = new mongoose.Schema({
    content:{type:String,default:''},//内容
    create_time:{    //创建时间
        type:Date,
        default:Date.now
    },
    good:{type:Number,default:0},//点赞
    visits:{type:Number,default:0},//访问量
})

//project 数据库下的about 使用noteSchema
module.exports = mongoose.model('about',aboutSchema)