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

//:: String -> WebPart
const OK = s => ({req, res, next}) =>
	Either.of(Future.of(
		res.send(s)
	))

//:: String -> WebPart
const methodFilter = method => ({req, res, next}) =>
	req.method === method
		? pure({req, res, next})
		: fail()

const GET = methodFilter('GET')
const POST = methodFilter('POST')

const request = fn => ({req, res, next}) => fn(req)({req, res, next})

//[WebPart] -> WebPart
const choose = ([h, ...t]) => 
	({req, res, next}) => {
		const result = h({req, res, next})
		return result.isRight ? result : choose(t)({req, res, next})
	}
		
const helloWorld = OK('hello world')
const postFilter = R.compose( 
 	then(OK('Hello Post')),
	POST
)
const params = request(x => OK(x.body.hello))
const postParams = R.compose(
	then(request(x => OK(x.body.hello))),
	POST
)
const getParams = R.compose(
	then(request(x => OK(x.query.hello))),
	GET
)
const conditions = choose([
	R.compose( then(OK('Hello GET')), GET ),
	R.compose( then(OK('Hello POST')), POST )
])

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
