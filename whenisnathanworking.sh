#!/bin/bash
# downloads calendars and exports as json

cd "$(dirname "$0")"

# check for ical2json
if ! [[ -a $(which ical2json) ]]; then
    echo "Error: ical2json not found. Run \`npm install -g ical2json\` to install it."
    exit 1
fi

# create cal directory if not already present even though it's probably there
if ! [[ -d ./cals/ ]]; then
    mkdir ./cals
fi

# download and convert the calendars
if [[ -a $(which curl) ]]; then
    if [[ -z $(ls cals/*.url) ]]; then
        echo "No URLs found to download. See README for help."
        exit 1
    fi
    for url in cals/*.url; do
        echo "Downloading ${url%.*}.ics"
        curl -o "${url%.*}.ics" -s $(cat $url)
        ical2json "${url%.*}.ics"
    done
else
    echo "Error: sorry but you need curl for this one."
    exit 1
fi
