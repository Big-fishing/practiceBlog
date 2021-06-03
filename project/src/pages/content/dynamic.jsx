import React, { Component } from 'react'
import {message,Pagination,Empty } from 'antd'
import LoadingSpin from '../../components/LoadingSpin'
import Dynamicitme from '../../components/dynamicitme'
import  { ReqDynamlist } from '../../api'

export default class Dynamic extends Component {
    state ={
        data:'',
        pageSize:15,
        total:'',
    }
    Dynamicbol = true;
    componentDidMount(){
        this.getlist()
    }
    componentWillUnmount(){
        this.Dynamicbol = false
    }
    getlist = async(page)=>{
        const {pageSize} = this.state
        const result = await ReqDynamlist({page,num:pageSize})
        const {code,data,msg} = result
        if(code === 0 && result){
            this.Dynamicbol && this.setState({data:data.list,total:data.tol})
            return
        }
        message.success(msg,3)
    }
    render() {
        const {pageSize,total,data} = this.state
        return (
            <div id='home-center-content'>
                {  data.length ?
                    data.map(itme => <Dynamicitme key={itme._id} {...itme}/> ) 
                    : typeof data === 'string' ? 
                    <LoadingSpin />
                    :
                    <Empty style={{backgroundColor:'#fff'}} description='暂无数据'/>
                }
                { data.length ? <Pagination onChange={this.getlist} defaultCurrent={pageSize} total={total} /> : ''}
            </div>
        )
    }
}
