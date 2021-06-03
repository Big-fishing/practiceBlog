const Links = require('../models/links')

//添加
exports.save = async (parmas)=>{
    const newlinks = new Links(parmas)
    return newlinks.save()
}

//修改
exports.updataOne = async (data,parmas)=>{
    return await Links.updateOne(data,parmas)
}

//删除
exports.deleteOne = async (data)=>{
    return await Links.deleteOne(data)
}
//获取单个
exports.findOne = async (data)=>{
    return await Links.findOne(data)
}
//获取分页列表
exports.find = async (start,num)=>{
    const list = await Links.find().sort({create_time:-1}).skip(start).limit(num)
    const tol = await Links.find().sort({create_time:-1}).countDocuments();
    return {list,tol}
}

//获取列表
exports.findhoem = async (start,num)=>{
    const list = await Links.find().sort({create_time:-1})
    return list
}


//获取总数
exports.findDocuments = async (bol)=>{
    if(bol){
        return await Links.find({})
    }else{
        return await Links.find({}).countDocuments();
    }
}