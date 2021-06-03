import React, { Component } from 'react'
import {Button} from 'antd'
import E from 'wangeditor'
import MonacoEditor from 'react-monaco-editor';

let editor = null;

export default class Texteditor extends Component {
    state ={
        code: '',
        monacobol:false,
    }
    componentDidMount(){
        editor = new E("#admin-addconent");
        editor.config.onchange = (newHtml) => {
            this.props.handnewhtml(newHtml)
        }
        editor.config.uploadImgShowBase64 = true
        editor.create()
        editor.txt.html(this.props.newHtml)

    }
    componentWillUnmount(){
        editor.destroy()
    }
    editorDidMount= (editors, monaco)=> {
        editors.focus();
    }
    onChange = (Value, e)=> {
        this.setState({code:Value})
    }
    handEditorbol = ()=>{
        const {monacobol,code} = this.state;
        if(monacobol){
            this.setState({monacobol:!monacobol});
            editor.txt.html(code)
            this.props.handnewhtml(code)
        }else{
            this.setState({code:this.props.newHtml,monacobol:!monacobol})
        }
    }
    render() {
        const {code,monacobol} = this.state;
        const options = {
            selectOnLineNumbers: true
        };
        return (
            <>  
                <Button onClick={this.handEditorbol} type='primary'>{monacobol ? '完成编辑' :'编辑代码'}</Button>
                <div id='admin-addconent' style={{display:monacobol ? 'none' :'block'}}></div>
                {
                    monacobol &&
                    <MonacoEditor
                    height="400px"
                    language="html"
                    theme="Visual Studio"
                    value={code}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                    />
                }
            </>
        )
    }
}
