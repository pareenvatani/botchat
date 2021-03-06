"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var _this = this;
var React = require('react');
var Chat_1 = require('./Chat');
var receiveBackchannelMessageFromHostingPage = function (props) { return function (event) {
    if (props.allowMessagesFrom.indexOf(event.origin) === -1) {
        console.log("Rejecting backchannel message from unknown source", event.source);
        return;
    }
    if (!event.data) {
        console.log("Empty backchannel message from source", event.source);
        return;
    }
    console.log("Received backchannel message", event.data, "from", event.source);
    props.botConnection.postMessage("backchannel", props.user, { backchannel: event.data })
        .retry(2)
        .subscribe(function (success) {
        console.log("backchannel message sent to bot");
    }, function (error) {
        console.log("failed to send backchannel message to bot");
    });
}; };
exports.App = function (props) {
    console.log("BotChat.App props", props);
    if (props.allowMessagesFrom) {
        console.log("adding event listener for messages from hosting web page");
        window.addEventListener("message", receiveBackchannelMessageFromHostingPage(props), false);
    }
    if (props.onBackchannelMessage) {
        console.log("adding event listener for messages to hosting web page");
        _this.props.botConnection.activities$.filter(function (activity) {
            return activity.type === "message" && activity.text === "backchannel" && activity.channelData && activity.channelData.backchannel;
        }).subscribe(function (message) {
            return _this.props.onBackchannelMessage(message.channelData.backchannel);
        });
    }
    return (React.createElement("div", {className: "wc-app"}, 
        React.createElement("div", {className: "wc-app-left-container"}, 
            React.createElement(Chat_1.Chat, __assign({}, props))
        )
    ));
};
//# sourceMappingURL=App.js.map