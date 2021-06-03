import React, { Component } from 'react'
import APlayer from 'aplayer';

import 'aplayer/dist/APlayer.min.css';
import './Music.less'

export default class Music extends Component {
    ap = null
    componentDidMount(){
        this.ap = new APlayer({
            container: document.getElementById('aplayer'),
            fixed: true,
            audio: [
                {
                    name: 'Nuvole bianche',
                    artist: 'Ludovico Einaudi',
                    url: '/music/Nuvole bianche.mp3',
                    cover: 'http://p1.music.126.net/_ls1RRRH2TRpY6QT67qqIQ==/109951163592583368.jpg?param=130y130',
                }
                ,{
                    name: 'トリカゴ',
                    artist: 'XX：me',
                    url: '/music/XX：me - トリカゴ.mp3',
                    cover: 'http://p2.music.126.net/gWAve6Vnbv0vd6WKa3tGSA==/109951163173817656.jpg?param=130y130',
                }
        ]
        });
    }
    render() {
        return (
            <div id="aplayer"></div>
        )
    }
}
