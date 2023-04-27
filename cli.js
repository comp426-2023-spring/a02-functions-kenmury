#!/usr/bin/env node

// Check dependencies 

import minimist from 'minimist'
import fetch from 'node-fetch'
import moment from 'moment-timezone'

var args = minimist(process.argv.slice(2))



console.log(args);
