define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    function repeatArtist1(artist, artistIndex) {
        return React.createElement('span', {}, this.artist_matches(artist) ? React.createElement('div', {
            'className': 'a-video',
            'onClick': this.go_to.bind(this, '/show/test/' + (artist.live_in == 0 ? 'test' : 'countdown') + '/' + artist.id)
        }, React.createElement('strong', { 'className': 'title' }, artist.name, React.createElement('br', {}), React.createElement('small', {}, artist.venue)), React.createElement('div', { 'className': 'live-now' }, artist.live_in == 0 ? React.createElement('span', {}, '\n            Live now\n          ') : null, artist.live_in != 0 ? React.createElement('span', {}, '\n            Live in ', artist.live_in, 'm\n          ') : null), React.createElement('div', { 'className': 'a-video-wrapper' }, artist.image.slice(-4) == 'webm' ? React.createElement('video', {
            'src': artist.image,
            'loop': 'loop',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        }) : null, artist.image.slice(-4) != 'webm' ? React.createElement('img', {
            'className': 'video',
            'src': artist.image,
            'loop': 'loop',
            'autoPlay': 'autoplay',
            'muted': 'muted'
        }) : null)) : null);
    }
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
        }))), React.createElement('div', { 'style': { textAlign: 'center' } }, React.createElement.apply(this, [
            'div',
            { 'id': 'videos-list' },
            React.createElement('div', { 'id': 'browse-bar' }, React.createElement('div', { 'className': 'pull-left' }, React.createElement('div', {
                'onClick': this.set_showing.bind(this, 'events'),
                'className': 'browse-btn'
            }, '\n              Events\n            '), React.createElement('div', {
                'className': 'browse-btn',
                'onClick': this.set_showing.bind(this, 'feed')
            }, '\n              Feed\n            '), React.createElement('div', {
                'className': 'browse-btn',
                'onClick': this.set_showing.bind(this, 'trending')
            }, '\n              Trending\n            ')), React.createElement('div', { 'className': 'pull-right' }, React.createElement('input', {
                'type': 'text',
                'id': 'search-input',
                'placeholder': 'search'
            }), React.createElement('button', {
                'id': 'search-btn',
                'className': 'fa fa-search'
            }))),
            _.map(this.state.artists, repeatArtist1.bind(this))
        ]))));
    };
});