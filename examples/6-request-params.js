const { OK, header, request } = require('../src/writers')
const { GET } = require('../src/filters')
const { loadApp } = require('../src/bootstrap')

const app =
	GET
		.concat(
			request(x => OK({site: x.query.hello}))
		)

loadApp(app)
