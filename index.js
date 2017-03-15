var express = require('express')
// app variable used to listen for HTTP request
// start server
var app = express()
var bodyParser = require('body-parser')

app.set('view engine', 'ejs')
// USE MIDDLEWARE
// where data is placed with forms--need below to retrieve and just parses to strings etc for you!!!!!!!!!
app.use(bodyParser())

var todos = ["eat", "sleep", "build a crud app"]

var instructor = "Yvonne"

// when user makes request to '/' then callback function runs
app.get('/', function(request, response){
	response.render('hello', 
		{instructorName: instructor})
})

app.get('/person/:name', function(req,res){
	var name = req.params.name
	res.send('Hi ' + name)
	})

app.get('/first-name', function(req,res){
	res.render('first', 
		{firstName: instructor})
})

app.get('/add', function(req,res){
	// URL parameters --> request.params
	// query values --> request.query
	var x = req.query.var1
	var y = req.query.var2
	if (isNaN(x) || isNaN(y)) {
		res.send("The input is invalid.")
	}
	var results = parseInt(x) + parseInt(y)
	res.send(results.toString())

})

app.get('/todos', function(req, res){
	res.render('todos', 
		{todos})
})

app.post('/todos', function(req, res){
	var newToDo = req.body.newtodo
	if (!todos.includes(newToDo)){
		todos.push(newToDo)
		res.redirect('/todos')
}})

app.post('/todos/:index', function(req, res){
	var toRemove = req.params.index
	todos.splice(toRemove, 1)
	res.redirect('/todos')
})

app.get('/todos/new', function(req, res){
	res.render('todos-new')
})

app.get('/add/:var1/:var2', function(request, response){
	var x = request.params.var1
	var y = request.params.var2
	if (isNaN(x) || isNaN(y)) {
		response.send("The input is invalid.")
	}
	var results = parseInt(x) + parseInt(y)
	response.send(results.toString())
})

app.get('/subtract/:var1/:var2', function(request, response){
	var x = request.params.var1
	var y = request.params.var2
	var results = parseInt(x) - parseInt(y)
	results = results.toString()
	response.send(results)
})

app.get('/multiple/:var1/:var2', function(request, response){
	var x = request.params.var1
	var y = request.params.var2
	var results = parseInt(x) * parseInt(y)
	results = results.toString()
	response.send(results)
})

app.get('/divide/:var1/:var2', function(request, response){
	var x = request.params.var1
	var y = request.params.var2
	if (y == '0'){
		response.send ("you cannot divide by 0. math is hard.")
	}
	var results = parseInt(x)/parseInt(y)
	results = results.toString()
	response.send(results)
})

app.get('/yvonne', function(req,res){
	res.send('Hello Yvonne!')
})

app.get('/login', function(req,res){
	res.render('login')
})

app.post('/login', function(req,res){
	// res.send(req.body)
	res.redirect('/welcome')
})

app.get('/welcome', function(req,res){
	res.send("You are now logged in!")
})

app.listen(3000, function(){
	console.log('Running on 3000')
})