define(['react', 'lodash', 'templates/home.rt'], function (React, _, home_template) {
    'use strict';
    var local_stream;
    var connection;
    var me;
    var sessions = {};
    var session;
    var localStream;

    function render() {
        return home_template.apply(this, arguments); }

    function setup_old() {
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
            if (event.type == "local2" || !event.stream.isVideo) return;
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

    function setup() {
        var me = this;
// initializing the constructor
        var connection = new RTCMultiConnection();
                connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

// some booleans to override defaults
connection.preventSSLAutoAllowed = false;
connection.autoReDialOnFailure = true;
connection.setDefaultEventsForMediaElement = false;

// setting type of media connection
connection.session = {
    audio: true,
    video: true
};

// DOM objects
var localVideo = document.getElementById('localVideo');
var miniVideo = document.getElementById('miniVideo');
var remoteVideo = document.getElementById('remoteVideo');
var card = document.getElementById('card');
var containerDiv;

var main = document.querySelector('#main');
var smaller = document.querySelector('#smaller');

var RTCPeerConnection = null;
var getUserMedia = null;
var attachMediaStream = null;
var reattachMediaStream = null;
var webrtcDetectedBrowser = null;
var webrtcDetectedVersion = null;

if (navigator.mozGetUserMedia) {
    console.log("This appears to be Firefox");

    webrtcDetectedBrowser = "firefox";

    webrtcDetectedVersion =
        parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]);

    // The RTCPeerConnection object.
    RTCPeerConnection = mozRTCPeerConnection;

    // The RTCSessionDescription object.
    RTCSessionDescription = mozRTCSessionDescription;

    // The RTCIceCandidate object.
    RTCIceCandidate = mozRTCIceCandidate;

    // Get UserMedia (only difference is the prefix).
    // Code from Adam Barth.
    getUserMedia = navigator.mozGetUserMedia.bind(navigator);

    // Attach a media stream to an element.
    attachMediaStream = function(element, stream) {
        console.log("Attaching media stream");
        element.mozSrcObject = stream;
        element.play();
    };

    reattachMediaStream = function(to, from) {
        console.log("Reattaching media stream");
        to.mozSrcObject = from.mozSrcObject;
        to.play();
    };

    // Fake get{Video,Audio}Tracks
    MediaStream.prototype.getVideoTracks = function() {
        return [];
    };

    MediaStream.prototype.getAudioTracks = function() {
        return [];
    };
} else if (navigator.webkitGetUserMedia) {
    console.log("This appears to be Chrome");

    webrtcDetectedBrowser = "chrome";
    webrtcDetectedVersion =
        parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2]);

    // The RTCPeerConnection object.
    RTCPeerConnection = webkitRTCPeerConnection;

    // Get UserMedia (only difference is the prefix).
    // Code from Adam Barth.
    getUserMedia = navigator.webkitGetUserMedia.bind(navigator);

    // Attach a media stream to an element.
    attachMediaStream = function(element, stream) {
        if (typeof element.srcObject !== 'undefined') {
            element.srcObject = stream;
        } else if (typeof element.mozSrcObject !== 'undefined') {
            element.mozSrcObject = stream;
        } else if (typeof element.src !== 'undefined') {
            element.src = URL.createObjectURL(stream);
        } else {
            console.log('Error attaching stream to element.');
        }
    };

    reattachMediaStream = function(to, from) {
        to.src = from.src;
    };

    // The representation of tracks in a stream is changed in M26.
    // Unify them for earlier Chrome versions in the coexisting period.
    if (!webkitMediaStream.prototype.getVideoTracks) {
        webkitMediaStream.prototype.getVideoTracks = function() {
            return this.videoTracks;
        };
        webkitMediaStream.prototype.getAudioTracks = function() {
            return this.audioTracks;
        };
    }

    // New syntax of getXXXStreams method in M26.
    if (!webkitRTCPeerConnection.prototype.getLocalStreams) {
        webkitRTCPeerConnection.prototype.getLocalStreams = function() {
            return this.localStreams;
        };
        webkitRTCPeerConnection.prototype.getRemoteStreams = function() {
            return this.remoteStreams;
        };
    }
} else {
    console.log("Browser does not appear to be WebRTC-capable");
}

