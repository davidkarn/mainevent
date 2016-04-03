define(['react', 'lodash', 'react_router', 'pages/home', 'templates/home.rt', 'pages/browse'], function (React, _, Router, home, home_template, browse) {
    'use strict';
    
    var app = React.createClass({
        render: function() {
            return React.createElement(Router.RouteHandler, null); }});

    var routes = {"show/:show_id/:my_id":    home,
                  "":                        browse,
                  "browse":                  browse,
                  "home":                    home};
    console.log(app, home, home_template);

    return {routes:       routes,
            bula:         home_template,
            landing:      home_template,
            app:          app}; });
            
