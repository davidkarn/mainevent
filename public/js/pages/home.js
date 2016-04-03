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
    var running_timer = false;
    
    var artists = [
        {name: 'TacocaT',
         venue: "Doc Marten\'s",
         image: '/images/video4.webm'},
        {name: 'Camp Lo',
         venue: 'Tractor Tavern',
         image: '/images/video1.webm'},
        {name: "Lion's Ambition",
         venue: 'The Showbox',
         image: '/images/video2.webm'},
        {name: 'The Classic Crime',
         venue: 'The Triple Door',
         image: '/images/video5.webm'},
        {name: 'Band of Horses',
         venue: 'The Crocodile',
         image: '/images/band_of_horses.jpg'},
        {name: 'Grand Archives',
         venue: 'Central Saloon',
         image: '/images/grand_archives.jpg'},
        {name: 'Blue Scholars',
         venue: 'Nippon Kan',
         image: 'https://i.ytimg.com/vi/p8rzHTHKvKs/maxresdefault.jpg'},
        {name: 'Minus the Bear',
         image: '/images/minus_the_bear.jpg',
         venue: 'Nectar Lounge'},
        {name: 'The Head and the Heart',
         image: '/images/head_and_heart.jpg',
         venue: 'Neumos'},
        {name: 'OnTourage',
         image: '/images/startup_weekend.jpg',
         venue: 'Startup Weekend Seattle Music'}];
    
    var people = [{name: 'david', email: 'david@webdever.net', url: lookup_gravatar('david@webdever.net', 70)},
                  {name: 'bill123142', email: '', url: 'https://yt3.ggpht.com/-AbhjhawAzT4/AAAAAAAAAAI/AAAAAAAAAAA/dHjAHcytyJ8/s48-c-k-no-rj-c0xffffff/photo.jpg'},
                  {name: 'Jim Jones', email: '', url: 'https://yt3.ggpht.com/--LQfdsFsCCg/AAAAAAAAAAI/AAAAAAAAAAA/dTDXZh08IKo/s48-c-k-no-rj-c0xffffff/photo.jpg'},
                  {name: 'Colonels4nders', email: '', url: 'https://yt3.ggpht.com/-ETIiw_y1mm4/AAAAAAAAAAI/AAAAAAAAAAA/McbkOJUtJ14/s48-c-k-no-rj-c0xffffff/photo.jpg'},
                  {name: 'Bernie Sandars', email: '', url: 'https://yt3.ggpht.com/-yLlO9YEUpjs/AAAAAAAAAAI/AAAAAAAAAAA/rMi-vgaKEBI/s48-c-k-no-rj-c0xffffff/photo.jpg'},
                  {name: 'EVILpeanut', email: '', url: 'https://5minutemarvels.files.wordpress.com/2012/01/mpsmall.jpg'},
                  {name: '23422ofJustice', email: '', url: 'https://yt3.ggpht.com/-eN4a_aghN4Q/AAAAAAAAAAI/AAAAAAAAAAA/5aJg82EwHaQ/s32-c-k-no-rj-c0xffffff/photo.jpg'},
                   {name: 'fruityloop3008', email: '', url: 'https://yt3.ggpht.com/-BNqSZMoSnpE/AAAAAAAAAAI/AAAAAAAAAAA/T6a0UZFoJTQ/s48-c-k-no-rj-c0xffffff/photo.jpg'}];
    var messages = ['Awesome show',
                    'I cant believe he just did that',
                    'What?',
                    'hello',
                    'what are you talking about?',
                    '@fruityloop3008 I know right',
                    '@Colenels4nders what do you mean',
                    'huh?',
                    'blargh!',
                    'nooooo!!!',
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
        me.state.messages.push({name:      person.name,
                                email:     person.email,
                                url:       person.url,
                                message:   message}); 
        me.setState({messages: me.state.messages.slice(-40)}); }

    function chat() {
        generate_message();
        setTimeout(chat, Math.random() * 2000); }
    
    function render() {
        return home_template.apply(this, arguments); }

    function format_time_part(num) {
        var s = Math.round(num).toString();
        if (s.length == 1)
            return '0' + s;
        return s; }

    function rand_img() {
        return random_list_member(
            ["/images/band_of_horses.jpg",
             "/images/grand_archives.jpg",
             "/images/minus_the_bear.jpg",
             "/images/head_and_heart.jpg"]); }


    function timer() {
        var now = new Date();
        var then = now - (-60 * Math.random() * 10000);
        me.state.countdown_url = rand_img();
        running_timer = true;

        function run_timer() {
            if (!running_timer) return;
            var now = new Date();
            var time_left      = ((then -1) - (now - 1));
            var minutes_left   = Math.floor(time_left / 1000 / 60);
            var seconds_left   = Math.floor((time_left
                                            - (minutes_left
                                               * 1000 * 60))
                                            / 1000);
            
            console.log(time_left, minutes_left, then, seconds_left);
            me.setState({time_ends:    new Date(then),
                         minutes_left: format_time_part(minutes_left),
                         seconds_left: format_time_part(seconds_left),
                         countdown:    time_left > 0});
            setTimeout(run_timer, 1000); }
                    
        run_timer(); }
        

    function setup() {
        me = this;
        chat();
        

        if (this.state.we_setup) return;

        this.state.we_setup = true;
        if (this.props.params.show_id)
            this.state.show_id = this.props.params.show_id;
        if (this.props.params.my_id)
            this.state.my_id = this.props.params.my_id;
        if (this.props.params.artist_id)
            this.state.artist = artists[this.props.params.artist_id - 1];
        if (this.state.my_id == 'countdown')
            return timer();
        else {
            running_timer = false;
            me.setState({time_ends: false,
                         minutes_left: false,
                         countdown: false,
                         seconds_left: false}); }
            
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
        if (!$('#localVideo').attr('src')) return;
        var participants = [{local:      true,
                             src:      $('#localVideo').attr('src'),
                             name:      'me'}];
        participants = [];
        $('#remotesVideos').children().map(function(i, el) {
            participants.push({src:    el.src,
                               name:  'name'}); });
        me.setState({participants:          participants,
                     focused_participant:   me.state.focused_participant || participants[0]}); }
        
    
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

    function give_a_tip(how_much) {
        this.setState({gave_tip: false});
        $('#give-tip').animate({opacity: 1, top: '100px'}, 400);
        this.setState({tip_amount: how_much}); }

    function gave_a_tip() {
        this.setState({gave_tip: true});
        $('#give-tip').animate({opacity: 0, top: '30px'}, 600,
                               "linear",
                                function() {
                                    me.setState({gave_tip: true});}); }

    function get_participants() {
        return this.state.participants; }
    
    function redraw() {
        this.setState({}); }

    function go_to_(where_to)  {
        running_timer = false;
        this.state.we_setup = false;
        me.state = {show_id:      (query_parameter('show_id') || 'mainevent_id_' + Math.random().toString().slice(3)),
                    participants:  [],
                    chat:          [],
                    giving_tip:    false,
                    messages:      [],
                    artist: {},
                    log:           []};
        go_to(where_to); }

    function get_props(new_props) {
        console.log('get_props');
        var local_stream;
        var connection = undefined;
        var me = undefined;
        var sessions = {};
        var session = undefined;
        var localStream = undefined;
        var peer_id = 'igtqpgrz6g808uxr50';
        var getUserMedia = navigator.getUserMedia
                || navigator.webkitGetUserMedia
                || navigator.mozGetUserMedia;
        this.state.we_setup = false;
        this.setup(); }

    function chat_key_press(e){
        var key=e.keyCode || e.which;
        var message = ref_value(this.refs.entering_message);
        if (key==13){
            this.state.messages.push({name: 'David Karn',
                                      url: lookup_gravatar('david@webdever.net', 70),
                                      email: 'david@webdever.net',
                                      message: message});
            this.setState({messages: this.state.messages});
            ref_set_value(this.refs.entering_message, ""); }}
    
    return React.createClass({
        displayName:         'home',
        go_to:                go_to_,
        chat_key_press:       chat_key_press,
        setup:                setup,
        give_a_tip:           give_a_tip,
        gave_a_tip:           gave_a_tip,
        componentDidMount:    get_props,
        format_time_part:     format_time_part,
//        componentWillMount: get_props,
        get_participants:     get_participants,
        add_participant:      add_participant,
        make_big:             make_big,
        getInitialState:      returner({show_id:      (query_parameter('show_id') || 'mainevent_id_' + Math.random().toString().slice(3)),
                                        participants:  [],
                                        chat:          [],
                                        giving_tip:    false,
                                        messages:      [],
                                        artist: {},
                                        log:           []}),
        render:               render}); });
