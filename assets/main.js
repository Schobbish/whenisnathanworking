function generateCalendar(shifts) {
    for (const startDate in shifts) {
        if (startDate === 'timestamp') {
            break;
        }
        // only if startDate is in the future
        if (new Date(startDate) > new Date()) {
            $('#cal').append(`<div class="shift" id="${shifts[startDate].uid}">
    ${(new Date(startDate)).toDateString()} ${shifts[startDate].job}
</div>`);
        }
    }
    // set timestamp
    const timestamp = new Date(shifts.timestamp);
    $('#timestamp').text(`${timestamp.toDateString()} ${timestamp.toLocaleTimeString()}`);
}

$(document).ready(function() {
    $.ajaxSetup({ cache: false });
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
                $.getJSON(`cals_pub/${cal}.json`).done(function(shifts) {
                    generateCalendar(shifts);
                });
            });
        }
    }).fail(function() {
        $('#cal').text('Could not get config.json');
    });
});
