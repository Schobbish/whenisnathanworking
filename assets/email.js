#!/usr/bin/which node
// to be executed using node.js, not on a webpage
// adapted from main.js and convert.js to work in a command line

const fs = require('fs');

fs.readFile('config.json', function(err, data) {
    if (err) throw err;
    const config = JSON.parse(data);

    for (const file of config.cals) {
        // get each .ics specified in config.cals
        fs.readFile(`cals/${file}.json`, 'utf-8', function(err, rawJSON) {
            if (err) throw err;

            // header
            console.log('Here is the new schedule:\n');

            const shifts = JSON.parse(rawJSON);
            for (const startDate in shifts) {
                if (startDate === 'timestamp') {
                    break;
                }
                console.log(`${(new Date(startDate)).toDateString()} ${shifts[startDate].job}`);
            }

            // footer
            console.log('\nRemember that you can always check https://schobbish.com/whenisnathanworking/ or http://192.168.0.32/whenisnathanworking/ for the most up-to-date schedule.');
            console.log('\nTo unsubscribe, reply to this email stating your intent to do so. This address is monitored by a human.');

            // timestamp
            const timestamp = new Date(shifts.timestamp);
            console.log(`\nTimestamp: ${timestamp.toDateString()} ${timestamp.toLocaleTimeString()}`);
        });
    }
});
