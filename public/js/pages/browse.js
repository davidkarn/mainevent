define(['react', 'lodash', 'templates/browse.rt'], function (React, _, template) {
    'use strict';
    var local_stream;
    var connection;
    var me;
    var sessions = {};
    var session;
    var localStream;
    var peer_id = 'igtqpgrz6g808uxr50';

    function set_showing(what) {
        this.setState({showing: what}); }

    function artist_matches(artist) {
        if (this.state.showing == 'events')
            return true;
        if (this.state.showing == 'feed')
            return artist.id % 2 == 0;
        if (this.state.showing == 'trending')
            return artist.id % 2 == 1;
        return true; }

    function render() {
        return template.apply(this, arguments); }
    
    function redraw() {
        this.setState({}); }

    return React.createClass({
        displayName:         'home',
        artist_matches:       artist_matches,
        set_showing:          set_showing,
        go_to:                go_to,
        getInitialState:      returner({show_id:      (query_parameter('show_id') || 'mainevent_id_' + Math.random().toString().slice(3)),
                                        participants:  [],
                                        chat:          [],
                                        showing:       'events',
                                        giving_tip:    false,
                                        artists:       artists,
                                        messages:      [],
                                        log:           []}),
        render:               render}); });
