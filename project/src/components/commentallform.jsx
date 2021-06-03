import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form,Input,Button, message } from 'antd';
import {Reqcreatecomment} from '../api'
import {nanoid} from 'nanoid'
import Utils from '../utlis/Utils'

class Commentallform extends Component {
    state = {
        name:'',
        src:'',
        eMail:'',
        textarea:''
    }
    Commentallformbol = true
    componentDidMount(){
        const obj = Utils.getUsertext()
        if(obj.name){
            this.setState({name:obj.name,src:obj.src,eMail:obj.eMail})
        }
    }
    componentWillUnmount(){
        this.Commentallformbol = false
    }
    color16 = ()=>{//十六进制颜色随机
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        let color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
        return color;
	}
    huadChange = (ev,text)=>{
        const value = ev.target.value
        if(text === 'name'){
            this.setState({name:value})
        }else if(text === 'src'){
            this.setState({src:value})
        }else if(text === 'eMail'){
            this.setState({eMail:value})
        }else if(text === 'textarea'){
            this.setState({textarea:value})
        }
    }
    onFinish = async()=>{
        const {pathname} = this.props.location
        const {name,src,eMail,textarea} = this.state
        if(name && src && textarea && eMail){
            const {id,userid,replytext,nodeemail} = this.props
            const admin = await Utils.checktoken()
            let forminit
            if(id){
                forminit = {
                    nameid:id,
                    name,
                    src,
                    eMail,
                    content:textarea,
                    admin:admin ? true : false,
                    color:this.color16()
                }
            }else if(userid){
                forminit = {
                    userid,
                    replyid:nanoid(),
                    name,
                    src,
                    eMail,
                    replytext:replytext ? replytext : '',
                    content:textarea,
                    admin:admin ? true : false,
                    color:this.color16(),
                    create_time:new Date()
                }
            }
            const result = await Reqcreatecomment({forminit,userid,pathname:pathname,nodeemail})
            const {code,msg} = result
            if(code === 1){
                Utils.saveUsertext({name,src,eMail})
                this.props.commentsinitlist();
                this.Commentallformbol && this.setState({textarea:''})
                this.props.replyToComments && this.props.replyToComments()
                return
            }
            message.error(msg,3)
        }
        message.error('请输入全部内容',3)
    }
    render() {
        return (
            <div className="commentallform">
                <Form>
                    <Form.Item>
                        <Input value={this.state.name} placeholder='请输入名称' onChange={ev => this.huadChange(ev,'name')} />
                    </Form.Item>
                    <Form.Item>
                        <Input value={this.state.src} onChange={ev => this.huadChange(ev,'src')} placeholder='请输入网址' />
                    </Form.Item>
                    <Form.Item>
                        <Input value={this.state.eMail} onChange={ev => this.huadChange(ev,'eMail')} placeholder='请输入邮箱' />
                    </Form.Item>
                    <Form.Item>
                        <Input.TextArea value={this.state.textarea} onChange={ev => this.huadChange(ev,'textarea')} autoSize={{ minRows: 5, maxRows: 5 }} placeholder='请输入品论内容' size='large' />
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.onFinish} type="primary" htmlType="submit" block size='large'>发布评论</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default withRouter(Commentallform) 
