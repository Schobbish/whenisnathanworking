function generateCalendar(shifts) {
    for (const uid in shifts) {
        if (uid === 'timestamp') {
            break;
        }
        $('#cal').append(`<div class="shift" id="${uid}">
    ${(new Date(shifts[uid].startDate)).toDateString()} ${shifts[uid].job}
</div>`);
    }
    // set timestamp
    const timestamp = new Date(shifts.timestamp);
    $('#timestamp').text(`${timestamp.toDateString()} ${timestamp.toLocaleTimeString()}`);
}

$(document).ready(function() {
    let public = false;
    // get config file for list of calendars
    $.getJSON('config.json').done(function(config) {
        for (const cal of config.cals) {
            // get each calendar's json
            // those in cals/ are for private use so check those first
            // those in cals_pub/ are for public use
            $.getJSON(`cals/${cal}.json`).done(function(shifts) {
                generateCalendar(shifts);
            }).fail(function() {
                // since we fall back on the public files
                console.log('Ignore that 404 error it\'s expected');
                public = true;
                $.getJSON(`cals_pub/${cal}.json`).done(function(shifts) {
                    generateCalendar(shifts);
                });
            });
        }
    }).fail(function() {
        $('#cal').text('Could not get config.json');
    });
});
