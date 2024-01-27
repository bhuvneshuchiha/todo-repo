const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json())

let todoArray = [];

class Todo {
  static id = 0;
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.id = Todo.getNextId();

  }

  static currentId = 1;

  static getNextId() {
    return Todo.currentId++;
  }

  makeObject() {
    const obj = {
      "title": this.title,
      "description": this.description,
      "id": this.id
    }
    return obj;
  }

}
// POST REQUEST
app.post("/todos", function(req, res) {

  const todoBody = req.body;

  todoItem = new Todo(todoBody.title, todoBody.description);
  todoObject = todoItem.makeObject();
  todoArray.push(todoObject);
  res.status(200).json({
    "message": "Todo item has been successfully added!"
  })

})

app.get("/", function(req, res) {
  res.send("HI THERE, WELCOME TO DO LIST APP")
})

//GET REQUEST

app.get("/todos", function(req, res) {

  res.status(200).json({
    "allTodoItems": todoArray
  })


})

// GET BY id'

app.get("/todos/:id", function(req, res) {

  const queryId = req.params.id;
  let found = false;
  for (let i = 0; i < todoArray.length; i++) {
    if (todoArray[i].id == queryId) {
      found = true;
      res.status(200).json({
        "todo with id ": todoArray[i]
      })
      break;
    }
  }
  if (!found) {
    res.status(404).json({
      "message": "Item with that id does not exist"
    })
  }

})

//PUT request 

app.put("/todos/:id", function(req, res) {

  const queryId = req.params.id;
  const obj = req.body;

  for (let i = 0; i < todoArray.length; i++) {
    if (todoArray[i].id == queryId) {
      todoArray[i].title = obj.title;
      todoArray[i].description = obj.description;
      res.status(200).json({
        "message": "successfully Updated"
      })
    }
    else {
      res.status(404).json({
        "message": "Could not be updated"
      })
    }
  }

})

//DELETE request

app.delete("/todos/:id", function(req, res) {

  const id = req.params.id;
  if (todoArray.length >= 1) {
    for (let i = 0; i < todoArray.length; i++) {
      if (todoArray[i].id == id) {
        todoArray.splice(i, 1);
        res.status(200).json({
          "message": "successfully Deleted"
        })
      }
    }
  }
  else {
    res.status(404).json({
      "message": "No such entries present"
    })
  }
}
)

app.listen(3000);









