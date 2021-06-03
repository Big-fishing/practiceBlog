const About = require('../models/about')

//添加
exports.save = async (parmas)=>{
    const newAbout = new About(parmas)
    return newAbout.save()
}

//修改
exports.updataOne = async (data,parmas)=>{
    return await About.updateOne(data,parmas)
}
//获取单个
exports.findOne = async ()=>{
    return await About.findOne({})
}