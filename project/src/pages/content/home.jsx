import React, { Component } from 'react'
import Notelist from '../../components/notelist'


export default class Home extends Component {
    render() {
        return (
            <div id='home-all'>
                <Notelist type='all' />
            </div>
        )
    }
}
