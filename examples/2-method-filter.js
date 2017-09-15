const { Method } = require('../src/filters')
const { OK } = require('../src/writers')
const { loadApp } = require('../src/bootstrap')

const application = 
	Method.GET
		.chain(OK('Hello GET'))

loadApp(application)
