const { loadApp } = require('../src/bootstrap')
const { OK } = require('../src/writers')

const application = OK('hello world')

loadApp(application)
