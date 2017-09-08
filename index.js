#!/usr/bin/env node

const { compose } = require('ramda')
const { Future, Either } = require('ramda-fantasy')
const { loadApp } = require('./src/bootstrap')
const { OK } = require('./src/writers')
const { GET, POST, choose, path, request, then } = require('./src/filters')

const paths = choose([
	compose( then(OK('Hello')), path('/hello') ),
	compose( then(OK('Goodbye')), path('/goodbye') )
])

loadApp(paths)
