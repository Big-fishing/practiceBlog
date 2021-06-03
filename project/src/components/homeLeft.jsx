import React, { Component } from 'react'
import {createFromIconfontCN } from '@ant-design/icons';
import {Reqgetcontentnum} from '../api'

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/font_2466039_w3xm2271zw.js'
    ]
  });
export default class HomeLeft extends Component {
    state = {
        w:0,
        d:0,
        p:0
    }
    homeleft = true
    componentDidMount(){
        this.homeLfetinit()
    }
    componentWillUnmount(){
        this.homeleft=false
    }
    homeLfetinit = async()=>{
        const result = await Reqgetcontentnum()
        const {code,data} = result
        if(code ===1){
            const {w,d,p} = data
            this.homeleft &&　this.setState({w,d,p})
        }
    }
    render() {
        const {w,d,p} = this.state
        return (
            <div id="home-lfet" className='fl fadIn'>
                <div id="home-lfet-head">
                    <div className="avatar">
                        <a href="/home"><img src="/imgs/LOGO.JPG" alt="渔夫yufu" /></a>
                    </div>
                    <ul>
                        <li>
                            <p>{w}</p>
                            <span>文章</span>
                        </li>
                        <li>
                            <p>{d}</p>
                            <span>动态</span>
                        </li>
                        <li>
                            <p>{p}</p>
                            <span>评论</span>
                        </li>
                    </ul>
                </div>
                <div id="home-lfet-contact">
                    <ul>
                        <li><IconFont type={'icon-youxiang'} />964345264@qq.com</li>
                        <li><IconFont type={'icon-QQ'}/><a href="http://wpa.qq.com/msgrd?v=3&uin=964345264&site=qq&menu=yes" rel="noreferrer" target='_blank'>964345264</a></li>
                        <li><IconFont type={'icon-huaban88'}/><a href="https://github.com/Big-fishing" rel="noreferrer" target='_blank'>Big-fishing</a></li>
                        <li><IconFont type={'icon-bilibili'}/><a href="https://space.bilibili.com/281600045" rel="noreferrer" target='_blank'>念念羽</a></li>
                    </ul>
                </div>
                <div id='text-introduce'>
                    本网站服务端采用nodeJS koa框架搭建，前端采用React+antd，数据库使用mongodb，客户端渲染，源码存放在Github
                    <a href="https://github.com/Big-fishing/practiceBlog" rel="noreferrer" target='_blank'><img src="/imgs/github.jpg" alt="github" /></a>
                </div>
            </div>
        )
    }
}
