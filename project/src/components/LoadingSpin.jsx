import React, { Component } from 'react'
import {Spin} from 'antd'


export default class LoadingSpin extends Component {
    render() {
        return (
            <div style={{widht:'100%',height:'100%',lineHeight: '150px',textAlign:'center',backgroundColor:'#fff'}}>
                <Spin/>
            </div>
        )
    }
}
