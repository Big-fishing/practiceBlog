import React, { Component } from 'react';
import { Form,Input,Button,message } from 'antd';
import {LockOutlined} from '@ant-design/icons'
import {Reqpasswordrevise,Reqcaptcha} from '../../api'

export default class Password extends Component {
    state = {
        imgSrc:Reqcaptcha+ new Date().getTime(),//验证码请求url
    }
    changeSrcsta  = true
    changeSrc = ()=>{
        //请求验证码
        this.setState({
            imgSrc:Reqcaptcha+ new Date().getTime()
        })
    }

    onFinish = async(value)=>{
        const {password,newpassword,newpassword2,captcha} = value
        if(newpassword !== newpassword2){
            message.error('两次密码不不相同，请重新输入密码',3) 
            return
        }
        const result = await Reqpasswordrevise({password,newpassword,captcha});
        const {code,msg} = result;
        if(code=== 1){
            this.changeSrcsta = false
            message.success(msg,3);
            this.props.history.push('/login')
        }else{
            message.error(msg,3);
        }
        this.changeSrcsta && this.changeSrc()
    }
    render() {
        return (
            <div id='admin-password'>
                <Form onFinish={this.onFinish} style={{maxWidth:'800px',margin:'auto'}} >
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: '请输入旧密码' },
                    ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='请输入旧密码' size='large' />
                    </Form.Item>
                    <Form.Item
                        name="newpassword"
                        rules={[
                            { required: true, message: '请输入您的密码' },
                            { max:12,message:'密码不得大于12字' },
                            { min:6,message:'密码不得小于6字' }
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}  placeholder='请输入新密码6-12字' size='large' />
                    </Form.Item>
                    <Form.Item
                        name="newpassword2"
                        rules={[
                            { required: true, message: '请输入您的密码' },
                            { max:12,message:'密码不得大于12字' },
                            { min:6,message:'密码不得小于6字' }
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}  placeholder='请输入新密码6-12字' size='large' />
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
                        <Button type="primary" htmlType="submit" block size='large'>确认修改</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
