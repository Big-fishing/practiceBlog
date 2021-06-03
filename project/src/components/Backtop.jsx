import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {UpOutlined,HomeOutlined} from '@ant-design/icons'

 
class Backtop extends Component {
    state = {
        bol:false
    }
    componentDidMount(){
        window.onscroll = () =>{this.scrollFunction()};
    }
    scrollFunction =() =>{
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            this.setState({bol:true})
        } else {
            this.setState({bol:false})
        }
    }
    topFunction = ()=> {
        this.time = setInterval(()=>{
            if(document.body.scrollTop || document.documentElement.scrollTop){
                document.body.scrollTop &&　(document.body.scrollTop = document.body.scrollTop - 40)
                document.documentElement.scrollTop &&　(document.documentElement.scrollTop = document.documentElement.scrollTop - 40)
            }else{
                clearInterval(this.time)
            }
        },1)
    }
    pushhome = ()=>{
        this.props.history.push('/')
    }
    render() {
        const {bol} = this.state
        return (
            bol &&
                <div id='Backtop'>
                    <ul>
                        <li onClick={this.pushhome}><HomeOutlined /></li>
                        <li onClick={this.topFunction}><UpOutlined /></li>
                    </ul>
                </div>
        )
    }
}

export default withRouter(Backtop)