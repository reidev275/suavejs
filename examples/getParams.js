const R = require('ramda')
const { GET, request, then } = require('../src/filters')
const { OK } = require('../src/writers')
const { loadApp } = require('../src/bootstrap')

//if the request is a Get returns the value of the hello querystring
const getParams = R.compose(
	then(request(x => OK(x.query.hello))),
	GET
)

loadApp(getParams)
