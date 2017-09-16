const { GET, POST, choose, path } = require('../src/filters')
const { OK } = require('../src/writers')
const { loadApp } = require('../src/bootstrap')


const cars = path('/cars')
	.concat(choose([
		POST.concat(OK('Adding Car')),
		GET.concat(OK('Getting Cars'))
	]))

const people = path('/people')
	.concat(choose([
		POST.concat(OK('Adding Person')),
		GET.concat(OK('Getting People'))
	]))

const app = choose([
	cars,
	people
])

loadApp(app)
