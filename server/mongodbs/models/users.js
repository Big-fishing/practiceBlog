const mongoose =  require('mongoose')

//设置用户表的数据格式
const userSchema = new mongoose.Schema({
    username:String,    //用户名
    password:String,     //用户密码
    create_time:{        //用户创建的初始时间
        type:Date,
        default:Date.now
    },
    token:String,//TOKEN
    IP:String,//客户端IP
})

//project 数据库下的users  使用userSchema
module.exports = mongoose.model('users',userSchema)