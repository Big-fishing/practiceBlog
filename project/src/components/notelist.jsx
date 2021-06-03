import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {message,Pagination,Empty } from 'antd'
import LoadingSpin from './LoadingSpin'
import  { Getcontentlist } from '../api'
import moment from 'moment'
import 'moment/locale/zh-cn'

class Notelist extends Component {
    state ={
        data:'',
        pageSize:15,
        total:'',
    }
    notelistbol = true;
    componentDidMount(){
        this.getlist()
    }
    componentWillUnmount(){
        this.notelistbol = false
    }
    getlist = async(page)=>{
        const {pageSize} = this.state
        const {type} = this.props
        let result = null
        if(type === 'all'){
            result = await Getcontentlist({page,num:pageSize})
        }else{
            result = await Getcontentlist({type,page,num:pageSize})
        }
        const {code,data,msg} = result
        if(code === 0 && result){
            this.notelistbol && this.setState({data:data.list,total:data.tol})
            return
        }
        message.success(msg,3)
    }
    detailspagepush = (text)=>{
        this.props.history.push(`/detailspage?_id=${text}`)
    }
    render() {
        const {pageSize,total,data} = this.state
        return (
            <div id='home-center-content'>
                {  data.length ?
                    data.map(itme => {
                        return(
                            <div key={itme._id} onClick={()=>this.detailspagepush(itme._id)} className="contentimte fadIn">
                                    <div className="contentimte-title por" >
                                        <p className='poa'>{itme.title}</p>
                                        <img src={itme.title_img} alt={itme.title} />
                                    </div>
                                    <div className="contentimte-information">
                                            <span>{moment(itme.create_time).fromNow()}</span>
                                            <span>访问量：{itme.visits}</span>
                                            <span>分类：{itme.noteClass}</span>
                                    </div>
                            </div>
                        )
                    }) 
                    : typeof data === 'string' ? 
                    <LoadingSpin />
                    :
                    <Empty style={{backgroundColor:'#fff'}} description='暂无数据'/>
                }
                { data.length ? <Pagination onChange={this.getlist} defaultCurrent={pageSize} total={total} /> :''}
            </div>
        )
    }
}

export default withRouter(Notelist)
