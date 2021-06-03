const Comment = require('../models/comment')

//添加
exports.save = async (parmas)=>{
    const newComment = new Comment(parmas)
    return newComment.save()
}

//修改
exports.updataOne = async (data,parmas)=>{
    return await Comment.updateOne(data,parmas)
}
//获取单个
exports.findOne = async (obj)=>{
    return await Comment.findOne(obj)
}

//获取列表
exports.find = async (nameid,start,num)=>{
    const list = await Comment.find({nameid:nameid}).sort({create_time:-1}).skip(start).limit(num)
    const tol  = await Comment.find({nameid:nameid}).sort({create_time:-1}).countDocuments();
    return {list,tol}
}

//获取全部
exports.findNum = async()=>{
    const list = await Comment.find({})
    const tol  = await Comment.find({}).countDocuments();
    return {list,tol}
}