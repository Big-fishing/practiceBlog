import React, { Component } from 'react'
import {NavLink,withRouter} from 'react-router-dom'
import NavigationConfig from '../config/NavigationConfig'

class HomeCenterHead extends Component {
    titlelist = ''
    posttype = React.createRef()
    componentDidMount(){
        const {pathname} = this.props.location;
        if(pathname === '/home'){
            this.posttype.current.style.transform = `translateX(${35}px)`
        }else if(pathname === '/dynamic'){
            this.posttype.current.style.transform = `translateX(${135}px)`
        }
    }
    getitletext = (av)=>{
        //初始化导航
        const path = this.props.location.pathname;
        let title = '';
        NavigationConfig.forEach(itme =>{
            if(itme.key === path){
                title = itme.title
            }else if(itme.children){
                const result = itme.children.find(cItme => path.indexOf(cItme.key) === 0);
                if(result){
                    title = result.title
                }
            }
        })
        if(path !== '/home' && path !== '/dynamic'){
            setTimeout(()=>{
                this.posttype && (this.posttype.current.style.transform = `translateX(${135}px)`)
            },100)
            return <NavLink onClick={()=>this.handposttype(1)} to={path}>{title}</NavLink>
        }else{
            if(path === '/home'){
                setTimeout(()=>{
                    this.posttype.current.style.transform = `translateX(${35}px)`
                },100)
            }
            return av
        }
    }
    handposttype = (num)=>{
        if(num === 0){
            this.posttype.current.style.transform = `translateX(${35}px)`
        }else{
            if(this.titlelist){
                this.posttype.current.style.transform = `translateX(${35+100*num}px)`
            }else{
                this.posttype.current.style.transform = `translateX(${35+100*(num-1)}px)`
            }
        }
    }
    render() {
        this.titlelist = this.getitletext(this.titlelist);
        return (
            <div id='home-center-head' className="clear por fadIn">
                <NavLink onClick={()=>this.handposttype(0)} to='/home'>全部</NavLink>
                {this.titlelist}
                <NavLink onClick={()=>this.handposttype(2)} to='/dynamic'>动态</NavLink>
                <div ref={this.posttype} id="post-type-line" className='poa'></div>
            </div>
        )
    }
}


export default withRouter(HomeCenterHead)