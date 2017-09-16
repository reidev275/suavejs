const { path } = require('../src/filters')
const { OK } = require('../src/writers')
const { loadApp } = require('../src/bootstrap')

const application = 
	path('/hello')
		.concat(OK('Hi, how are you?'))

loadApp(application)
