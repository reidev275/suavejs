const R = require('ramda')
const { choose, path, then } = require('../src/filters')
const { OK } = require('../src/writers')
const { loadApp } = require('../src/bootstrap')

//if the request is a Get returns 200 Hello GET
//if the request is a Post returns 200 Hello POST
const app = choose([
	R.compose( then(OK('Hello')), path('/hello') ),
	R.compose( then(OK('Goodbye')), path('/goodbye') )
])

loadApp(app)
