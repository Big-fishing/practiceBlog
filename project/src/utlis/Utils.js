/*
*   该文件的作用是存放一些常用的方法
* */
import {Reqlogincheck} from '../api'

const Utils ={
    saveUser:function (userInfo) {  //保存管理员信息
        localStorage.setItem('userInfo',userInfo)
    },
    getUser:function () {   //获取管理员信息
        return localStorage.getItem('userInfo')||'{}'
    },
    removeUser:function () {    //删除管理员信息
        localStorage.removeItem('userInfo')
    },
    setnewtime:(date)=>{    // 获取日期
        date = date || new Date()
        const n = date.getUTCFullYear()//年
        const y = (date.getMonth()+1 < 10 ? `0${date.getMonth()+1}`: date.getMonth()+1) //月
        const r = date.getDate() < 10 ? `0${date.getDate()}`: date.getDate() //日
        const h = date.getHours() < 10 ? `0${date.getHours()}`: date.getHours() //时
        const m = date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes() //分
        const s = date.getSeconds() < 10 ? `0${date.getSeconds()}`: date.getSeconds() //秒
        return `${n}-${y}-${r} ${h}:${m}:${s}`
    },
    checktoken: async()=>{
        //验证token
		const token = Utils.getUser();
		const result = await Reqlogincheck(token);
		const {code,tokrntime} = result;
		if(code === 1){
            return false
		}
        return tokrntime
    },
    saveUsertext:function (userInfo) {  //保存用户信息
        localStorage.setItem('usertext',JSON.stringify(userInfo))
    },
    getUsertext:function () {   //获取用户信息
        return JSON.parse(localStorage.getItem('usertext')) ||'{}'
    }
}
export default Utils