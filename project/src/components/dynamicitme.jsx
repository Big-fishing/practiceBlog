import React, { Component } from 'react'
import {Image,message} from 'antd'
import {CommentOutlined,EyeOutlined,LikeOutlined} from '@ant-design/icons'
import {ReqDynamGoodAdd,ReqDynamvisitsAdd} from '../api'
import Utils from '../utlis/Utils'
import Comments from './comments'

export default class Dynamicitme extends Component {
    componentDidMount(){

    }
    state = {
        goodnum:this.props.good,
        goodbol:'',
        visits:this.props.visits,
        visitsbol:true,
        commentsbol:false,
    }
    handgoodadd = async()=>{
        const {goodbol,goodnum} = this.state
        const {_id} = this.props
        if(goodbol) return
        const result = await ReqDynamGoodAdd(_id);
        const {code,msg} = result;
        if(code === 1){
            this.setState({goodbol:true,goodnum:goodnum+1})
            return
        }
        message.error(msg,3)
    }
    huadComments = async()=>{
        const {commentsbol,visitsbol,visits} = this.state;
        if(visitsbol){
            const {_id} = this.props
            const result = await ReqDynamvisitsAdd(_id);
            const {code,msg} = result;
            if(code === 1){
                this.setState({
                    commentsbol:!commentsbol,
                    visitsbol:false,
                    visits:visits+1
                })
                return
            }
            message.error(msg,3)
        }
        this.setState({commentsbol:!commentsbol})
    }
    render() {
        const {create_time,content,imgs,_id} = this.props
        const {goodnum,goodbol,commentsbol,visits} = this.state
        return (
            <>
                <div className="contentimte dynamic fadIn">
                        <div className="dynamictitile">
                            <img src="/imgs/LOGO.JPG" alt="logo" />
                            <div>
                                <p>渔夫yufu</p>
                                <span>{Utils.setnewtime(new Date(create_time))}</span>
                            </div>
                        </div>
                        <div dangerouslySetInnerHTML={{__html:content}}></div>
                        <div className="dynamicimg clear">
                        {
                            imgs.length ? imgs.map( citme => {
                                return <Image key={citme} src={citme} alt='动态图片' />
                            } ):''
                        }
                        </div>
                        <div className="dynamfoor">
                            <i><EyeOutlined />{visits}</i>
                            <i onClick={this.huadComments}><CommentOutlined /></i>
                            <i className={goodbol && 'goodadd'} onClick={this.handgoodadd} ><LikeOutlined />{goodnum}</i>
                        </div>
                </div>
                {commentsbol && <Comments id={_id}/>}
            </>
        )
    }
}
