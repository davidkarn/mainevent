define(['react', 'lodash', 'templates/browse.rt'], function (React, _, template) {
    'use strict';
    var local_stream;
    var connection;
    var me;
    var sessions = {};
    var session;
    var localStream;
    var peer_id = 'igtqpgrz6g808uxr50';

    function render() {
        return template.apply(this, arguments); }
    
    function redraw() {
        this.setState({}); }

    return React.createClass({
        displayName:         'home',
        go_to:                go_to,
        getInitialState:      returner({show_id:      (query_parameter('show_id') || 'mainevent_id_' + Math.random().toString().slice(3)),
                                        participants:  [],
                                        chat:          [],
                                        giving_tip:    false,
                                        messages:      [],
                                        log:           []}),
        render:               render}); });
