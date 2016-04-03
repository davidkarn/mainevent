define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    function repeatParticipant1(participant, participantIndex) {
        return React.createElement('div', { 'className': 'call-participant' }, React.createElement('div', {
            'className': 'video-wrapper2',
            'onClick': this.make_big.bind(this, participant)
        }, React.createElement('div', { 'className': 'video-wrapper' }, React.createElement('video', {
            'id': 'local_video',
            'muted': 'muted',
            'src': participant.src,
            'autoPlay': 'autoplay'
        }))), React.createElement('div', { 'className': 'participant-name hidden' }, participant.name));
    }
    function repeatMessage2(message, messageIndex) {
        return React.createElement('div', { 'className': 'message' }, React.createElement('img', {
            'className': 'avatar',
            'src': message.url
        }), React.createElement('div', { 'className': 'message-part' }, React.createElement('strong', { 'className': 'name' }, message.name), React.createElement('br', {}), React.createElement('span', {}, ' ', message.message)));
    }
    return function () {
        return React.createElement('div', {}, React.createElement('div', { 'className': 'wrap' }, React.createElement('div', { 'id': 'navbar' }, React.createElement('img', {
            'src': '/images/logo2.png',
            'id': 'logo'
        }), React.createElement('div', { 'className': 'pull-right' }, React.createElement('i', { 'className': 'fa fa-search' }), React.createElement('img', {
            'className': 'avatar',
            'src': lookup_gravatar('david@webdever.net', 70)
        }))), React.createElement('div', { 'id': 'video' }, React.createElement('div', { 'id': 'call_popup_main' }, this.state.focused_participant ? React.createElement('div', {
            'id': 'main_stream',
            'ref': 'video_container'
        }, React.createElement('video', {
            'id': 'focused_video',
            'muted': 'muted',
            'autoPlay': 'autoplay',
            'src': this.state.focused_participant.src
        }), React.createElement('div', { 'id': 'participant-info' }, React.createElement('div', { 'className': 'participant-name hidden' }, '\n              ', this.state.focused_participant.name, '\n            '))) : null, React.createElement.apply(this, [
            'div',
            { 'id': 'participants' },
            _.map(this.get_participants(), repeatParticipant1.bind(this))
        ])), React.createElement('div', {
            'id': 'container',
            'style': { display: 'none' }
        }, React.createElement('video', { 'id': 'localVideo' }), React.createElement('div', { 'id': 'remotesVideos' })), React.createElement('div', { 'id': 'main' }), React.createElement('div', { 'id': 'smaller' })), React.createElement('div', { 'id': 'who' }, React.createElement('div', { 'className': 'pull-right' }, React.createElement('div', {
            'className': 'tip-button',
            'onClick': this.give_a_tip.bind(this, 10)
        }, '\n          10$\n        '), React.createElement('div', {
            'className': 'tip-button',
            'onClick': this.give_a_tip.bind(this, 15)
        }, '\n          15$\n        '), React.createElement('div', {
            'className': 'tip-button',
            'onClick': this.give_a_tip.bind(this, 20)
        }, '          \n          20$\n        '), React.createElement('div', {
            'className': 'tip-button',
            'style': { width: '86px' },
            'onClick': this.give_a_tip.bind(this, 8)
        }, '\n          custom\n        ')), React.createElement('h1', {}, 'The Startup Weekends'), React.createElement('small', {}, 'Playing at Seattle City Hall')), React.createElement('div', {
            'id': 'give-tip',
            'className': this.state.giving_tip ? '' : ''
        }, this.state.gave_tip ? React.createElement('div', {}, React.createElement('h1', { 'style': { margin: '0' } }, 'Thank You!'), React.createElement('h3', {}, 'Gave a $', this.state.tip_amount, ' tip!')) : null, !this.state.gave_tip ? React.createElement('div', {}, React.createElement('h1', {}, 'Tip "The Startup Weekends" $', this.state.tip_amount), React.createElement('span', {}, '\n          Please log in or create a new account to continue.', React.createElement('br', {}), React.createElement('br', {})), React.createElement('img', {
            'src': '/images/google.png',
            'onClick': this.gave_a_tip,
            'id': 'google-signin'
        }), React.createElement('img', {
            'src': '/images/facebook.png',
            'onClick': this.gave_a_tip,
            'id': 'fb-signin'
        })) : null), React.createElement.apply(this, [
            'div',
            { 'id': 'chatroom' },
            _.map(this.state.messages.slice(-15), repeatMessage2.bind(this)),
            React.createElement('div', { 'id': 'enter-message' }, React.createElement('textarea', { 'ref': 'entering_message' }))
        ])));
    };
});