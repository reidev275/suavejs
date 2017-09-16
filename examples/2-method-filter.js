const { GET } = require('../src/filters')
const { OK } = require('../src/writers')
const { loadApp } = require('../src/bootstrap')

const application = 
	GET.concat(OK('Hello GET'))

loadApp(application)
