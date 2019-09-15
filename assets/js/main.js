$(document).ready(function() {
    $.getJSON('config.json').done(function(config) {
        for (var calendar of config.cals) {
            // right now there's only going to be one calendar though
            $.getJSON(`cals/${calendar}.json`).done(function(cal) {
                for (var event of cal.VCALENDAR[0].VEVENT) {
                    const uid = event.UID.split('@')[0];
                    $('#cal').append(`<div class="shift" id="${uid}"></div>`);
                    $(`#${uid}`).append(`<p class="job">${event.SUMMARY}</p>`);

                    // dates are invalid because they must be in the extended format, not basic
                    const startTime = new Date(event.DTSTART);
                    $(`#${uid}`).append(`<p class="start">${startTime.toDateString()} ${startTime.toLocaleTimeString()}</p>`);

                    const endTime = new Date(event.DTEND);
                    $(`#${uid}`).append(`<p class="end">${endTime.toDateString()} ${endTime.toLocaleTimeString()}</p>`);
                }

            });
        }
    });
});
