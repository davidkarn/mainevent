define(['react', 'lodash', 'templates/home.rt'], function (React, _, home_template) {
    'use strict';
    var local_stream;
    var connection;
    var me;

    function render() {
        return home_template.apply(this, arguments); }

    function setup() {
        me = this;
        init_demo();
        connection = new RTCMultiConnection();
//        connection.socketURL = 'http://' + my_host + ':9001';
        connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
        connection.socketMessageEvent = 'video-conference-demo';

        var roomid = this.state.room_id;

        connection.session = {
            audio: true,
            video: true
        };

        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };
        console.log(me.refs);

        connection.onstream = function(event) {
            console.log(event);
            connection.videosContainer.appendChild(event.mediaElement);

            setTimeout(function() {
                event.mediaElement.play();
            }, 5000); };

        if (this.state.show_id)
            connection.join(this.state.show_id); }

    function init_demo() {
        link_user_media(
            function(stream) {
                local_stream = stream; },
            {video: true}); }

    function add_participant(name, src, ranking) {
        ranking = ranking || Math.random * 10;
        this.state.participants = this.state.participants.push(
            {name: name,
             src: src,
             ranking: ranking});
        this.setState({participants: participants}); }

    function get_participants() {
        return this.state.participants; }
    
    function redraw() {
        this.setState({}); }

    return React.createClass({
        displayName:         'home',
        go_to:                go_to,
        componentWillMount:   setup,
        get_participants:     get_participants,
        add_participant:      add_participant,
        getInitialState:      returner({show_id:      'mainevent_id_' + Math.random().toString().slice(3),
                                        participants:  [],
                                        chat:          [],                                        
                                        log:           []}),
        render:               render}); });
