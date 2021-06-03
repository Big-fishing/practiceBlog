import React, { Component } from 'react'
import {Modal,Form,Input,Image,Button,message} from 'antd';
import Pubsub from 'pubsub-js'
import Texteditor from './texteditor';
import {ReqDynamadd,ReqDynamrevise} from '../api'
import Utils from '../utlis/Utils'

export default class Dynamicadd extends Component {
    state = {
        title:'',
        newHtml:'',
        visible:false,
        confirmLoading:false,
        previewImage:[]
    }
    componentDidMount(){
        if(this.props.data){
            this.setState({
                title:this.props.data.title,
                newHtml:this.props.data.content,
                previewImage:this.props.data.imgs
            })
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
    readFileimg = (ev)=>{
        //将图片转成Base64格式，并写入到状态
        const itme = ev.target;
        let {previewImage} = this.state;
        let reader = new FileReader();//创建文件读取流
        itme.files[0] && reader.readAsDataURL(itme.files[0]);
        reader.onload = () => {//文件读取完成
            previewImage.unshift(reader.result);
            this.setState({previewImage})
        }
    }
    huadtitle = ev =>{
        const {value} = ev.target;
        this.setState({title:value})
    }
    handnewhtml = (newHtml)=>{
        //将富文本编辑器的内容绑定到状态
        this.setState({newHtml})
    }
    handleCancel = (sta)=>{
        if(sta === 1){
            this.setState({
                title:'',
                newHtml:'',
                visible:false,
                confirmLoading:false,
                previewImage:[]
            })
        }else if(sta === 2){
            this.setState({
                title:this.props.data.title,
                newHtml:this.props.data.content,
                previewImage:this.props.data.imgs,
                visible:false,
                confirmLoading:false
            })
        }else{
            this.setState({
                visible:false,
                confirmLoading:false
            })
        }
    }
    deletaimg=(index) => {
        const {previewImage} = this.state;
        previewImage.splice(index,1)
        this.setState({previewImage})
    }
    handleOk = async ()=>{
        const {title,previewImage,newHtml,} = this.state;
        const {_id} = this.props.data || ''
        this.setState({confirmLoading:true})//加载中
        let formInit = null
        if(title && newHtml){
            formInit={
                title:title,
                imgs:previewImage,
                content:newHtml
            }
            //this.props.type存在值就代表是新建状态，反之则是修改。
            //根据当前状态发出相应请求，状态由父级下发
            const result = this.props.type ? await ReqDynamadd(formInit) : await ReqDynamrevise({_id,formInit});
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
        const {visible,previewImage,confirmLoading,newHtml} = this.state
        return (
            <div className="admin-Item-Add" style={{display:'inline-block',float: 'none'}}>                
            <Button type="primary" onClick={this.showModal}>
                {this.props.type ? '新建' : '修改'}
            </Button>
            <Modal
                okText={this.props.type ? '确认' : '修改'}
                cancelText="取消"
                width={1200}
                title={this.props.type ? '添加动态' : '修改动态'}
                destroyOnClose={true}
                keyboard={false}
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={()=>{this.props.type  ? this.handleCancel(1) :this.handleCancel(2)}}
            >
                <Form>
                    <Form.Item label={'内容简写'} >
                        <Input value={this.state.title} onChange={ev => this.huadtitle(ev)} name='title'/>
                    </Form.Item>
                    <Form.Item label={'内容'} >
                        <Texteditor handnewhtml={this.handnewhtml} newHtml={newHtml}/>
                    </Form.Item>
                    <Form.Item label={'图片'} >
                        {previewImage.length === 0 ? '未上传图片' : previewImage.map((itme,index)=>{
                            return(
                                <div className="dontimg" key={(Math.random()*index)}>
                                    <p onClick={()=>{this.deletaimg(index)}}>删除</p>
                                    <Image src={itme}  width="88px" alt="封面"/>
                                </div>
                            )
                        }) }
                        {previewImage.length < 5 &&  <Input id='readFileimg' type="file" onChange={this.readFileimg} name='img'/>}
                    </Form.Item>
                </Form>
            </Modal>
            </div>
        )
    }
}

