import React, { Component } from 'react'
import { Form,Input,Empty,Pagination,Button } from 'antd'
import {SearchOutlined,HomeOutlined,LeftOutlined} from '@ant-design/icons'
import qs from 'querystring'
import {ReqnoteSearch} from '../../api'
import moment from 'moment'
import 'moment/locale/zh-cn'
import HomeFooter from '../../components/homeFooter'

import './search.less'

export default class Search extends Component {
    state = {
        search:'',
        list:'',
        tol:0,
        pageSize:10,
    }
    Searchbol = true
    componentDidMount(){
        this.Searchlistinit()
    }
    componentWillUnmount(){
        this.Searchbol = false
    }
    huandChange = (ev)=>{
        const {value} = ev.target
        this.setState({search:value})
    }
    Submit = async (ev)=>{
        const {search} = this.state
        if(ev.keyCode === 13){
            if(search.length === 0){
                await this.props.history.push(`/search`)
                await this.setState({list:'',tol:0})
                return
            }
            await this.props.history.push(`/search?_id=${search}`)
            await this.Searchlistinit()
        }
    }
    Searchlistinit = async(page)=>{
        console.log('123456')
        const {pageSize} = this.state
        const search = this.props.location.search
        console.log(search)
        if(search.length <= 2){
            this.setState({list:''})
            return
        }
        const {_id} = qs.decode(search.slice(1));
        const result = await ReqnoteSearch({page,num:pageSize,search:_id})
        const {code,data} = result
        if(code === 0){
            this.setState({search:_id,list:data.list,tol:data.tol})
        }else if(code === 1){
            this.setState({list:[]})
        }
    }
    huadrouterpush = (bol) =>{
        if(bol){
            this.props.history.push('/')
        }else{
            this.props.history.go(-1)
            this.Searchbol && this.Searchlistinit()
        }
    }
    render() {
        const {list,pageSize,tol} = this.state
        return (
            <>
            <div id='search' className='center'>
                <div id="search-head" className='por'>
                        <Button onClick={()=>{this.huadrouterpush(false)}} id='search-back' ><LeftOutlined /></Button>
                        <Button onClick={()=>{this.huadrouterpush(true)}} id='search-home' ><HomeOutlined /></Button>
                        <h2>??????????????????</h2>
                        <Form>
                            <Form.Item>
                                <Input onKeyDown={this.Submit} value={this.state.search} onChange={this.huandChange} prefix={<SearchOutlined />} placeholder='??????????????????' />
                            </Form.Item>
                        </Form>
                </div>
                <div id='search-center'>
                    <div id="search-text">???????????? "{tol}" ?????????</div>
                    {  list.length ?
                        list.map(itme => {
                            return(
                                <div key={itme._id} className='searchitme'>
                                    <a href={`/detailspage?_id=${itme._id}`} target="_blank" rel="noopener noreferrer">
                                        <div className="searchitme-top">
                                            <p>{itme.title}</p>
                                            <img src={itme.title_img} alt={itme.title} />
                                        </div>
                                        <div className="searchitme-information">
                                                <span>{moment(itme.create_time).fromNow()}</span>
                                                <span>????????????{itme.visits}</span>
                                                <span>?????????{itme.noteClass}</span>
                                        </div>
                                    </a>
                                </div>
                            )
                        }) 
                        : typeof list === 'string' ? 
                        <Empty style={{backgroundColor:'#fff'}} description='??????????????????'/>
                        :
                        <Empty style={{backgroundColor:'#fff'}} description='????????????'/>
                    }
                    { list.length ? <Pagination onChange={this.Searchlistinit} defaultCurrent={pageSize} total={tol} /> : ''}
                </div>
            </div>
            <HomeFooter/>
            </>
        )
    }
}
