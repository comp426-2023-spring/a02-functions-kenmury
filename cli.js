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

if (!args.n && !args.s) {
    console.log("Latitude must be in range.")
    process.exit(0);
}

if (!args.e && !args.w) {
    console.log("Longitude must be in range.")
    process.exit(0);
}

const timezone = args.z || moment.tz.guess();

const latitude = args.n || -args.s

const longitude = args.e || -args.w;

var day = 1;

if (!(typeof args.d == 'undefined')) {
    day = args.d
}

var urlBuilder = "https://api.open-meteo.com/v1/forecast?latitude=";

var urlBuilder = urlBuilder + latitude + '&longitude=' + longitude + 
                 '&daily=precipitation_hours&timezone=' + timezone

const response = await fetch(urlBuilder)

const data = await response.json()

if (args.j) {
    console.log(data)
    process.exit(1)
}

var days = "tomorrow"

if (day == 0) {days = "today"}
if (day > 1) {days = `in ${day} days`}

if (data['daily']['precipitation_hours'][day] > 0) {
    console.log(`You will need your galoshes ${days}`);
}

if (data['daily']['precipitation_hours'][day] == 0) {
    console.log(`You will not need your galoshes ${days}`);
}