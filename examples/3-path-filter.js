const { path } = require('../src/filters')
const { OK } = require('../src/writers')
const { loadApp } = require('../src/bootstrap')

const application = 
	path('/hello')
		.chain(OK('Hi, how are you?'))

loadApp(application)
