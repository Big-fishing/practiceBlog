import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Loadable from './pages/loadable';


const Index = Loadable( ()=>import('./pages') )
const Admin = Loadable( ()=>import('./pages/admin/admin') )
const Login = Loadable( ()=>import('./pages/login/login') )
const Register = Loadable( ()=>import('./pages/register/Register') )
const Detailspage = Loadable( ()=>import('./pages/Detailspage/Detailspage') )
const Search = Loadable( ()=>import('./pages/search/search') )
const NotFound = Loadable( ()=>import('./pages/NotFound') )
const Backtop = Loadable( ()=>import('./components/Backtop') )
const Music = Loadable( ()=>import('./components/Music/Music') )

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {/* 前台管理路由 */}
                    <Route exact path='/' component={Index} />
                    <Route exact path='/home' component={Index}/>
                    <Route exact path='/dynamic' component={Index}/>
                    <Route exact path='/about' component={Index}/>
                    <Route exact path='/links' component={Index}/>
                    <Route exact path='/study' component={Index}/>
                    <Route exact path='/study/hmtl_css' component={Index}/>
                    <Route exact path='/study/javascript' component={Index}/>
                    <Route exact path='/study/nodeJs' component={Index}/>
                    <Route exact path='/study/react' component={Index}/>
                    <Route exact path='/life' component={Index}/>
                    <Route exact path='/detailspage' component={Detailspage}/>
                    <Route exact path='/search' component={Search}/>
                    {/* 后台管理路由 */}
                    <Route exact path='/admin' component={Admin} />
                    <Route exact path='/admin/home' component={Admin}/>
                    <Route exact path='/admin/study/hmtl_css' component={Admin}/>
                    <Route exact path='/admin/study/javascript' component={Admin}/>
                    <Route exact path='/admin/study/nodeJs' component={Admin}/>
                    <Route exact path='/admin/study/react' component={Admin}/>
                    <Route exact path='/admin/dynamic' component={Admin}/>
                    <Route exact path='/admin/life' component={Admin}/>
                    <Route exact path='/admin/links' component={Admin}/>
                    <Route exact path='/admin/about' component={Admin}/>
                    <Route exact path='/admin/password' component={Admin}/>
                    {/* 登陆注册路由 */}
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    {/* 404 */}
                    <Route component={NotFound} />
                </Switch>
                <Backtop/>
                <Music/>
            </BrowserRouter>
        )
    }
}
