import React, { Component } from 'react'
import {Button,message} from 'antd'
import E from 'wangeditor'
import MonacoEditor from 'react-monaco-editor';
import Utils from '../../utlis/Utils'
import Pubsub from 'pubsub-js'
import LoadingSpin from '../../components/LoadingSpin'
import {Reqaboutrevise,ReqAboutget} from '../../api'


let editor = null;

export default class About extends Component {   
    state ={
        id:'',
        newHtml: '',
        createsta:'',
        monacobol:false,
        loading:true
    }
    intercept = true
    componentDidMount(){
        this.aboutinit()
    }
    aboutinit = async()=>{
        await this.huadchecktoken();
        await this.huadgetabout();
        await this.editorinit()
    }
    editorinit = ()=>{
        if(this.intercept){
            this.setState({loading:false})
            editor = new E("#admin-addconent");
            editor.config.onchange = (newHtml) => {
                this.setState({newHtml:newHtml})
            }
            editor.config.uploadImgShowBase64 = true
            editor.config.height = 600
            editor.create()
            editor.txt.html(this.state.newHtml)
        }
    }
    huadgetabout = async ()=>{
        const result = await ReqAboutget();
        const {code,data,id,msg} = result;
        if(code === 1){
            this.intercept && this.setState({
                id,
                newHtml:data,
                createsta:true

            })
        }else{
            message.error(msg,3)
        }
    }
    huadchecktoken = async ()=>{
        const result = await Utils.checktoken()
        if(result){
            Pubsub.publish('token',result)
        }else{
            Pubsub.publish('token',result)
        }
    }
    handAbout = async ()=>{
        const {newHtml,id} = this.state
        const result = await Reqaboutrevise({id,content:newHtml});
        const {code,msg} = result
        if(code === 1){
            message.success(msg,3)
            this.huadgetabout();
        }else{
            message.error(msg,3)
        }
    
    }
    editorDidMount= (editors, monaco)=> {
        editors.focus();
    }
    componentWillUnmount(){
        this.intercept = false
        editor && editor.destroy()
    }
    onChange = (Value, e)=> {
        this.setState({newHtml:Value})
    }
    handEditorbol = ()=>{
        const {monacobol,newHtml} = this.state;
        if(monacobol){
            this.setState({newHtml,monacobol:!monacobol});
            editor.txt.html(newHtml)
        }else{
            this.setState({newHtml,monacobol:!monacobol})
        }
    }
    render() {
        const {newHtml,monacobol,createsta,loading} = this.state;
        const options = {
            selectOnLineNumbers: true,
            renderSideBySide: false
        };
        return (
            <div id='admin-About'>  
                <div style={{marginBottom:'10px'}}>
                    <Button onClick={this.handEditorbol} type='primary'>{monacobol ? '完成编辑' :'编辑代码'}</Button>
                    <Button style={{marginLeft:'40px'}} onClick={this.handAbout} type='primary'>{createsta ? '修改':'添加'}</Button>
                </div>
                <div id='admin-addconent' style={{display:monacobol ? 'none' :'block'}}></div>
                {loading && <LoadingSpin/>}
                {
                    monacobol &&
                    <MonacoEditor
                    style={{marginTop:'10px'}}
                    height="600px"
                    language="html"
                    theme="Visual Studio"
                    value={newHtml}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                    />
                }
            </div>
        )
    }
}
