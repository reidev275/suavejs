const { compose, find, map } = require('ramda')
const { WebPart, pure, fail } = require('./WebPart') 

//:: Method -> WebPart
const methodFilter = method => 
	new WebPart(context =>
		context.req.method === method
			? pure(context)
			: fail(context)
	)

const GET = methodFilter('GET')
const PUT = methodFilter('PUT')
const POST = methodFilter('POST')
const DELETE = methodFilter('DELETE')


//:: String -> WebPart
const path = p => 
	new WebPart(context =>
		context.req.path === p
			? pure(context)
			: fail(context)
	)

//:: [WebPart] -> WebPart
const choose = webParts => 
	new WebPart(context => {
		const match = find(x => x.run(context).isRight, webParts)
		return match
				? match.run(context)
				: fail(context)
	})

module.exports = { choose, GET, PUT, POST, DELETE, methodFilter, path }
