import React, { Component } from 'react'
import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import {ReqRegister,Checkadmin} from '../../api'

import '../login/login.less'

export default class Register extends Component {
    componentDidMount(){
        //如果已有管理员就跳转至登陆页面
        this.regcheckadmin()
    }
    regcheckadmin = async ()=>{
        const result = await Checkadmin();
        const {status,msg} = result
        if(status === 1){
            message.error(msg,3);
            this.props.history.push('/login');
        }
    }
    onFinish = async (value) =>{
        const {username,password,password1} = value;
        if(password !== password1){
            message.error('两次密码不不相同，请重新输入密码',3) 
            return
        }
        const userOne = {username:username,password:password}
        const result = await ReqRegister(userOne);
        const {status,msg} = result;
        if(status === 1){
            message.success(msg,3);
            this.props.history.push('/login');
        }else{
            message.error(msg,3);
        }
    }
    render() {
        return (
            <div className='login-form'>
                <div className='login-title'>
                    用户的注册
                </div>
                <Form onFinish={this.onFinish}>
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: '请输入您的账号' },
                            { max:12,message:'账号不得大于12字' },
                            { min:4,message:'账号不得小于4字' }
                    ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder='请输入账号4-12字' size='large' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: '请输入您的密码' },
                            { max:12,message:'密码不得大于12字' },
                            { min:6,message:'密码不得小于6字' }
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}  placeholder='请输入密码6-12字' size='large' />
                    </Form.Item>
                    <Form.Item
                        name="password1"
                        rules={[
                            { required: true, message: '请再次输入您的密码' },
                            { max:12,message:'密码不得大于12字' },
                            { min:6,message:'密码不得小于6字' }
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}  placeholder='请输入密码6-12字' size='large' />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block size='large'>注册</Button>
                    </Form.Item>
                </Form>
            </div> 
        )
    }
}
