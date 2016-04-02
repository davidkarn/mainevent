define(['react', 'lodash', 'templates/home.rt'], function (React, _, home_template) {
    'use strict';
    var local_stream;
    var connection;
    var me;
    var sessions = {};
    var session;
    var localStream;
    var peer_id = 'igtqpgrz6g808uxr50';
    var getUserMedia = navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia;

    var people = [{name: 'david', email: 'david@webdever.net'},
                  {name: 'bill123142', email: ''},
                  {name: 'Jim Jones', email: ''},
                  {name: 'Colonels4nders', email: ''},
                  {name: 'Bernie Sandars', email: ''}];
    var messages = ['Awesome show',
                    'I cant believe he just did that',
                    'What?',
                    'hello',
                    'what are you talking about?',
                    'thats awful',
                    'wtf',
                    ':D',
                    ':p',
                    '!!!!!!!',
                    'I am amazed by this',
                    'hi i am typing a message into a chatroom',
                    'hi, I am not a real person',
                    'i am a real person'];

    function random_list_member(list) {
        return list[Math.floor(Math.random() * list.length)]; }
    
    function generate_message() {
        var person = random_list_member(people);
        var message = random_list_member(messages);
        me.state.messages.push({name: person.name,
                                email: person.email,
                                message: message}); 
        me.setState({messages: me.state.messages}); }

    function chat() {
        generate_message();
        setTimeout(chat, Math.random() * 2000); }
    
    function render() {
        return home_template.apply(this, arguments); }

    function setup() {
        me = this;
        chat();
//        return init_demo();
        if (this.state.we_setup) return;
        this.state.we_setup = true;
        if (this.props.params.show_id)
            this.state.show_id = this.props.params.show_id;
        if (this.props.params.my_id)
            this.state.my_id = this.props.params.my_id;
        var webrtc = new SimpleWebRTC({
            // the id/element dom element that will hold "our" video
            localVideoEl: 'localVideo',
            // the id/element dom element that will hold remote videos
            remoteVideosEl: 'remotesVideos',
            // immediately ask for camera access
            autoRequestMedia: true
        });
        // we have to wait until it's ready
        webrtc.on('readyToCall', function () {
            // you can name it anything
            webrtc.joinRoom(me.state.show_id);
            check_participants(); }); }

    function check_participants() {
        lookup_participants();
        setTimeout(check_participants, 400); }

    function lookup_participants() {
        var participants = [{local:      true,
                             src:      $('#localVideo').attr('src'),
                             name:      'me'}];
        $('#remoteVideos').children().map(function(i, el) {
            participants.push({src:    el.src,
                               name:  'name'}); });
        me.setState({participants: participants}); }
        
    
    function setup_peer() {
        if (this.state.we_setup) return;
        this.state.we_setup = true;
        if (this.props.params.show_id)
            this.state.show_id = this.props.params.show_id;
        if (this.props.params.my_id)
            this.state.my_id = this.props.params.my_id;
        me = this;
        init_demo();
        
        if (this.state.my_id == 'view') 
            ['1','2','3','4'].map(listen);
        else
            call(this.state.my_id); }

    function call() {
        var peer = new Peer(me.state.show_id + '_viewer_' + me.state.my_id +
                            Math.random().toString().slice(3),
                            {key: 'igtqpgrz6g808uxr'});

        getUserMedia({video: true, audio: true}, function(stream) {
            var call = peer.call(me.state.show_id + '_' + me.state.my_id, stream);
            call.on('stream', function(remoteStream) {
                console.log('hey we connnected yo', remoteStream); }); },
        function(err) {
            console.log('Failed to get local stream' ,err); }); }

    function listen(id) {
        var peer = new Peer(me.state.show_id + '_' + id,
                            {key: 'igtqpgrz6g808uxr'});

        peer.on('call', function(call) {
            getUserMedia({video: true, audio: true},
                         function(stream) {
                             call.answer(stream); // Answer the call with an A/V stream.
                             call.on('stream', function(remoteStream) {
                                 me.add_participant('test',
                                                    URL.createObjectURL(stream),
                                                    {}); }); },
                         function(err) {
                             console.log('Failed to get local stream' ,err); }); }); }
    
    function init_demo(next) {
        console.log('init');
        link_user_media(
            function(stream) {
                console.log('init', stream);
                local_stream = stream;
                var participants = [{name: 'test',
                                     ranking: 3,
                                     src:   URL.createObjectURL(stream)},
                                    {name: 'test',
                                     ranking: 4,
                                     src:   URL.createObjectURL(stream)}];
                me.setState({participants:          participants,
                             messages:             [
                                 {name: 'David Karn', email: 'david@webdever.net',
                                  message: 'this is a test chat message'},
                                /* {name: 'David Karn', email: 'david@webdever.net',
                                  message: 'this is a test chat message'},
                                 {name: 'David Karn', email: 'david@webdever.net',
                                  message: 'this is a test chat message'},
                                 {name: 'David Karn', email: 'david@webdever.net',
                                  message: 'this is a test chat message'},
                                 {name: 'David Karn', email: 'david@webdever.net',
                                  message: 'this is a test chat message'},
                                 {name: 'David Karn', email: 'david@webdever.net',
                                  message: 'this is a test chat message'},
                                 {name: 'David Karn', email: 'david@webdever.net',
                                  message: 'this is a test chat message'},
                                 {name: 'David Karn', email: 'david@webdever.net',
                                  message: 'this is a test chat message'},
                                 {name: 'David Karn', email: 'david@webdever.net',
                                  message: 'this is a test chat message'},
                                 {name: 'David Karn', email: 'david@webdever.net',
                                  message: 'this is a test chat message'},
                                 {name: 'David Karn', email: 'david@webdever.net',
                                  message: 'this is a test chat message'}*/],
                             focused_participant:   participants[0]}); 

                (next || do_nothing)(); },
            {video: true}); }

    function add_participant(name, src, event, ranking) {
        ranking = ranking || Math.random * 10;
        console.log(this.state.participants);
        this.state.participants.push(
            {name: name,
             event: event,
             src: src,
             ranking: ranking});
        this.setState({participants: this.state.participants}); }

    function make_big(participant) {
        this.setState({focused_participant: participant}); }

    function get_participants() {
        return this.state.participants; }
    
    function redraw() {
        this.setState({}); }

    return React.createClass({
        displayName:         'home',
        go_to:                go_to,
        componentDidMount:    setup,
        get_participants:     get_participants,
        add_participant:      add_participant,
        make_big:             make_big,
        getInitialState:      returner({show_id:      (query_parameter('show_id') || 'mainevent_id_' + Math.random().toString().slice(3)),
                                        participants:  [],
                                        chat:          [],
                                        messages:      [],
                                        log:           []}),
        render:               render}); });
