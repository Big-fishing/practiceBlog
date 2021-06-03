import React, { Component } from 'react'

export default class NotFound extends Component {
    componentDidMount(){
        this.time = setTimeout(() => {
            console.log(666)
            this.props.history.replace('/home') 
        }, 4000);
    }
    render() {
        return (
            <div style={{width:'100%',height:'100vh',backgroundColor:'#666',fontSize:'40px',textAlign:'center'}}>
                404,
                没有查到该页面
            </div>
        )
    }
}