// onstream event; fired both for local and remote videos
var numberOfRemoteVideos = 0;
        connection.onstream = function(e) {
            console.log('stream', e);
    if (e.type == 'local') {
        localStream = e.stream;
        attachMediaStream(localVideo, e.stream);
        localVideo.muted = true;
        localVideo.style.opacity = 1;
    }

    if (e.type == 'remote') numberOfRemoteVideos++;

    if (e.type == 'remote' && numberOfRemoteVideos == 1) {
        remoteStream = e.stream;
        reattachMediaStream(miniVideo, localVideo);
        miniVideo.muted = true;
        attachMediaStream(remoteVideo, e.stream);
        waitForRemoteVideo();

        remoteVideo.setAttribute('data-id', e.userid);
        miniVideo.setAttribute('data-id', connection.userid);
    }

    if (e.type == 'remote' && numberOfRemoteVideos == 2) {
        appendVideo(e, 'opacity: 1;position: fixed;bottom: 0;z-index: 1;width: 32%;');
    }

    if (e.type == 'remote' && numberOfRemoteVideos == 3) {
        appendVideo(e, 'opacity: 1;position: fixed;top: 0;z-index: 1;width: 32%;');
    }

    if (e.type == 'remote' && numberOfRemoteVideos == 4) {
        appendVideo(e, 'opacity: 1;position: fixed;top: 0;z-index: 1;width: 32%;right:0;');
    }

    if (e.type == 'local') {
        document.getElementById('open-room').style.display = 'none';
    }
};

function appendVideo(e, style) {
    createVideoContainer(e, style, function(div) {
        var video = document.createElement('video');
        video.className = 'other-videos';
        video.setAttribute('style', 'height:auto;opacity:1;');
        video.id = e.userid;
        video.src = URL.createObjectURL(e.stream);
        var remote = document.getElementById('remote');
        div.appendChild(video);
        video.play();
    });
}

function createVideoContainer(e, style, callback) {
    var div = document.createElement('div');
    div.setAttribute('style', style || 'float:left;opacity: 1;width: 32%;');
    remote.insertBefore(div, remote.firstChild);
    if (callback) callback(div);
}

// if user left
connection.onleave = function(e) {
    var video = document.getElementById(e.userid);

    if (numberOfRemoteVideos == 1) {
        transitionToWaiting();
    } else if (video && video.parentNode && video.parentNode.parentNode) {
        numberOfRemoteVideos--;
        video.parentNode.parentNode.removeChild(video.parentNode);
    }
};

function waitForRemoteVideo() {
    // Call the getVideoTracks method via adapter.js.
    var videoTracks = remoteStream.getVideoTracks();
    if (videoTracks.length === 0 || remoteVideo.currentTime > 0) {
        transitionToActive();
    } else {
        setTimeout(waitForRemoteVideo, 100);
    }
}

function transitionToActive() {
    remoteVideo.style.opacity = 1;
    card.style.webkitTransform = 'rotateY(180deg)';
    setTimeout(function() {
        localVideo.src = '';
    }, 500);
    setTimeout(function() {
        miniVideo.style.opacity = 1;
    }, 1000);
    // Reset window display according to the aspectRatio of remote video.
    window.onresize();
}

function transitionToWaiting() {
    card.style.webkitTransform = 'rotateY(0deg)';
    setTimeout(function() {
        localVideo.src = miniVideo.src;
        localVideo.muted = true;
        miniVideo.src = '';
        remoteVideo.src = '';

        localVideo.style.opacity = 1;
    }, 500);
    miniVideo.style.opacity = 0;
    remoteVideo.style.opacity = 0;
}


// Set the video displaying in the center of window.
window.onresize = function() {
    var aspectRatio;
    if (remoteVideo.style.opacity === '1') {
        aspectRatio = remoteVideo.videoWidth / remoteVideo.videoHeight;
    } else if (localVideo.style.opacity === '1') {
        aspectRatio = localVideo.videoWidth / localVideo.videoHeight;
    } else {
        return;
    }

    var innerHeight = this.innerHeight;
    var innerWidth = this.innerWidth;
    var videoWidth = innerWidth < aspectRatio * window.innerHeight ?
        innerWidth : aspectRatio * window.innerHeight;
    var videoHeight = innerHeight < window.innerWidth / aspectRatio ?
        innerHeight : window.innerWidth / aspectRatio;
    containerDiv = document.getElementById('container');
    containerDiv.style.width = videoWidth + 'px';
    containerDiv.style.height = videoHeight + 'px';
    containerDiv.style.left = (innerWidth - videoWidth) / 2 + 'px';
    containerDiv.style.top = (innerHeight - videoHeight) / 2 + 'px';
};

function enterFullScreen() {
    container.webkitRequestFullScreen();
}

// connecting to signaling medium
connection.connect();

    connection.openOrJoin(me.state.show_id);
    }
        
    
    function init_demo(next) {
        link_user_media(
            function(stream) {
                local_stream = stream;
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
        getInitialState:      returner({show_id:      (query_parameter('show_id') || 'mainevent_id_' + Math.random().toString().slice(3)),
                                        participants:  [],
                                        chat:          [],                                        
                                        log:           []}),
        render:               render}); });
