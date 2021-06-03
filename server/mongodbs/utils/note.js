const Note = require('../models/note')

//添加
exports.save = async (parmas)=>{
    const notes = new Note(parmas)
    return notes.save()
}

//修改
exports.updataOne = async (data,parmas)=>{
    return await Note.updateOne(data,parmas)
}

//删除
exports.deleteOne = async (data)=>{
    return await Note.deleteOne(data)
}
//单个查询
exports.findOne = async (noteClass)=>{
    return await Note.findOne(noteClass)
}

//获取列表
exports.find = async (noteClass,start,num)=>{
    let list = null
    let tol  = null
    if(noteClass){
       list = await Note.find({noteClass}).sort({create_time:-1}).skip(start).limit(num)
       tol  = await Note.find({noteClass}).sort({create_time:-1}).countDocuments();
    }else{
        list = await Note.find({}).sort({create_time:-1}).skip(start).limit(num)
        tol  = await Note.find({}).sort({create_time:-1}).countDocuments();
    }
    return {list,tol}
}

//搜索列表
exports.findSearch = async (noteClass,start,num,search)=>{
    let list = null;
    let tol = null;   
    if(noteClass){
        list = await Note.find({title:new RegExp(search),noteClass}).sort({create_time:-1}).skip(start).limit(num)
        tol = await Note.find({title:new RegExp(search),noteClass}).countDocuments();
    }else{
        list = await Note.find({title:new RegExp(search)}).sort({create_time:-1}).skip(start).limit(num)
        tol = await Note.find({title:new RegExp(search)}).countDocuments();
    }
    return {list,tol}
}


//分类查询
exports.findClass = async (noteClass,visits)=>{
    if(visits){
        return await Note.find({noteClass});
    }else{
        return await Note.find({noteClass}).countDocuments();
    }
}

exports.findNum = async ()=>{
    return await Note.find({}).countDocuments();
}