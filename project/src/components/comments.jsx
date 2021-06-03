import React, { Component } from 'react'
import {message,Pagination,Empty,Avatar,Comment,Button } from 'antd'
import moment from 'moment'
import {ReqGetcommentslist} from '../api'
import Commentallform from './commentallform'
import ReplyToComments from './replyToComments'
import LoadingSpin from '../components/LoadingSpin'
import 'moment/locale/zh-cn'



export default class Comments extends Component {
    state = {
        data:'',
        pageSize:20,
        pagenum:1,
        total:0
    }
    commentlistbol = true
    componentDidMount(){
        this.commentsinitlist()
    }
    componentWillUnmount(){
        this.commentlistbol = false
    }
    commentsinitlist = async(page)=>{
        const {pageSize,pagenum} = this.state
        const {id} = this.props;
        if(page){
            this.setState({pagenum:page})
        }
        const result = await ReqGetcommentslist({id:id,page:page||pagenum,num:pageSize})
        const {code,data,msg} = result
        if(code === 1 && result){
            // console.log(data)
            this.commentlistbol && this.setState({data:data.list,total:data.tol})
            return
        }
        message.success(msg,3)
    }
    commentinit = (data)=>{
        return data.map(itme => {
            if(itme.children && itme.children.length){
                return(
                    <Comment
                        id={itme._id}
                        key={ itme._id } 
                        actions={[<ReplyToComments email={itme.eMail} userid={itme._id} commentsinitlist={this.commentsinitlist} />]}
                        author={<a className={itme.admin ? 'adminComment' : ''} href={itme.src} target="_blank" rel="noopener noreferrer">{itme.name}</a>}
                        avatar={
                            <Avatar src={itme.admin && "/imgs/LOGO.JPG"}
                            style={{ backgroundColor: itme.color, verticalAlign: 'middle' }} size="large">
                                {itme.name}
                            </Avatar>
                        }
                        content={itme.content}
                        datetime={
                                <span>{moment(itme.create_time).fromNow()}</span>
                        }>
                            {this.commentinit(itme.children)}
                    </Comment>
                )
            }else{
                return(
                    <Comment
                        id={itme._id || itme.replyid}
                        key={itme._id || itme.replyid} 
                        actions={[<ReplyToComments email={itme.eMail} replytext={itme.replyid ? {src:itme.replyid,name:itme.name}:''} userid={itme.userid || itme._id} commentsinitlist={this.commentsinitlist} />]}
                        author={
                            <span>
                                <a className={itme.admin ? 'adminComment' : ''} href={itme.src} target="_blank" rel="noopener noreferrer">{itme.name}</a>
                                {itme.replytext ? '回复' : ''}
                                {itme.replytext ? <a className={itme.admin ? 'adminComment' : ''} href={`#${itme.replytext.src}`}> {itme.replytext.name} </a> : '' }
                            </span>
                            }
                        avatar={
                            <Avatar src={itme.admin && "/imgs/LOGO.JPG"}
                            style={{ backgroundColor: itme.color, verticalAlign: 'middle' }} size="large">
                                {itme.name}
                            </Avatar>
                        }
                        content={itme.content}
                        datetime={
                                <span>{moment(itme.create_time).fromNow()}</span>
                    }/>
                )
            }
        })
    }
    refresh = ()=>{
        this.commentsinitlist()
    }
    render() {
        const {data,pageSize,total} = this.state
        return (
            <div id='commentall'>
                <h2>评论</h2>
                <Commentallform id={this.props.id} commentsinitlist={this.commentsinitlist}/>
                <Button onClick={this.refresh}>刷新评论列表</Button>
                {  data.length ?
                    this.commentinit(data)
                : typeof data === 'string' ? 
                    <LoadingSpin />
                :
                    <Empty style={{backgroundColor:'#fff'}} description='暂无评论'/>
                }
                { data.length ? <Pagination onChange={this.commentsinitlist} defaultCurrent={pageSize} total={total} /> : ''}
            </div>
        )
    }
}
