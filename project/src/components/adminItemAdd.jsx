import React, { Component } from 'react';
import {Button,Modal,Form,Input,Image,message} from 'antd';
import Pubsub from 'pubsub-js'

import Texteditor from './texteditor';
import {Reqnoteadd,Reqnoterevise}  from '../api/index'
import Utils from '../utlis/Utils'



export default class AdminItemAdd extends Component {
    state = {
        visible:false,
        confirmLoading:false,
        formInit:{
            title:'',
            previewImage:'',
            newHtml:'',
            content_title:''
        }
    }
    showModal = async ()=>{
        const result = await Utils.checktoken()
        if(result){
            Pubsub.publish('token',result)
            this.setState({visible:true})
        }else{
            Pubsub.publish('token',result)
        }
    }
    handleCancel = (sta)=>{
        //新建成功或返回执行1，修改状态返回执行2，修改成功执行3
        if(sta===1){
            //新建状态执行隐藏函数，将state清空
            this.setState({
                visible:false,  
                confirmLoading:false,
                formInit:{
                    title:'',
                    previewImage:'',
                    newHtml:'',
                    content_title:''
                }
            })
        }else if(sta===2){
            //修改状态执行隐藏函数，将state恢复初始化
            const {title,title_img,content,content_title} = this.props.data
            this.setState({
                visible:false,
                confirmLoading:false,
                formInit:{
                    title,
                    previewImage:title_img,
                    newHtml:content,
                    content_title,
                }
            })
        }else if(sta===3){
            //修改成功状态执行隐藏函数，仅修改隐藏的布尔值，不修改formInit
            this.setState({
                visible:false,
                confirmLoading:false
            })
        }
    }

    componentDidMount(){
        //没有检测到data说明是新建状态，state默认为空
        if(this.props.data){
            //检测到data说明是修改状态
            const {title,title_img,content,content_title} = this.props.data
            // 初始化内容
            this.setState({
                formInit:{
                    title,
                    previewImage:title_img,
                    newHtml:content,
                    content_title,
                }
            })
        }
    }
    handChage = (ev,name)=>{
        //根据Input value修改状态
        let result = ev.target.value;
        let formInit = {...this.state.formInit};
        formInit[name] = result
        this.setState({formInit})
    }
    handnewhtml = (newHtml)=>{
        //将富文本编辑器的内容绑定到状态
        let formInit = {...this.state.formInit};
        formInit.newHtml = newHtml
        this.setState({formInit})
    }
    readFileimg = (ev)=>{
        //将图片转成Base64格式，并写入到状态
        const itme = ev.target;
        let formInit = {...this.state.formInit};
        let reader = new FileReader();//创建文件读取流
        itme.files[0] && reader.readAsDataURL(itme.files[0]);
        reader.onload = () => {//文件读取完成
            formInit.previewImage = reader.result;
            this.setState({formInit})
        }
    }

    
    handleOk = async()=>{
        const {title,previewImage,newHtml,content_title} = this.state.formInit;
        const {_id} = this.props.data || ''
        this.setState({confirmLoading:true})//加载中
        let formInit = null
        if(title && previewImage && newHtml && content_title){
            formInit={
                title:title,
                title_img:previewImage,
                content:newHtml,
                content_title,
                noteClass:this.props.type
            }
            //this.props.type存在值就代表是新建状态，反之则是修改。
            //根据当前状态发出相应请求，状态由父级下发
            const result = this.props.type ? await Reqnoteadd(formInit) : await Reqnoterevise({_id,formInit});
            !result && this.setState({confirmLoading:false}) //结束加载
            const {code,msg} = result
            if(code === 0){
                message.success(msg,3)
                this.props.type ? this.handleCancel(1) : this.handleCancel(3)//新建成功执行1，修改成功执行3
                this.props.getTable()
            }else{
                this.setState({confirmLoading:false})
                message.error(msg,3)
            }
        }else{
            this.setState({confirmLoading:false})
            message.error('请填写完内容',3)
        }
    }
    render() {
        const {visible,confirmLoading} = this.state;
        return (
            <div className="admin-Item-Add">
                <Button type="primary" onClick={this.showModal}>
                    {this.props.type ? '新建' : '修改'}
                </Button>
                <Modal
                    okText={this.props.type ? '确认' : '修改'}
                    cancelText="取消"
                    width={1200}
                    title={this.props.type ? '添加文章' : '修改文章'}
                    destroyOnClose={true}
                    keyboard={false}
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={()=>this.props.type ? this.handleCancel(1) : this.handleCancel(2)}
                >
                    <Form>
                        <Form.Item label={'文章标题'} >
                            <Input placeholder='请输入标题' value={this.state.formInit.title} onChange={ev=>this.handChage(ev,'title')}/>
                        </Form.Item>
                        <Form.Item label={'封面图片'} >
                            {this.state.formInit.previewImage && <Image src={this.state.formInit.previewImage}  width="88px" alt="封面"/>}
                            <Input id='readFileimg' type="file" onChange={this.readFileimg} name='img'/>
                        </Form.Item>
                        <Form.Item label={'内容'} >
                            <Texteditor handnewhtml={this.handnewhtml} newHtml={this.state.formInit.newHtml}/>
                        </Form.Item>
                        <Form.Item label={'配置目录'} >
                            <Input.TextArea autoSize={{ minRows: 6, maxRows: 6 }} placeholder='请输入目录' value={this.state.formInit.content_title} onChange={ev=>this.handChage(ev,'content_title')}/>
                        </Form.Item>
                        <Form.Item label={'分类'} >
                            {this.props.type || this.props.data.noteClass }
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}