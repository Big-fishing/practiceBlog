const Dynam = require('../models/dynam')

//添加
exports.save = async (parmas)=>{
    const newDynam = new Dynam(parmas)
    return newDynam.save()
}

//修改
exports.updataOne = async (data,parmas)=>{
    return await Dynam.updateOne(data,parmas)
}

//删除
exports.deleteOne = async (data)=>{
    return await Dynam.deleteOne(data)
}
//获取单个
exports.findOne = async (data)=>{
    return await Dynam.findOne(data)
}
//获取列表
exports.find = async (start,num)=>{
    const list = await Dynam.find().sort({create_time:-1}).skip(start).limit(num)
    const tol = await Dynam.find().sort({create_time:-1}).countDocuments();
    return {list,tol}
}

//获取总数
exports.findDocuments = async (bol)=>{
    if(bol){
        return await Dynam.find({})
    }else{
        return await Dynam.find({}).countDocuments();
    }
}