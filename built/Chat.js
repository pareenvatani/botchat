"use strict";
var React = require('react');
var History_1 = require('./History');
var Shell_1 = require('./Shell');
var Store_1 = require('./Store');
exports.Chat = function (props) {
    var store = Store_1.getStore();
    console.log("BotChat.Chat props", props);
    store.dispatch({ type: 'Start_Connection', user: props.user, botConnection: props.botConnection });
    if (props.formatOptions)
        store.dispatch({ type: 'Set_Format_Options', options: props.formatOptions });
    props.botConnection.connected$.filter(function (connected) { return connected === true; }).subscribe(function (connected) {
        store.dispatch({ type: 'Connected_To_Bot' });
    });
    props.botConnection.activities$.subscribe(function (activity) { return store.dispatch({ type: 'Receive_Message', activity: activity }); }, function (error) { return console.log("errors", error); });
    var state = store.getState();
    console.log("BotChat.Chat starting state", state);
    var header;
    if (state.format.options.showHeader)
        header =
            React.createElement("div", {className: "wc-header"}, 
                React.createElement("span", null, "Chat")
            );
    return (React.createElement("div", {className: "wc-chatview-panel"}, 
        header, 
        React.createElement(History_1.History, {allowMessageSelection: props.allowMessageSelection}), 
        React.createElement(Shell_1.Shell, null)));
};
//# sourceMappingURL=Chat.js.map