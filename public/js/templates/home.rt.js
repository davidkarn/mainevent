define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    function repeatParticipant1(participant, participantIndex) {
        return React.createElement('div', { 'className': 'call-participant' }, React.createElement('div', { 'className': 'video-wrapper2' }, React.createElement('div', { 'className': 'video-wrapper' }, React.createElement('video', {
            'id': 'local_video',
            'muted': participant.has_audio ? 'false' : 'muted',
            'src': participant.src,
            'autoPlay': 'autoplay'
        }))), React.createElement('div', { 'className': 'participant-name' }, participant.name));
    }
    function repeatMessage2(message, messageIndex) {
        return React.createElement('div', { 'className': 'message' }, React.createElement('strong', { 'className': 'name' }, message.name), React.createElement('p', {}, message.message));
    }
    return function () {
        return React.createElement('div', {}, React.createElement('div', { 'className': 'wrap' }, React.createElement('div', { 'id': 'video' }, React.createElement('div', { 'id': 'call_popup_main' }, this.state.focused_participant ? React.createElement('div', {
            'id': 'main_stream',
            'ref': 'video_container'
        }, React.createElement('video', {
            'id': 'focused_video',
            'muted': 'muted',
            'autoPlay': 'autoplay',
            'src': this.state.focused_participant.src
        }), React.createElement('div', { 'id': 'participant-info' }, React.createElement('div', { 'className': 'participant-name' }, '\n              ', this.state.focused_participant.name, '\n            '), React.createElement('div', { 'className': 'crm-link' }, React.createElement('img', { 'src': '../images/salesforce.png' }), React.createElement('a', { 'href': 'http://salesforce.com/' }, '(Lead) ', this.state.focused_participant.name)))) : null, React.createElement.apply(this, [
            'div',
            { 'id': 'participants' },
            _.map(this.get_participants(), repeatParticipant1.bind(this))
        ]))), React.createElement.apply(this, [
            'div',
            { 'id': 'chatroom' },
            _.map(this.state.messages, repeatMessage2.bind(this))
        ])));
    };
});