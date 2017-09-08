const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || '3000'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, function () {
	console.log(`Listening on ${port}`)
})

const loadApp = webPart =>
	app.use(function(req, res, next) {
		webPart({req, res, next})
			.either(
				l => res.status(404).end(),
				r => r.fork(
					err => res.status(500).end(),
					ok => res.end()
				)
			)
	})

module.exports = { loadApp }
