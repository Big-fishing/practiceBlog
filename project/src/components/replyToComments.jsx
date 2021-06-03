import React, { Component } from 'react'
import Commentallform from './commentallform'

export default class ReplyToComments extends Component {
    state = {
        bol:false
    }
    replyToComments = ()=>{
        const {bol} = this.state
        this.setState({bol:!bol})
    }
    render() {
        const {bol} = this.state
        // console.log(this.props.email)
        return (
            <>
                <span onClick={this.replyToComments} key="comment-basic-reply-to">{bol ? '取消回复' :'回复'}</span>
                {bol &&　<Commentallform nodeemail={this.props.email} replytext={this.props.replytext || ''} replyToComments={this.replyToComments} userid={this.props.userid} commentsinitlist={this.props.commentsinitlist}/>}
            </>
        )
    }
}
