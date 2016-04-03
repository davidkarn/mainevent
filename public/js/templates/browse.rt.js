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
        }))), React.createElement('div', { 'style': { textAlign: 'center' } }, React.createElement('div', { 'id': 'videos-list' }, React.createElement('div', { 'id': 'browse-bar' }, React.createElement('div', { 'className': 'pull-left' }, React.createElement('div', { 'className': 'browse-btn' }, '\n              Events\n            '), React.createElement('div', { 'className': 'browse-btn' }, '\n              Feed\n            '), React.createElement('div', { 'className': 'browse-btn' }, '\n              Trending\n            ')), React.createElement('div', { 'className': 'pull-right' }, React.createElement('input', {
            'type': 'text',
            'id': 'search-input',
            'placeholder': 'search'
        }), React.createElement('button', {
            'id': 'search-btn',
            'className': 'fa fa-search'
        }))), React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/test/11')
        }, React.createElement('strong', { 'className': 'title' }, 'Wimps', React.createElement('br', {}), React.createElement('small', {}, 'Columbia City Theater')), React.createElement('div', { 'className': 'live-now' }, 'Live now'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('video', {
            'src': '/images/video6.webm',
            'loop': 'loop',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        }))), React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/test/1')
        }, React.createElement('strong', { 'className': 'title' }, 'TacocaT', React.createElement('br', {}), React.createElement('small', {}, 'Doc Marten\'s')), React.createElement('div', { 'className': 'live-now' }, 'Live now'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('video', {
            'src': '/images/video4.webm',
            'loop': 'loop',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        }))), React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/test/10')
        }, React.createElement('strong', { 'className': 'title' }, 'OnTourage', React.createElement('br', {}), React.createElement('small', {}, 'Startup Weekend Seattle Music')), React.createElement('div', { 'className': 'live-now' }, 'Live now'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('img', {
            'className': 'video',
            'src': '/images/startup_weekend.jpg',
            'loop': 'loop',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        })))    /*  -div class="a-video" onClick="{this.go_to.bind(this, '/show/test/test/2')}">
        <strong class="title">Camp Lo<br /><small>Tractor Tavern</small></strong>
        <div class="live-now">Live now</div>
        <div class="a-video-wrapper">
          <video src="/images/video1.webm" loop="loop" autoplay="autoplay" muted="muted" />
        </div>
      </div */, React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/test/3')
        }, React.createElement('strong', { 'className': 'title' }, 'Lion\'s Ambition', React.createElement('br', {}), React.createElement('small', {}, 'The Showbox')), React.createElement('div', { 'className': 'live-now' }, 'Live now'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('video', {
            'src': '/images/video2.webm',
            'loop': 'loop',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        }))), React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/test/4')
        }, React.createElement('strong', { 'className': 'title' }, 'The Classic Crime', React.createElement('br', {}), React.createElement('small', {}, 'The Triple Door')), React.createElement('div', { 'className': 'live-now' }, 'Live Now'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('video', {
            'src': '/images/video5.webm',
            'loop': 'loop',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        }))), React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/countdown/7')
        }, React.createElement('strong', { 'className': 'title' }, 'Blue Scholars', React.createElement('br', {}), React.createElement('small', {}, 'Nippon Kan')), React.createElement('div', { 'className': 'live-now' }, 'Live in 15m'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('img', {
            'src': 'https://i.ytimg.com/vi/p8rzHTHKvKs/maxresdefault.jpg',
            'className': 'video',
            'muted': 'muted',
            'loop': 'loop',
            'autoPlay': 'autoplay'
        }))), React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/countdown/5')
        }, React.createElement('strong', { 'className': 'title' }, 'Band of Horses', React.createElement('br', {}), React.createElement('small', {}, 'The Triple Crocodile')), React.createElement('div', { 'className': 'live-now' }, 'Live in 8m'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('img', {
            'className': 'video',
            'src': '/images/band_of_horses.jpg',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        }))), React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/countdown/6')
        }, React.createElement('strong', { 'className': 'title' }, 'Grand Archives', React.createElement('br', {}), React.createElement('small', {}, 'Central Saloon')), React.createElement('div', { 'className': 'live-now' }, 'Live in 18m'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('img', {
            'className': 'video',
            'src': '/images/grand_archives.jpg',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        }))), React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/countdown/8')
        }, React.createElement('strong', { 'className': 'title' }, 'Minus the Bear', React.createElement('br', {}), React.createElement('small', {}, 'Nectar Lounge')), React.createElement('div', { 'className': 'live-now' }, 'Live in 18m'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('img', {
            'className': 'video',
            'src': '/images/minus_the_bear.jpg',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        }))), React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/countdown/9')
        }, React.createElement('strong', { 'className': 'title' }, 'The Head and the Heart', React.createElement('br', {}), React.createElement('small', {}, 'Neumos')), React.createElement('div', { 'className': 'live-now' }, 'Live in 38m'), React.createElement('div', { 'className': 'a-video-wrapper' }, React.createElement('img', {
            'className': 'video',
            'src': '/images/head_and_heart.jpg',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        })))))));
    };
});