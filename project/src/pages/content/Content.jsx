import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Loadable from '../loadable'

import './content.less'

//components
const HomeLeft = Loadable(()=>import('../../components/homeLeft'))
const HomeRihgt = Loadable(()=>import('../../components/HomeRihgt'))
const HomeCenterHead = Loadable(()=>import('../../components/homeCenterHead'))
// Switch
const Home = Loadable(()=>import('./home'))
const Hmtl_css = Loadable(()=>import('./Hmtl_css'))
const Javascript = Loadable(()=>import('./javascript'))
const NodeJs = Loadable(()=>import('./nodeJs'))
const Reactjs = Loadable(()=>import('./reactjs'))
const Dynamic = Loadable(()=>import('./dynamic'))
const Life = Loadable(()=>import('./life'))
const Links = Loadable(()=>import('./links'))
const About = Loadable(()=>import('./about'))

export default class Content extends Component {
    render() {
        // conso
        return (
            <>
                <HomeLeft/>
                <div id="home-center" className='fl'>
                    <HomeCenterHead/>
                    <Switch>
                        <Route exact path='/home' component={Home}/>
                        <Route exact path='/dynamic' component={Dynamic}/>
                        <Route exact path='/about' component={About}/>
                        <Route exact path='/links' component={Links}/>
                        <Route exact path='/study/hmtl_css' component={Hmtl_css}/>
                        <Route exact path='/study/javascript' component={Javascript}/>
                        <Route exact path='/study/nodeJs' component={NodeJs}/>
                        <Route exact path='/study/react' component={Reactjs}/>
                        <Route exact path='/life' component={Life}/>
                        <Redirect exact from='/study' to='/study/hmtl_css' />
                    </Switch>
                </div>
                <HomeRihgt/>
            </>
        )
    }
}
