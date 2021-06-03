import React, { Component } from 'react'
import {Table,Space,Button,Modal,message} from 'antd'
import Pubsub from 'pubsub-js'
import Dynamicadd from '../../components/dynamicAdd'
import {ReqDynamlist,ReqDynamdelete} from '../../api'
import Utils from '../../utlis/Utils'
import LoadingSpin from '../../components/LoadingSpin'

const {Column} = Table
export default class Dynamic extends Component {
    state = {
        data:false,
        total:'',
        pageSize:8,

    }
    intercept = true
    componentDidMount(){
        this.getTable()
    }
    componentWillUnmount(){
        this.intercept = false
    }
    findata = (id)=>{
        //id查询相应数据
        const {data} = this.state
        return data.find((itme)=>{
            return itme._id === id
        })
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
                const {code,msg} = await ReqDynamdelete(id);
                if(code === 0){
                    message.success(msg,3)
                    this.getTable()
                    return
                }
                message.success(msg,3)
            }
        })
    }
    getTable = async (page)=>{
        //翻页
        const {pageSize} = this.state
        const redult = await ReqDynamlist({page,num:pageSize});//默认获取
        const {code,data,msg} = redult
        if(code === 0 ){
            this.intercept && this.setState({data:data.list,total:data.tol})
            return
        }
        message.success(msg,3)
    }
    render() {
        return (
            <div id='admin-Dynamic'>
                <div className='content-head' style={{textAlign:'right'}}>
                    <Dynamicadd type={'dynamic'} getTable={this.getTable} />
                </div>
                <div className='content-body'>
                    {
                        this.state.data ? <Table
                        dataSource={this.state.data}
                        rowKey='_id' 
                        pagination={{
                            style:{paddingRight:'20px'},
                            pageSize:this.state.pageSize,
                            showQuickJumper:true,
                            total:this.state.total,
                            onChange:this.getTable
                        }}
                       >
                           <Column title="内容" dataIndex="title" key="title" render={itme=> (itme.substr(0,40)+'...')} />
                           <Column title="发布时间" dataIndex="create_time" key="create_time" render={time=> Utils.setnewtime(new Date(time))} />
                           <Column title='操作' dataIndex="_id" key="_id" render={id=>{
                               return(
                                   <Space size="middle">
                                       <Dynamicadd id={id} data={this.findata(id)} getTable={this.getTable} />
                                       <Button onClick={()=>this.handContentDel(id)}>删除</Button>
                                   </Space>
                               )
                           }}/>
                       </Table>:
                       <LoadingSpin/>
                    }
                </div>
            </div>
        )
    }
}
