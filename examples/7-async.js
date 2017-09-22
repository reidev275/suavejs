const { async, OK, request } = require('../src/writers')
const { GET } = require('../src/filters')
const { loadApp } = require('../src/bootstrap')
const { Future, Either } = require('ramda-fantasy')
const { WebPart } = require('../src/WebPart')
const got = require("got")

const getF = url => Future((reject, resolve) => 
	    got(url)
	        .then(res => resolve(res.body))
	        .catch(reject)
)

const app =
	GET
		.concat(
			async(getF('https://google.com'))
		)

loadApp(app)
