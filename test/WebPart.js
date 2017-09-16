const assert = require('assert')
const { WebPart } = require('../src/WebPart')

const wp = WebPart.of(x => x)

const test = (webPart, seed, expected) => done =>
	webPart.run(seed).either(
		l => done('should be a right'),
		f => f.fork(
			done,
			ok => {
				assert.equal(expected, ok)
				done()
			}
		)
	)

describe('WebPart', function() {

	describe('#map', function() {
		it('works', test(wp.map(x => x + 1), 1, 2)) 
	})
		
	describe('#concat', function() {
		it('has right identity', 
			test(wp.concat(WebPart.empty()), 1, 1)
		)
		it('has left identity', 
			test(WebPart.empty().concat(wp), 1, 1)
		)
	})
})
