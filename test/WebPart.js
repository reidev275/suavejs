const assert = require('assert')
const { WebPart } = require('../src/WebPart')

const wp = WebPart.of(x => x)

describe('WebPart', function() {
	describe('#map', function() {
		it('works', function(done) {
			const actual = wp.map(x => x + 1)
			actual.run(1).either(
				l => done('should be a right'),
				f => f.fork(
					err => done(err),
					ok => {
						assert.equal(2, ok)
						done()
					}
				)
			)
		})
	})

	describe('#chain', function() {
		it('returns correct values given pure', function(done) {
			const actual = wp.chain(WebPart.of(x => x.length))
			actual.run('foo').either(
				l => done('should be a right'),
				f => f.fork(
					err => done(err),
					ok => {
						assert.equal(3, ok)
						done()
					}
				)
			)
		})
	})
})
