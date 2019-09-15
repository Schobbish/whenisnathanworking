#!/usr/bin/which node
// to be executed using node.js, not on a webpage

const ical2json = require('ical2json');
const fs = require('fs');

function correctDateFmt(d) {
    // corrects the date format from yyyymmddThhmmss to yyyy-mm-ddThh:mm:ss
    // so that it works with the js date format
    return new Date(`${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,11)}:${d.slice(11,13)}:${d.slice(13)}`);
}

fs.readFile('config.json', function(err, data) {
    if (err) throw err;
    const config = JSON.parse(data);

    for (const file of config.cals) {
        // get each .ics specified in config.cals
        fs.readFile(`cals/${file}.ics`, 'utf-8', function(err, icaldata) {
            if (err) throw err;

            const origJSON = ical2json.convert(icaldata);
            let publicCal = {};
            let privateCal = {};

            // add shifts to the calendars
            for (const event of origJSON.VCALENDAR[0].VEVENT) {
                // hopefully they won't give me two shifts with the same startDate
                // can't use UID as keys because they're out of order for some reason
                const startDate = correctDateFmt(event.DTSTART);
                publicCal[startDate] = {
                    "uid": event.UID.split('@')[0],
                    "endDate": correctDateFmt(event.DTEND),
                    "job": event.SUMMARY.split(' · ')[1]
                };
                privateCal[startDate] = {
                    "uid": event.UID.split('@')[0],
                    "endDate": correctDateFmt(event.DTEND),
                    "job": event.SUMMARY.split(' · ')[1] + ': ' + event.SUMMARY.split(' · ')[2]
                };
            }
            // add a timestamp!!!!
            publicCal.timestamp = new Date();
            privateCal.timestamp = new Date();

            fs.writeFile(`cals_pub/${file}.json`, JSON.stringify(publicCal), function(err) {
                if (err) throw err;
            });
            fs.writeFile(`cals/${file}.json`, JSON.stringify(privateCal), function(err) {
                if (err) throw err;
            });
        });
    }
});
