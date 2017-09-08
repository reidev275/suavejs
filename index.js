#!/usr/bin/env node

const R = require('ramda')
const { Future, Either } = require('ramda-fantasy')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || '3000'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, function () {
	console.log(`Listening on ${port}`)
})

//:: Request -> Either 404 (Future 500 a)
const WebPart = function(request) { }

const fail = () => Either.Left(Future.of({}))
const pure = x => Either.of(Future.of(x))
const then = x => R.map(R.map(x))

//============================
// Responses
//============================

//:: String -> WebPart
const OK = s => ({req, res, next}) =>
	Either.of(Future.of(
		res.send(s)
	))


//============================
// Filters
//============================

//:: String -> WebPart
const methodFilter = method => ({req, res, next}) =>
	req.method === method
		? pure({req, res, next})
		: fail()

const GET = methodFilter('GET')
const POST = methodFilter('POST')

//============================
// Introspection
//============================

const request = fn => ({req, res, next}) => fn(req)({req, res, next})


//============================
// Branching
//============================

//[WebPart] -> WebPart
const choose = ([h, ...t]) => 
	({req, res, next}) => {
		const result = h({req, res, next})
		return result.isRight ? result : choose(t)({req, res, next})
	}

//============================
// Examples
//============================

//always returns 200 hello world
const helloWorld = OK('hello world')
//if the request is a Post returns 200 hello world
const postFilter = R.compose( 
 	then(OK('Hello Post')),
	POST
)
//returns the value from the hello body param
const params = request(x => OK(x.body.hello))
//if the request is a Post returns the value from the hello body param
const postParams = R.compose(
	then(request(x => OK(x.body.hello))),
	POST
)
//if the request is a Get returns the value of the hello querystring
const getParams = R.compose(
	then(request(x => OK(x.query.hello))),
	GET
)
//if the request is a Get returns 200 Hello GET
//if the request is a Post returns 200 Hello POST
const conditions = choose([
	R.compose( then(OK('Hello GET')), GET ),
	R.compose( then(OK('Hello POST')), POST )
])

//============================
// Bootstrap
//============================
app.use(function(req, res, next) {
	conditions({req, res, next})
		.either(
			l => res.status(404).end(),
			r => r.fork(
				err => res.status(500).end(),
				ok => res.end()
			)
		)
})
