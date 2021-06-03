import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { message,Modal } from 'antd'
import {LogoutOutlined } from '@ant-design/icons';
import Utils from '../utlis/Utils'
import menusConfig from '../config/menusConfig'


class Header extends Component {
    state = {
        newtime:''
    }
    componentDidMount(){
        //日期
        this.times = setInterval(() => {
            const newtime = Utils.setnewtime()
            this.setState({newtime})
        }, 1000);
    }
    componentWillUnmount(){
        //清楚日期的定时器
        clearInterval(this.times)
    }
    //退出登陆
    LogOut = ()=>{
        // 显示确认框
        Modal.confirm({
            content: '确定退出吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
            // 删除保存的user数据
            Utils.removeUser();
            message.success('成功退出登陆',3)
            // 跳转到login
            this.props.history.replace('/login')
            }
        })
    }
    gettitle = ()=>{
        const path = this.props.location.pathname;
        let title
        menusConfig.forEach(itme=>{
            if(itme.key === path){
                title = itme.title
            }else if(itme.children){
                const result = itme.children.find(cItme => path.indexOf(cItme.key) === 0);
                if(result){
                    title = result.title
                }
            }
        })
        return title
    }

    render() {
        const title = this.gettitle()
        return (
            <>
                <div className='admin-head'>
                    <span className='admin-headTime'>{this.state.newtime}</span>
                    <button onClick={this.LogOut} ><LogoutOutlined title={'退出登录'}/>退出登录</button>
                </div>
                <div className="admin-headend">
                    <span>{title}</span>
                    <i></i>
                </div>
            </>
        )
    }
}
export default withRouter(Header)