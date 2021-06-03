//封装统一get、post请求

import axios from 'axios';
import {message} from 'antd';
//设置axios的响应数据的统一格式
axios.interceptors.response.use(res => res.data)

export default function ajax(url,data = {}, method = 'get'){
    //url请求地址
    //data请求数据
    //method请求方式
    return new Promise(resolve =>{
        let p = null;
        if(method === 'get'){
            p = axios.get(url,{params:data})
        }else{
            p = axios.post(url,data)
        }
        p.then(res =>{
            resolve(res)
        }).catch(err =>{
            message.error(err.message,3)
        })
    })
}