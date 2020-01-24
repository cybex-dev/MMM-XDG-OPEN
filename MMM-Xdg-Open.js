Module.register("MMM-Xdg-Open",{

    // Default module config.
    defaults: {

    },

    start: function() {
        console.log("Module " + this.name + " started");
    },

    notificationReceived: function(notification, payload, sender) {
        if (notification === "CLOCK_SECOND" ||
            notification === "CLOCK_MINUTE" ||
            notification === "SERVICE_LIST" ||
            notification === "NEWS_FEED_UPDATE" ||
            notification === "NEWS_FEED" ||
            notification === "CALENDAR_EVENTS")
            return;

        if (notification === "XDG-OPEN") {
            console.log("XDG-OPEN request received with params", payload);
            this.sendSocketNotification(notification, payload);
        }
    },
});