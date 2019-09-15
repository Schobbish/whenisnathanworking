$(document).ready(function() {
    $.getJSON('config.json').done(function(config) {
        for (var calendar of config.cals) {
            // right now there's only going to be one calendar though
            $.getJSON(`cal/${calendar}.json`).done(function(cal) {
                for (var event of cal.VCALENDAR[0].VEVENT) {
                    $('#cal').append(`<div class="shift" id="${event.UID}"></div>`);
                    $(event.UID).append(`<p class="job">${event.SUMMARY}</p>`);

                    const startTime = new Date(event.DTSTART);
                    $(event.UID).append(`<p class="start">${startTime.toDateString} ${startTime.toLocaleTimeString}</p>`);

                    const endTime = new Date(event.DTEND);
                    $(event.UID).append(`<p class="end">${endTime.toDateString} ${endTime.toLocaleTimeString}</p>`);
                }

            });
        }
    });
});
