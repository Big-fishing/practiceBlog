import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Loadable from './loadable';

import './index.less'

const HomeHeader =  Loadable(()=>import('../components/homeHeader'))
const Content  =  Loadable(()=>import('./content/Content'))
const HomeFooter =  Loadable(()=>import('../components/homeFooter'))

export default class Index extends Component {
    render() {
        return (
            <>
            <div id='home-body' className='center'>
                <HomeHeader/>
                <div id="home-content" className='clear'>
                    <Switch>
                        <Route exact path='/home' component={Content}/>
                        <Route exact path='/dynamic' component={Content}/>
                        <Route exact path='/about' component={Content}/>
                        <Route exact path='/links' component={Content}/>
                        <Route exact path='/study' component={Content}/>
                        <Route exact path='/study/hmtl_css' component={Content}/>
                        <Route exact path='/study/javascript' component={Content}/>
                        <Route exact path='/study/nodeJs' component={Content}/>
                        <Route exact path='/study/react' component={Content}/>
                        <Route exact path='/life' component={Content}/>
                        <Redirect to='/home' />
                    </Switch>
                </div>
            </div>
            <HomeFooter/>
            </>
        )
    }
}
