const { Method, request } = require('../src/filters')
const { OK } = require('../src/writers')
const { loadApp } = require('../src/bootstrap')

//if the request is a Get, it returns the value of the hello querystring
const application =
	Method.GET
		.chain(request(x => OK(x.query.hello)))

loadApp(application)
