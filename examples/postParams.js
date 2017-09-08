const R = require('ramda')
const { POST, request, then } = require('../src/filters')
const { OK } = require('../src/writers')
const { loadApp } = require('../src/bootstrap')

//if the request is a Post returns the value from the hello body param
const postParams = R.compose(
	then(request(x => OK(x.body.hello))),
	POST
)

loadApp(postParams)
