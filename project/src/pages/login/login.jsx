import React, { Component } from 'react'
import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Utils from '../../utlis/Utils'
import {ReqLogin,Checkadmin,Reqlogincheck,Reqcaptcha} from '../../api'
import './login.less'
export default class Login extends Component {
    state = {
        imgSrc:Reqcaptcha + new Date().getTime(),//验证码请求url
    }
    componentDidMount(){
        //没有管理员就跳转至注册页面
        this.LoginCheckadmin()
        //检测用户是否已登录
        this.logincheck()
    }

    LoginCheckadmin = async ()=>{
        //验证是否已经拥有用户
        const result = await Checkadmin();
        const {status,msg} = result
        if(status === 0){
            this.props.history.push('/register')
            message.error(msg, 3)
        }
    }
    logincheck = async()=>{
        //验证token
        const token = Utils.getUser()
        const result = await Reqlogincheck(token);
        const {code} = result
        if(code === 0 ){
            this.props.history.push('/admin/home')
        }
    }
    changeSrc = ()=>{
        //请求验证码
        this.setState({
            imgSrc:Reqcaptcha+ new Date().getTime()
        })
    }

    onFinish = async (values)=>{
        // 请求登陆
        const result = await ReqLogin(values);
        const {status,data,msg} = result
        if(status === 0){
            Utils.saveUser(data)
            this.props.history.push('/admin/home')
            message.success(msg, 3)
            return
        }else{
            message.error(msg, 3)
        }
        this.changeSrc()
    }
    render() {
        return (
            <div className='login-form'>
                <div className='login-title'>
                    用户的登陆
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
                        name="captcha"
                        rules={[
                            { required: true, message: '请输入验证码' }
                        ]}
                    >
                        <Input addonAfter={<img width='115' src={this.state.imgSrc} onClick={this.changeSrc} alt='验证码' />}  placeholder='请输入验证码' size='large' />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block size='large'>登录</Button>
                    </Form.Item>
                </Form>
            </div> 
        )
    }
}
