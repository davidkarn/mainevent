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
        return React.createElement('div', { 'key': this.state.show_id + this.state.my_id }, React.createElement('div', { 'className': 'wrap' }, React.createElement('div', { 'id': 'navbar' }, React.createElement('img', {
            'src': '/images/logo2.png',
            'id': 'logo',
            'onClick': this.go_to.bind(this, '/')
        }), React.createElement('div', { 'className': 'pull-right' }, React.createElement('i', { 'className': 'fa fa-search' }), React.createElement('img', {
            'className': 'avatar',
            'src': lookup_gravatar('david@webdever.net', 70)
        }))), React.createElement('div', { 'id': 'video' }, this.state.countdown ? React.createElement('div', { 'id': 'countdown-bg' }, '>\n        \n      ') : null, this.state.countdown ? React.createElement('div', { 'id': 'countdown' }, React.createElement('span', {}, React.createElement('div', { 'id': 'live-in' }, '\n          Live in\n        '), React.createElement('div', { 'id': 'time_left' }, '\n          ', this.state.minutes_left, ':', this.state.seconds_left, '\n        ')), React.createElement('span', {}, React.createElement('div', { 'id': 'live-in' }, '\n          Live at\n        '), React.createElement('div', { 'id': 'when' }, '\n          ', this.format_time_part(this.state.time_ends.getHours()), ':', this.format_time_part(this.state.time_ends.getMinutes()), ' PM\n        '))) : null, React.createElement('div', { 'id': 'call_popup_main' }, this.state.focused_participant || this.state.countdown ? React.createElement('div', {
            'id': 'main_stream',
            'ref': 'video_container'
        }, this.state.countdown ? React.createElement('img', {
            'id': 'focused_video',
            'src': this.state.artist.image
        }) : null, !this.state.countdown ? React.createElement('video', {
            'id': 'focused_video',
            'muted': 'muted',
            'autoPlay': 'autoplay',
            'src': this.state.focused_participant.src
        }) : null, !this.state.countdown ? React.createElement('div', { 'id': 'participant-info' }, React.createElement('div', { 'className': 'participant-name hidden' }, '\n              ', this.state.focused_participant.name, '\n            ')) : null) : null, !this.state.countdown ? React.createElement.apply(this, [
            'div',
            { 'id': 'participants' },
            _.map(this.get_participants(), repeatParticipant1.bind(this))
        ]) : null), React.createElement('div', {
            'id': 'container',
            'style': { display: 'none' }
        }, React.createElement('video', { 'id': 'localVideo' }), React.createElement('div', { 'id': 'remotesVideos' })), React.createElement('div', { 'id': 'main' }), React.createElement('div', { 'id': 'smaller' })), React.createElement('div', { 'id': 'who' }, React.createElement('div', { 'className': 'pull-right' }, React.createElement('a', { 'href': 'https://squareup.com/store/tacocat4u' }, React.createElement('div', {
            'className': 'tip-button fa fa-shopping-cart',
            'style': { paddingTop: '13px' }
        })), React.createElement('div', {
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
        }, '\n          custom\n        ')), React.createElement('h1', {}, this.state.artist.name), React.createElement('small', {}, this.state.artist.venue)), React.createElement('div', {
            'id': 'give-tip',
            'className': this.state.giving_tip ? '' : ''
        }, this.state.gave_tip ? React.createElement('div', {}, React.createElement('h1', { 'style': { margin: '0' } }, 'Thank You!'), React.createElement('h3', {}, 'Gave a $', this.state.tip_amount, ' tip!')) : null, !this.state.gave_tip ? React.createElement('div', {}, React.createElement('h1', {}, 'Tip "', this.state.artist.name, '" $', this.state.tip_amount), React.createElement('span', {}, '\n          Please log in or create a new account to continue.', React.createElement('br', {}), React.createElement('br', {})), React.createElement('img', {
            'src': '/images/google.png',
            'onClick': this.gave_a_tip,
            'id': 'google-signin'
        }), React.createElement('img', {
            'src': '/images/facebook.png',
            'onClick': this.gave_a_tip,
            'id': 'fb-signin'
        })) : null), React.createElement('video', {
            'src': '/images/video7.webm',
            'loop': 'loop',
            'autoPlay': 'autoplay',
            'style': { display: 'none' }
        }), React.createElement.apply(this, [
            'div',
            { 'id': 'chatroom' },
            _.map(this.state.messages.slice(-15), repeatMessage2.bind(this)),
            React.createElement('div', { 'id': 'enter-message' }, React.createElement('textarea', {
                'ref': 'entering_message',
                'onKeyPress': this.chat_key_press
            }))
        ])));
    };
});