const { loadApp } = require('./src/bootstrap')
const { OK } = require('./src/writers')
const { Method, path} = require('./src/filters')

const application = 
	path('/foo')
		.chain(Method.GET)
		.chain(OK('hello Get'))

loadApp(application)
