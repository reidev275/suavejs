const { GET, POST, choose } = require('../src/filters')
const { OK } = require('../src/writers')
const { loadApp } = require('../src/bootstrap')

//if the request is a Get returns 200 Hello GET
//if the request is a Post returns 200 Hello POST
const app = choose([
	POST.concat(OK('Hello POST')),
	GET.concat(OK('Hello GET')),
])

loadApp(app)
