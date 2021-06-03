const Users =  require('../models/users')

//添加
exports.save = async (parmas)=>{
    const admins = new Users(parmas)
    return admins.save()
}
//修改
exports.updataOne = async (data,parmas)=>{
    return await Users.updateOne(data,parmas)
}
//查询
exports.findOne = async (parmas)=>{
    return await Users.findOne(parmas)
}