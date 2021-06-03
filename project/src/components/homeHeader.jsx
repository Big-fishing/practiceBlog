import React, { Component } from 'react'
import{ withRouter } from 'react-router-dom'
import {Button,Form,Input,Drawer} from 'antd'
import { SearchOutlined,MenuUnfoldOutlined,RightOutlined } from '@ant-design/icons'
import Utils from '../utlis/Utils'
import HomeRihgt from '../components/HomeRihgt'
import {Reqgetcontentnum} from '../api'


class HomeHeader extends Component {
    state = {
        time:'',
        Searchbol:false,
        visible:false,
        w:0,
        d:0,
        p:0
    }
    componentDidMount(){
        // mobileleft.addEventListener('touchmove',this.toucHmove,{passive:false})
        this.homeLfetinit()
        this.Time = setInterval(()=>{
            const time = Utils.setnewtime()
            this.setState({time})
        },1000)
    }
    componentWillUnmount(){
        clearInterval(this.Time)
    }
    homeLfetinit = async()=>{
        const result = await Reqgetcontentnum()
        const {code,data} = result
        if(code ===1){
            const {w,d,p} = data
            this.setState({w,d,p})
        }
    }
    showDrawer = () => {
        this.setState({visible:true})
    };
    onClose = () => {
        this.setState({visible:false})
    };
    huadSearch = ()=>{
        const {Searchbol} = this.state
        this.setState({Searchbol:!Searchbol})
    }
    huadSearchKeyUp = (ev)=>{
        const {Searchbol} = this.state
        if(Searchbol && ev.keyCode === 27){
            this.setState({Searchbol:!Searchbol})
        }
    }
    onFinish = (value)=>{
        const {search} = value;
        this.props.history.push(`/search?_id=${search}`)
    }
    render() {
        const {time,Searchbol,visible,w,d,p} = this.state
        return (
            <div id="home-head">
                <Button id='mobileleft-bol' onClick={this.showDrawer}><MenuUnfoldOutlined /></Button>
                <h1>渔夫yufu</h1>
                <p>{time}</p>
                <Button onClick={this.huadSearch} onKeyUp={this.huadSearchKeyUp}><SearchOutlined />搜索</Button>
                {
                //搜索
                Searchbol && <div id="homesearch">
                    <div id="unsearch" onClick={this.huadSearch}></div>
                    <div className='searchitme center poa'>
                    <Form onFinish={this.onFinish}>
                        <Form.Item
                        name="search"
                        rules={[
                            { required: true, message: '请输入关键词' },
                        ]}
                        >
                            <Input onKeyUp={this.huadSearchKeyUp} prefix={<SearchOutlined />}  placeholder='请输入关键词' />
                        </Form.Item>
                    </Form>
                    </div>
                </div>
                }

                
                <Drawer
                    title='渔夫YUFU'
                    id='mobileleft'
                    placement="left"
                    closeIcon={<RightOutlined />}
                    destroyOnClose={true}
                    mask={true}
                    closable={true}
                    onClose={this.onClose}
                    visible={visible}
                >
                    <div className="deletelfet"></div>
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
                    <HomeRihgt/>
                </Drawer>
            </div>
        )
    }
}

export default withRouter(HomeHeader)