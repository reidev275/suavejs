const { compose, map } = require('ramda')
const { WebPart, pure, fail } = require('./WebPart') 

//:: Method -> WebPart
const methodFilter = method => 
	new WebPart(context =>
		context.req.method === method
			? pure(context)
			: fail(context)
	)


const Method = 
	{ GET : methodFilter('GET')
	, PUT : methodFilter('PUT')
	, POST : methodFilter('POST')
	, DELETE : methodFilter('DELETE')
	}


//:: String -> WebPart
const path = p => 
	new WebPart(context =>
		context.req.path === p
			? pure(context)
			: fail(context)
	)

//[WebPart] -> WebPart
// const choose = ([h, ...t]) => 
// 	({req, res, next}) => {
// 		if (h) {
// 			const result = h({req, res, next})
// 			return result.isRight ? result : choose(t)({req, res, next})
// 		} else {
// 			return fail
// 		}
// 	}
// 
// const request = fn => ({req, res, next}) => fn(req)({req, res, next})

module.exports = { Method, methodFilter, path }
