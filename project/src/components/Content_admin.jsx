import React, { Component } from 'react'
import {Input,Button,Table, message,Space,Modal } from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import Pubsub from 'pubsub-js'
import AdminItemAdd from './adminItemAdd'
import LoadingSpin from './LoadingSpin'
import {Getcontentlist,Reqnotedelete,ReqnoteSearch} from '../api'
import Utils from '../utlis/Utils'

const {Column} = Table;

export default class ContentAdmin extends Component {
    state = {
        data:false,
        pageSize:8,
        search:'',
        total:'',
    }
    componentDidMount(){
        this.UnloadReq = true
        //获取列表
        this.getTable()
    }
    componentWillUnmount(){
        this.UnloadReq = false
    }
    findata = (id)=>{
        //id查询相应数据
        const {data} = this.state
        return data.find((itme)=>{
            return itme._id === id
        })
    }
    getTable  = async (page)=>{
        //翻页
        const {pageSize,search} = this.state
        const type = this.props.type
        let redult
        if(search){
            redult = await ReqnoteSearch({type,page,num:pageSize,search});//搜索
        }else{
            redult = await Getcontentlist({type,page,num:pageSize});//默认获取
        }
        const {code,data,msg} = redult
        if(code === 0 && redult){
            this.UnloadReq &&　this.setState({data:data.list,total:data.tol})
            return
        }
        message.success(msg,3)
    }
    changeSearch = (ev)=>{
        //搜索框状态
        const {value} = ev.target;
        this.setState({search:value})
    }
    confirmSearch = async()=>{
        //搜索
        const {pageSize,search} = this.state
        const type = this.props.type
        const redult = await ReqnoteSearch({type,num:pageSize,search});
        const {code,data,msg} = redult
        if(code === 0 ){
            this.setState({data:data.list,total:data.tol})
            return
        }
        message.success(msg,3)
    }
    handContentDel = (id)=>{
        //删除
        Modal.confirm({
            content:'是否确认删除！',
            okText:'确认',
            cancelText:'取消',
            onOk: async ()=>{
                const result = await Utils.checktoken()
                if(result){
                    Pubsub.publish('token',result)
                }else{
                    Pubsub.publish('token',result)
                    return
                }
                const {code,msg} = await Reqnotedelete(id);
                if(code === 0){
                    message.success(msg,3)
                    this.getTable()
                    return
                }
                message.success(msg,3)
            }
        })
    }
    render() {
        const {type} = this.props
        return (
            <>
                <div className='content-head'>
                    <div className="content-search">
                        <Input value={this.state.search} onChange={ev => {this.changeSearch(ev)}} prefix={<SearchOutlined />} placeholder='请输入关键字' />
                        <Button onClick={this.confirmSearch}>搜索</Button>
                    </div>
                    <AdminItemAdd getTable={this.getTable} type={type}/> 
                </div>
                <div className="content-body">
                    {this.state.data ?
                    <Table
                        dataSource={this.state.data} 
                        rowKey='_id'        //必须要有的
                        pagination={{
                            style:{paddingRight:'20px'},
                            pageSize:this.state.pageSize,
                            showQuickJumper:true,
                            total:this.state.total,
                            onChange:this.getTable
                        }}
                    >
                        <Column title="标题" dataIndex="title" key="title" />
                        <Column title="封面" dataIndex="title_img" key='title_img' render={itme => <img key={itme+1} alt='title' width={50} src={itme} />} />
                        <Column title="日期" dataIndex="create_time" key="create_time" render={time => <span key={time+1}>{Utils.setnewtime(new Date(time))}</span>} />
                        <Column title="操作" dataIndex="_id" key="_id" render={itme =>(
                                <Space size="middle" key={itme+1}>
                                    <AdminItemAdd getTable={this.getTable}  data={this.findata(itme)} id={itme}/>
                                    <Button onClick={()=>this.handContentDel(itme)}>删除</Button>
                                </Space>
                            )}/>
                    </Table>:
                    <LoadingSpin/>
                    }
                </div>
            </>
        )
    }
}

