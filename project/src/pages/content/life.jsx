import React, { Component } from 'react'
import Notelist from '../../components/notelist'

export default class Life extends Component {
    render() {
        return (
            <div id='home-Life'>
                <Notelist type='life' />
            </div>
        )
    }
}
