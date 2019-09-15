$(document).ready(function() {
    $.getJSON('config.json').done(function(config) {
        for (var calendar of config.cals) {
            // right now there's only going to be one calendar though
            $.getJSON(`cal/${calendar}.json`).done(function(cal) {
                for (var event of cal.VCALENDAR.VEVENT) {
                    $('#cal').append(`<div class="shift" id="event.UID"></div>`);
                }

            });
        }
    });
});
