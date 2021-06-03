import React, { Component } from 'react'
import { NavLink , withRouter} from 'react-router-dom'
import NavigationConfig from '../config/NavigationConfig'
import {createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/font_2466039_w3xm2271zw.js'
    ]
  });

class HomeRihgt extends Component {
    initMenus = (menus)=>{
        return menus.map(itme=>{
            if(itme.children){
                return(
                    <li key={itme.key}>
                        <a href={itme.key}>
                            <IconFont type={itme.icon} />
                            {itme.title}
                        </a>
                        <ul>
                        {this.initMenus(itme.children)}
                        </ul>
                    </li>
                )
            }else{
                return(
                    <li key={itme.key}>
                        <NavLink to={itme.key}>
                            <IconFont type={itme.icon} />
                            {itme.title}
                        </NavLink>
                    </li>
                )
            }
        })
    }
    render() {
        return (
            <div id="home-right" className='fl fadIn'>
                <div className="Navigation">
                    <ul>
                        {this.initMenus(NavigationConfig)}
                    </ul>
                </div>
            </div>
        )
    }
}
export default withRouter(HomeRihgt)