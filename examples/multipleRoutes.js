//  const R = require('ramda')
//  const { POST, GET, choose, request, then } = require('../src/filters')
//  const { OK } = require('../src/writers')
//  const { loadApp } = require('../src/bootstrap')
//  
//  //if the request is a Get returns 200 Hello GET
//  //if the request is a Post returns 200 Hello POST
//  const app = choose([
//  	R.compose( then(OK('Hello GET')), GET ),
//  	R.compose( then(OK('Hello POST')), POST )
//  ])
//  
//  loadApp(app)
