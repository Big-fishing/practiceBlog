import React, { Component } from 'react'
import { Anchor,Drawer, Button,message } from 'antd';
import { RightOutlined,LeftOutlined,ArrowLeftOutlined,HeartOutlined } from '@ant-design/icons';
import hljs from 'highlight.js';
import  { Reqnotegetitme,Reqnotegoodadd } from '../../api'
import Utils from '../../utlis/Utils'
import qs from 'querystring'
import Comments from '../../components/comments'
import LoadingSpin from '../../components/LoadingSpin'
import HomeFooter from '../../components/homeFooter'


import 'highlight.js/styles/vs2015.css';
import './Detailspage.less'

const { Link } = Anchor;
export default class Detailspage extends Component {
    state = {
        _id:'',
        title:'',
        title_img:'',
        content:'',
        content_title:'',
        noteClass:'',
        create_time:'',
        good:0,
        visits:0,
        visible:true,
        goodbol:false
    }
    Detailspagebol = true
    componentDidMount(){
        const search = this.props.location.search
        if(search.length){
            this.detailspageInit()
        }else{
            message.error('没有文章')
            this.props.history.replace('/home',3)
        }
        this.visibleinit()
        window.onresize = ()=>{
            this.visibleinit()
        }
    }
    componentDidUpdate(){
        this.highlightCallBack()
    }
    highlightCallBack = () => {
        document.querySelectorAll("pre code").forEach(block => {
            try{hljs.highlightBlock(block);}
            catch(e){console.log(e);}
        });
    };
    visibleinit = ()=>{
        if(this.Detailspagebol){
            window.innerWidth < 1750 && this.setState({visible:false})
        }
    }
    componentWillUnmount(){
        this.Detailspagebol = false
    }
    showDrawer = () => {
        this.setState({visible:true})
      };
    
    onClose = () => {
        this.setState({visible:false})
      };
    detailspageInit = async ()=>{
        const search = this.props.location.search
        const {_id} = qs.decode(search.slice(1))
        const result = await Reqnotegetitme({_id});
        const {code,data} = result
        if(code === 1){
            const {title,title_img,content,content_title,noteClass,create_time,good,visits} = data
            this.Detailspagebol && this.setState({title,title_img,content,content_title,noteClass,create_time,good,visits,_id})
        }
    }
    huadrouterpush = () =>{
        this.props.history.go(-1)
    }
    handleClick = (e, link) => {
        e.preventDefault();
    };
    anchorinit = data=>{
        let result = data
        if(typeof result === 'string' && result){
            result = JSON.parse(result)
        }
        return result.map(itme =>{
            if(itme.children){
                return (
                    <Link key={itme.id} title={itme.name} href={`#${itme.id}`}>
                        {this.anchorinit(itme.children)}
                    </Link>
                )
            }else{
                return <Link key={itme.id} title={itme.name} href={`#${itme.id}`} />
            }
        })
    }
    handgoodadd = async()=>{
        const search = this.props.location.search
        const {goodbol} = this.state
        const {_id} = qs.decode(search.slice(1))
        if(goodbol) return
        const result = await Reqnotegoodadd(_id);
        const {code,good,msg} = result
        if(code === 1){
            this.Detailspagebol && this.setState({goodbol:true,good})
            return
        }
        message.error(msg,3)
    }
    render() {
        const {title,title_img,content,content_title,noteClass,create_time,good,visits,visible} = this.state;
        return (
            <>
            {
                content.length ? 
                    <div id='Detailspage' className='center'>
                        <div id="noteimg" className='por'>
                            {/* 封面 */}
                            <img src={title_img} alt="title" />
                            <Button id='routerpush' onClick={this.huadrouterpush}><ArrowLeftOutlined /></Button>
                        </div>
                        <div id="detailspage-body">
                            {/* 内容 */}
                            <div id="detailspage-conent">
                                <div className="detailspage-head">
                                    <h2>{title}</h2>
                                    <span>{Utils.setnewtime(new Date(create_time))}</span>
                                    <span>访问量：{visits}</span>
                                    <span>分类：{noteClass}</span>
                                </div>
                                <div className='detailspage-value' dangerouslySetInnerHTML={{__html:content}}></div>
                                <div className="detailspage-fooer" onClick={this.handgoodadd}>
                                    <HeartOutlined />赞一个
                                    <span>
                                        {good}
                                    </span>
                                </div>
                            </div>
                            {/* 评论 */}
                            { content.length ? <Comments id={this.state._id}/> : '' }
                        </div>

                        {/* 目录 */}
                        {
                            !visible && <Button id='cataloguebol' onClick={this.showDrawer}>
                                <LeftOutlined />
                            </Button>
                        }
                            <Drawer
                                title="目录"
                                className='detailspage-right'
                                placement="right"
                                closeIcon={<RightOutlined />}
                                mask={false}
                                closable={true}
                                onClose={this.onClose}
                                visible={visible}
                            >
                                <Anchor affix={false} onClick={this.handleClick}>
                                    {content_title && this.anchorinit(content_title)}
                                    <Link title='评论' href={`#commentall`} />
                                </Anchor>
                            </Drawer>
                    </div>
                    :
                    <LoadingSpin/>
                }
                <HomeFooter/>
            </>
        )
    }
}
