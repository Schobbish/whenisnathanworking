# whenisnathanworking
Website to show when Nathan is working

This project uses [https://www.npmjs.com/package/ical2json](ical2json) and jQuery. You'll also need `curl`, node.js and preferably a way to schedule tasks (such as crontab) to get the backend working. (No `wget` support because I'm lazy and macOS doesn't have it)

For some reason I wrote this so that it works for any number of calendars, but the webpage is only designed for showing one.

## Specifying Calendar URLs
Place URLs to .ics files in plain text files with the extension `.url`, one URL per file. Place those files in a folder named `cals/` in the same directory as `index.html`. Using the `cals/` folder will protect your privacy because its listed on the `.gitignore`.

## `config.json`
A file named `config.json`, placed in the same directory as the `index.html`, is *required* for the website to work chiefly because it defines which calendars to pull events from. These names should be in an array assigned to the key `cals`, like in the example below for two calendars: one named "shifts" and another named "events". Of course, it works fine with one calendar.

### Example
```JSON
{
    "cals": ["shifts", "events"]
}
```

## How it Works
`update.sh` updates the .ics files and also converts them to JSON using `assets/js/convert.js`. It should be run periodically to keep the website up-to-date, but I don't think it's necessary for it to be updated every time someone visits the website. The conversion to JSON strips it of many unnecessary details for privacy. When someone visits the website, their browser downloads the converted JSON and makes it into a list of shifts.
