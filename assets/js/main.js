function correctDateFmt(d) {
    return new Date(`${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,11)}:${d.slice(11,13)}:${d.slice(13)}`);
}

$(document).ready(function() {
    $.getJSON('config.json').done(function(config) {
        for (var calendar of config.cals) {
            // right now there's only going to be one calendar though
            $.getJSON(`cals/${calendar}.json`).done(function(cal) {
                for (const event of cal.VCALENDAR[0].VEVENT) {
                    const uid = event.UID.split('@')[0];

                    // check if uid does not exist first
                    if ($(`#${uid}`).length === 0) {
                        $('#cal').append(`<div class="shift" id="${uid}"></div>`);
                        $(`#${uid}`).append(`<p class="start">${correctDateFmt(event.DTSTART).toDateString()}</p>`);
                        $(`#${uid}`).append(`<p class="job">${event.SUMMARY}</p>`);

                        /*
                        // not used because times are already in the summary
                        const startTime = correctDateFmt(event.DTSTART);
                        $(`#${uid}`).append(`<p class="start">${startTime.toDateString()} ${startTime.toLocaleTimeString()}</p>`);

                        const endTime = correctDateFmt(event.DTEND);
                        $(`#${uid}`).append(`<p class="end">${endTime.toDateString()} ${endTime.toLocaleTimeString()}</p>`);
                        */
                    }
                }
            }); // TODO: add fail function
        }
    }); // TODO: add fail function
});
