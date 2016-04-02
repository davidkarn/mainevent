define(['react', 'lodash', 'templates/home.rt'], function (React, _, home_template) {
    'use strict';
    var local_stream;
    var connection;
    var me;
    var sessions = {};
    var session;

    function render() {
        return home_template.apply(this, arguments); }

    function setup() {
        if (this.props.params.show_id)
            this.state.show_id = this.props.params.show_id;
        me = this;
        init_demo();
        connection = new RTCMultiConnection();
//        connection.socketURL = 'http://' + my_host + ':9001';
        connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

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
            console.log('stream', event);
            console.log(event.type == "local", !event.stream.isVideo);
            if (event.type == "local" || !event.stream.isVideo) return;
            var src = event.mediaElement.src;
            me.add_participant("Test Person", src, event); }
//            connection.videosContainer.appendChild(event.mediaElement);

        connection.onNewSession = function(session) {
            console.log('session', session);
           /* if (sessions[session.sessionid]) return;
            sessions[session.sessionid] = session;

            if (session.sessionid == me.state.show_id) {
                session = sessions[sessionid];
                connection.join(session);
            };*/
        };        

        connection.connect();
        connection.openOrJoin(me.state.show_id, print); }
/*        setTimeout(function() {
            if (me.state.show_id && !session) {
                console.log('open', me.state.show_id);
                connection.open(me.state.show_id);
                connection.join('asdf' + Math.random().toString().slice(3)); }},
                   1000); }*/

    function init_demo(next) {
        link_user_media(
            function(stream) {
                local_stream = stream;
                (next || do_nothing)(); },
            {video: true}); }

    function add_participant(name, src, event, ranking) {
        ranking = ranking || Math.random * 10;
        this.state.participants.push(
            {name: name,
             event: event,
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
        getInitialState:      returner({show_id:      (query_parameter('show_id') || 'mainevent_id_' + Math.random().toString().slice(3)),
                                        participants:  [],
                                        chat:          [],                                        
                                        log:           []}),
        render:               render}); });
