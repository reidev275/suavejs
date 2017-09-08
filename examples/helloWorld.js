const { loadApp } = require('../src/bootstrap')
const { OK } = require('../src/writers')

const helloWorld = OK('hello world')

loadApp(helloWorld)
