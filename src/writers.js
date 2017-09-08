const { Future, Either } = require('ramda-fantasy')

//:: Number -> String -> WebPart
const writer = code => s => ({req, res, next}) =>
	Either.of(Future.of(res.status(code).send(s)))

const OK = writer(200)
const CREATED = writer(201)
const NOT_FOUND = writer(404)

module.exports = { OK, CREATED, NOT_FOUND }
