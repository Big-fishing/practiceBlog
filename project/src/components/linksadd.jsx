import React, { Component } from 'react'
import {Modal,Form,Input,Button,message} from 'antd';
import Pubsub from 'pubsub-js'
import {ReqLinksadd,ReqLinksrevise} from '../api'
import Utils from '../utlis/Utils'

export default class Linksadd extends Component {
    state = {
        title:'',
        links_src:'',
        links_img:'',
        visible:false,
        confirmLoading:false,
    }
    componentDidMount(){
        if(this.props.data){
            this.setState({
                title:this.props.data.title,
                links_src:this.props.data.links_src,
                links_img:this.props.data.links_img
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
    huaChange = (ev,val) =>{
        const {value} = ev.target;
        if(val === 'title'){
            this.setState({title:value})
        }else if(val === 'links_src'){
            this.setState({links_src:value})

        }else if(val === 'links_img'){
            this.setState({links_img:value})

        }
    }
    handleCancel = (sta)=>{
        if(sta === 1){
            this.setState({
                title:'',
                links_src:'',
                links_img:'',
                visible:false,
                confirmLoading:false,
            })
        }else if(sta === 2){
            this.setState({
                title:this.props.data.title,
                links_src:this.props.data.links_src,
                links_img:this.props.data.links_img,
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
    handleOk = async ()=>{
        const {title,links_src,links_img,} = this.state;
        const {_id} = this.props.data || ''
        this.setState({confirmLoading:true})//加载中
        let formInit = null
        if(title && links_src && links_img){
            formInit={
                title,
                links_src,
                links_img
            }
            //this.props.type存在值就代表是新建状态，反之则是修改。
            //根据当前状态发出相应请求，状态由父级下发
            console.log(formInit)
            const result = this.props.type ? await ReqLinksadd(formInit) : await ReqLinksrevise({_id,formInit});
            console.log(result)
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
        const {visible,confirmLoading,} = this.state
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
                    <Form.Item label={'昵称'} >
                        <Input value={this.state.title} onChange={ev => this.huaChange(ev,'title')} name='title'/>
                    </Form.Item>
                    <Form.Item label={'网址'} >
                        <Input value={this.state.links_src} onChange={ev => this.huaChange(ev,'links_src')} name='links_src'/>
                    </Form.Item>
                    <Form.Item label={'图片地址'} >
                        <Input value={this.state.links_img} onChange={ev => this.huaChange(ev,'links_img')} name='links_img'/>
                    </Form.Item>
                </Form>
            </Modal>
            </div>
        )
    }
}