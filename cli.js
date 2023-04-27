#!/usr/bin/env node

// Check dependencies 

import minimist from 'minimist'
import fetch from 'node-fetch'
import moment from 'moment-timezone'

var args = minimist(process.argv.slice(2))

if (args.h) {
    console.log(`
    Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
        -h            Show this help message and exit.
        -n, -s        Latitude: N positive; S negative.
        -e, -w        Longitude: E positive; W negative.
        -z            Time zone: uses tz.guess() from moment-timezone by default.
        -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
        -j            Echo pretty JSON from open-meteo API and exit.
    `)
    process.exit(0);
}

const timezone = moment.tz.guess();

const latitude = args.n || -args.s

var urlBuilder = "https://api.open-meteo.com/v1/forecast?latitude=";




console.log(latitude);
