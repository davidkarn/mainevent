define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    return function () {
        return React.createElement('div', {}, React.createElement('div', { 'className': 'wrap' }, React.createElement('div', {
            'id': 'navbar',
            'className': 'browse'
        }, React.createElement('img', {
            'src': '/images/logo2.png',
            'id': 'logo'
        }), React.createElement('div', { 'className': 'pull-right' }, React.createElement('i', { 'className': 'fa fa-search' }), React.createElement('img', {
            'className': 'avatar',
            'src': lookup_gravatar('david@webdever.net', 70)
        }))), React.createElement('div', { 'style': { textAlign: 'center' } }, React.createElement('div', { 'id': 'videos-list' }, React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/test')
        }, React.createElement('strong', { 'className': 'title' }, 'TacocaT', React.createElement('br', {}), React.createElement('small', {}, 'Doc Marten\'s')), React.createElement('div', { 'className': 'live-now' }, 'Live now'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('video', {
            'src': '/images/video4.webm',
            'loop': 'loop',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        }))), React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/test')
        }, React.createElement('strong', { 'className': 'title' }, 'Camp Lo', React.createElement('br', {}), React.createElement('small', {}, 'Tractor Tavern')), React.createElement('div', { 'className': 'live-now' }, 'Live now'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('video', {
            'src': '/images/video1.webm',
            'loop': 'loop',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        }))), React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/test')
        }, React.createElement('strong', { 'className': 'title' }, 'Lion\'s Ambition', React.createElement('br', {}), React.createElement('small', {}, 'The Showbox')), React.createElement('div', { 'className': 'live-now' }, 'Live now'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('video', {
            'src': '/images/video2.webm',
            'loop': 'loop',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        }))), React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/test')
        }, React.createElement('strong', { 'className': 'title' }, 'The Classic Crime', React.createElement('br', {}), React.createElement('small', {}, 'The Triple Door')), React.createElement('div', { 'className': 'live-now' }, 'Live Now'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('video', {
            'src': '/images/video5.webm',
            'loop': 'loop',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        }))), React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/test')
        }, React.createElement('strong', { 'className': 'title' }, 'Band of Horses'), React.createElement('div', { 'className': 'live-now' }, 'Live in 8m'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('img', {
            'className': 'video',
            'src': '/images/band_of_horses.jpg',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        }))), React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/test')
        }, React.createElement('strong', { 'className': 'title' }, 'Grand Archives'), React.createElement('div', { 'className': 'live-now' }, 'Live in 18m'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('img', {
            'className': 'video',
            'src': '/images/grand_archives.jpg',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        }))), React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/test')
        }, React.createElement('strong', { 'className': 'title' }, 'Band Name at Venue'), React.createElement('div', { 'className': 'live-now' }, 'Live in 15m'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('video', {
            'src': '/images/video3.webm',
            'muted': 'muted',
            'loop': 'loop',
            'autoPlay': 'autoplay'
        }))), React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/test')
        }, React.createElement('strong', { 'className': 'title' }, 'Minus the Bear'), React.createElement('div', { 'className': 'live-now' }, 'Live in 18m'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('img', {
            'className': 'video',
            'src': '/images/minus_the_bear.jpg',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        }))), React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/test')
        }, React.createElement('strong', { 'className': 'title' }, 'The Head and the Heart'), React.createElement('div', { 'className': 'live-now' }, 'Live in 38m'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('img', {
            'className': 'video',
            'src': '/images/head_and_heart.jpg',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        })))))));
    };
});