# whenisnathanworking
Website to show when Nathan is working

This project uses [https://www.npmjs.com/package/ical2json](ical2json) and jQuery. You'll also need `curl` and preferably a way to schedule tasks (such as `crontab`) to get the backend working. (No `wget` support because I'm lazy and macOS doesn't have it)

## Specifying Calendar URLs
What you'll need to do is periodically run `whenisnathanworking.sh` and specify URLs to `.ics` files, probably on the Internet, in a `.url` file in the `cals/` directory, which you'll have to make. Each `.url` file should have exactly one URL, and nothing else. You can have more than one `.url` file, as long as they're all in the `cals/` directory. `whenisnathanworking.sh` will download `.ics` files from those URLs and promptly convert them to JSON.

## `config.json`
A file named `config.json`, placed in the same directory as the `index.html`, is *required* for the website to work chiefly because it defines which calendars to pull events from.

### `cals`
`cals` is a list of the calendars to put on the website. The names you put on there should match the `.url` files you made.

### Example
```JSON
{
    "cals": ["shifts", "events"]
}
```
