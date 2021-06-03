import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import { Layout  } from 'antd';
import Pubsub from 'pubsub-js';
import Utils from '../../utlis/Utils';
import Loadable from '../loadable'
//components
import LeftNva from '../../components/left-nva';
import Header from '../../components/adminHeader';

//导入样式
import './admin.less';

//导入路由组件
const Home = Loadable(()=>import('./home'));
const HmtlCss = Loadable(()=>import('./hmtl_css'))
const Javascript = Loadable(()=>import('./javascript'))
const NodeJs = Loadable(()=>import('./nodeJs'))
const Reactjs = Loadable(()=>import('./reactjs'))
const Dynamic = Loadable(()=>import('./dynamic'))
const Life = Loadable(()=>import('./life'))
const Links = Loadable(()=>import('./links'))
const About = Loadable(()=>import('./about'))
const Password = Loadable(()=>import('./password'))

const {  Footer, Sider, Content} = Layout;

export default class Admin extends Component {
	state={
		tokentime:true,
	}
	adminbol = true
	componentDidMount(){
		const root = document.getElementById('root')
		root.style.padding = '0px'
		//检测是否已登录或的是否有效
		this.chackuser()
		this.try = Pubsub.subscribe('token',(_,tokentime)=>{
			this.adminbol && this.setState({tokentime})
		})
	}
	componentWillUnmount(){
		const root = document.getElementById('root')
		root.style = ''
		this.adminbol = false
		Pubsub.unsubscribe(this.try)
	}
	chackuser = async ()=>{
		const tokentime = await Utils.checktoken()
		this.adminbol && this.setState({tokentime})
	}
    render() {
		const newdate = Math.floor( new Date().getTime() / 1000 );
		const tokentime = this.state.tokentime;
		if(!tokentime || (typeof tokentime === "number" && (tokentime - newdate) < 0) ){ 
			//判断token有效时间
			// this.msgError()
			alert('登陆过期')
		 	return <Redirect to='/login'/>
		}
        return (
			<Layout id="admin">
				<Sider>
					<LeftNva/>
				</Sider>
				<Layout>
					<Header/>
					<Content>
						<Switch>
							<Redirect from='/admin/' exact to='/admin/home'/>
							<Route exact path='/admin/home' component={Home}/>
							<Route exact path='/admin/study/hmtl_css' component={HmtlCss}/>
							<Route exact path='/admin/study/javascript' component={Javascript}/>
							<Route exact path='/admin/study/nodeJs' component={NodeJs}/>
							<Route exact path='/admin/study/react' component={Reactjs}/>
							<Route exact path='/admin/dynamic' component={Dynamic}/>
							<Route exact path='/admin/life' component={Life}/>
							<Route exact path='/admin/links' component={Links}/>
							<Route exact path='/admin/about' component={About}/>
							<Route exact path='/admin/password' component={Password}/>
						</Switch>
					</Content>
					<Footer>Copyright © 2021 Created by Ant UED</Footer>
				</Layout>
			</Layout>
		)
    }   
}
