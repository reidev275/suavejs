const { compose, map } = require('ramda')
const { Either, Future } = require('ramda-fantasy')

const pure = compose(Either.of, Future.of)
const fail = compose(Either.Left, Future.of)
const never = x => fail

//:: Request -> Either 404 (Future 500 a)
const WebPart = function(fn) {
	if (!(this instanceof WebPart)) {
		return new WebPart(fn)
	}
	this.fn = fn
}

WebPart.prototype['@@type'] = 'panache/WebPart'

WebPart.prototype.map = function(f) {
	const wp = this
	return new WebPart(compose(map(map(f)), wp.fn))
}

//a -> Either 404 (Future 500  b) -> Either 404 (Future 500 b)
WebPart.prototype.chain = function(f) {
	const wp = this

	return new WebPart(req => {
		let result
		wp.fn(req).either(
			err => result = fail(err),
			future => future.fork(
				err => result = pure(err),
				ctx => {
					result = f.run(ctx)
				}
			)
		)
		return result
	})
}

WebPart.prototype.run = function(req) {
	const wp = this
 	return wp.fn(req)
}

WebPart.of = function(f) {
	return new WebPart(compose(pure, f))
}

module.exports = { WebPart, pure, fail }
