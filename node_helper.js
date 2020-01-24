var self = this;
var NodeHelper = require("node_helper");
const open = require('open');
const isIp = require('is-ip');

var config = {
    serviceTypes:[],
};

const uri = (protocol, location, port) => {
    var array = [];
    if (protocol) {
        array.push(protocol);
        array.push("://");
    }

    array.push(location);

    if (port) {
        array.push(":");
        array.push(port);
    }

    var ss = array.join('');
    return ss;
};

function openTarget(payload) {
    switch (payload.type) {
        case "smb" :{
            if(!payload.host) {
                console.log("We need an FQDN to launch Samba share");
                return;
            }
            open(uri(payload.type, payload.host));
            break;
        }

        case "ssh" : {
            var host = payload.host;
            if(!payload.host) {
                if(!isIp.v4(payload.location)) {
                    console.log("Only IPv6 found, we cannot use SSH with IPv6 - it seems to be problematic");
                    return;
                }

                host = payload.location;
            }

            open('ssh ' + host + (payload.port ? ' -p ' + payload.port : ""), {app : ['x-terminal-emulator', '-e', 'bash', '-c']});
            break;
        }

        case "microphone":
        case "video":
        default: {
            if (payload.type.startsWith("video")) {
                open(uri(payload.protocol, payload.location, payload.port), {app : 'ffplay'});
            } else if(payload.type.startsWith("microphone")) {
                open(uri(payload.protocol, payload.location, payload.port), {app : 'ffplay'});
            } else {
                open(uri(payload.protocol, payload.location, payload.port));
            }
            break;
        }
    }
}

module.exports = NodeHelper.create({
    // Subclass start method.
    start: function() {
        self = this;
    },

    // Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        switch (notification) {
            case "CONFIG": {
                config = payload;
                break;
            }

            case "XDG-OPEN": {

                openTarget(payload);
                break;
            }

            default: {

            }
        }
    },
});