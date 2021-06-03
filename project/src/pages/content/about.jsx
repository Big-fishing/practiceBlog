import React, { Component } from 'react'
import { message,Empty } from 'antd';
import LoadingSpin from "../../components/LoadingSpin";
import {EyeOutlined,LikeOutlined} from '@ant-design/icons'
import { ReqAboutget,ReqAboutGoodAdd } from '../../api'
import Comments from '../../components/comments'

export default class About extends Component {
    state = {
        content:false,
        good:0,
        visits:0,
        goodbol:false,
    }
    Aboutbol = true
    componentDidMount(){
        this.Aboutinit()
    }
    componentWillUnmount(){
        this.Aboutbol = false
    }
    Aboutinit = async()=>{
        const aboutresult = await ReqAboutget({bol:true});
        const {code,msg,result} = aboutresult
        if(code === 1){
            const {good,visits,content} = result
            this.Aboutbol && this.setState({good,visits,content})
        }else if(code === 2 ){
            this.Aboutbol && this.setState({content:''})
            message.error(msg,3)
        }
    }
    handgoodadd = async()=>{
        const {goodbol,good} = this.state
        if(goodbol) return
        const result = await ReqAboutGoodAdd();
        const {code,msg} = result;
        if(code === 1){
            this.setState({goodbol:true,good:good+1})
            return
        }
        message.error(msg,3)
    }
    render() {
        const {content,visits,good,goodbol} = this.state
        return (
            <>
                <div id='home-About'>
                    {content ? 
                    <>
                        <div dangerouslySetInnerHTML={{__html:content}}></div>
                        <div id='About-visitsgood'>
                            <i><EyeOutlined />{visits}</i>
                            <i className={goodbol ? 'goodadd' : ''} onClick={this.handgoodadd} ><LikeOutlined />{good}</i>
                        </div>
                    </>
                    :  typeof content === "string" ?
                    <Empty style={{backgroundColor:'#fff'}} description='暂无数据'/>
                    :
                    <LoadingSpin/>
                    }
                </div>
                <Comments id='home-About'/>
            </>
        )
    }
}
