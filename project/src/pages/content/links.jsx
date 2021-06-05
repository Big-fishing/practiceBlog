import React, { Component } from 'react'
import {Empty} from 'antd'
import LoadingSpin from '../../components/LoadingSpin'
import {ReqLinkshomeget} from "../../api";
import Comments from '../../components/comments'

export default class Links extends Component {
    state ={
        data:'',
    }
    Linksbol = true;
    componentDidMount(){
        this.getlist()
    }
    componentWillUnmount(){
        this.Linksbol = false
    }
    getlist = async()=>{
        const result = await ReqLinkshomeget()
        const {code,data} = result
        if(code === 1 && result){
            this.Linksbol && this.setState({data:data})
            return
        }
    }
    render() {
        const {data} = this.state
        return (
            <div id='home-center-content'>
                <div id="home-center-links" className='clear'>
                    {   data.length ?
                        data.map(itme => {
                            return(
                            <div key={itme._id} className="linksItme fl">
                                <a href={itme.links_src} target="_blank" rel="noopener noreferrer">
                                    <img src={itme.links_img} alt={itme.title} />
                                    <p>{itme.title}</p>
                                </a>
                            </div>
                            )
                        } ) 
                        : typeof data === 'string' ? 
                        <LoadingSpin />
                        :
                        <Empty style={{backgroundColor:'#fff'}} description='暂无数据'/>
                    }
                    <div className="linkstext fl">
                        <p>本站信息：</p>
                        <p>名称：渔夫yufu</p>
                        <p>简介：热爱生活，做个好人，记录自己的人生</p>
                        <p>链接：<a href="http://yuxuemei.top" target="_blank" rel="noopener noreferrer">http://yuxuemei.top</a></p>
                        <p>头像：<a href="http://yuxuemei.top/imgs/LOGO.JPG" target="_blank" rel="noopener noreferrer">http://yuxuemei.top/imgs/LOGO.JPG</a></p>
                    </div>
                </div>
                <Comments id='home-links'/>
            </div>
        )
    }
}
