const R = require('ramda')
const { GET, then } = require('../src/filters')
const { OK } = require('../src/writers')
const { loadApp } = require('../src/bootstrap')

const getFilter = R.compose( 
 	then(OK('Hello Post')),
	GET
)

loadApp(getFilter)
