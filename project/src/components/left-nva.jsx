import React, { Component } from 'react'
import { Menu } from 'antd';
import {Link,withRouter} from 'react-router-dom'
import {createFromIconfontCN } from '@ant-design/icons';
import menusConfig from '../config/menusConfig'
const { SubMenu } = Menu;
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/font_2466039_w3xm2271zw.js'
    ]
  });
class LeftNva extends Component {
    initMenus = (menus)=>{
        return menus.map(itme=>{
            if(itme.children){
                return(
                    <SubMenu key={itme.key} icon={<IconFont type={itme.icon} />} title={itme.title}>
                        {this.initMenus(itme.children)}
                    </SubMenu>
                )
            }else{
                return(
                    <Menu.Item key={itme.key} icon={<IconFont type={itme.icon} />}>
                        <Link to={itme.key}>
                            {itme.title}
                        </Link>
                    </Menu.Item>
                )
            }
        })
    }
    render() {
        const {pathname} = this.props.location;
        let path = ''
        if(pathname.indexOf('/admin/study') === 0 ){
            path = '/admin/study'
        }
        return (
            <>
                <h3>渔夫yufu</h3>
                <Menu
                    defaultSelectedKeys={[pathname]}
                    defaultOpenKeys={[path]}
                    mode="inline"
                >
                    {this.initMenus(menusConfig)}
                </Menu>
            </>
            )
    }
}

export default withRouter(LeftNva)