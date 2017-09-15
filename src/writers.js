const { WebPart, pure } = require('./WebPart')

//:: Number -> String -> WebPart
const writer = code => s => 
	new WebPart(ctx =>
		pure(ctx.res.status(code).send(s))
	)


const OK = writer(200)
const CREATED = writer(201)
const NOT_FOUND = writer(404)

module.exports = { OK, CREATED, NOT_FOUND }
