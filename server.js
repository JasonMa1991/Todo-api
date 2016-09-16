var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000

var bodyParser = require("body-parser")

var _ = require("underscore")

var todos = []
var todo_next_id = 1

app.use(bodyParser.json())

app.get("/", function (req, res){
	res.send("Todo API Root")
})

app.get("/todos", function (req, res){
	res.json(todos)
})

app.get("/todos/:id", function (req, res){
	var todo_id = parseInt(req.params.id)

	var found = _.findWhere(todos, {id: todo_id})

	if (found) {
		res.send(found)
	}
	else { res.status(404).send() }
})

app.post("/todos", function (req, res){
	var body = req.body

	body.id = todo_next_id
	todo_next_id += 1
	todos.push(body)

	res.json(body)
})

app.listen(PORT, function(){
	console.log("Express listening on port " + PORT + "!")
})