const { Future, Either } = require('ramda-fantasy')
const { map } = require('ramda')

//:: Request -> Either 404 (Future 500 a)
const WebPart = function(request) { }
const fail = () => Either.Left(Future.of({}))
const pure = x => Either.of(Future.of(x))
const then = x => map(map(x))

//:: String -> WebPart
const methodFilter = method => ({req, res, next}) =>
	req.method === method
		? pure({req, res, next})
		: fail()

const GET = methodFilter('GET')
const POST = methodFilter('POST')

const path = p => ({req, res, next}) =>
	req.path === p
		? pure({req, res, next})
		: fail()

//[WebPart] -> WebPart
const choose = ([h, ...t]) => 
	({req, res, next}) => {
		if (h) {
			const result = h({req, res, next})
			return result.isRight ? result : choose(t)({req, res, next})
		} else {
			return fail()
		}
	}

const request = fn => ({req, res, next}) => fn(req)({req, res, next})

module.exports = { GET, POST, choose, path, request, then }
