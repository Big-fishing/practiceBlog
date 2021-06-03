import React, { Component } from 'react'
import * as echarts from 'echarts' 
import {ReqCategoryall,ReqVisitsall} from '../../api' 

let myClassAall = null
let myVisits = null

export default class Home extends Component {
    state = {
        ClassAallsta:'',
        myVisitssta:''
    }
    homesta = true
    componentDidMount(){
        this.classAallinit()
        this.visitsinit()
    }
    componentWillUnmount(){
        this.homesta = false
    }
    classAallinit = async ()=>{
        const chartDom = document.getElementById('fenlei');
        myClassAall = echarts.init(chartDom);
        const {code,data} = await ReqCategoryall()
        if(code === 1){
            const ClassAallsta = {
                title: {
                    text: '各分类内容总数',
                    subtext: '饼图展示',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
            this.homesta && this.setState({ClassAallsta})
        }
    }
    visitsinit = async ()=>{
        const chartDom = document.getElementById('adminVisits');
        myVisits = echarts.init(chartDom);
        const {code,data} = await ReqVisitsall()
        if(code === 1){
            const xAxisdata = data.map(itme => itme.name)
            const seriesdata = data.map(itme => itme.value)
            const myVisitssta = {
                title:{
                    text:'各分类访问量'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xAxisdata,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        barWidth: '60%',
                        data:seriesdata
                    }
                ]
            }
            this.homesta && this.setState({myVisitssta})
        }
    }
    render(){
        const {ClassAallsta,myVisitssta} = this.state;
        ClassAallsta && myClassAall.setOption(ClassAallsta)
        myVisitssta && myVisits.setOption(myVisitssta)
        return (
            <div id='admin-home'>
                <div id="fenlei"></div>
                <div id="adminVisits"></div>
            </div>
        )
    }
}
