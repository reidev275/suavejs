const { WebPart, pure } = require('./WebPart')
const { Either } = require('ramda-fantasy')

//:: Number -> String -> WebPart
const writer = code => s => 
	new WebPart(ctx =>
		pure(ctx.res.status(code).send(s))
	)

const OK = writer(200)
const CREATED = writer(201)
const NOT_FOUND = writer(404)


//:: (Request -> WebPart) -> WebPart
const request = fn => 
	new WebPart(ctx => fn(ctx.req).run(ctx)) 

const async = future =>
	new WebPart(x => Either.of(future))

module.exports = { async, OK, CREATED, NOT_FOUND, request }
