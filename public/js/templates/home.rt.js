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
            'muted': participant.has_audio ? 'false' : 'muted',
            'src': participant.src,
            'autoPlay': 'autoplay'
        }))), React.createElement('div', { 'className': 'participant-name hidden' }, participant.name));
    }
    function repeatMessage2(message, messageIndex) {
        return React.createElement('div', { 'className': 'message' }, React.createElement('img', {
            'className': 'avatar',
            'src': lookup_gravatar(message.email, 70)
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
        }, React.createElement('video', { 'id': 'localVideo' }), React.createElement('div', { 'id': 'remotesVideos' })), React.createElement('div', { 'id': 'main' }), React.createElement('div', { 'id': 'smaller' })), React.createElement('div', { 'id': 'who' }, React.createElement('h1', {}, 'The Startup Weekends'), React.createElement('small', {}, 'Playing at Seattle City Hall')), React.createElement.apply(this, [
            'div',
            { 'id': 'chatroom' },
            _.map(this.state.messages.slice(-15), repeatMessage2.bind(this)),
            React.createElement('div', { 'id': 'enter-message' }, React.createElement('textarea', { 'ref': 'entering_message' }))
        ])));
    };
});