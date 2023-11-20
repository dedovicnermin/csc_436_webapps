const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const privateKey = process.env.JWT_PRIVATE_KEY;


router.use(function (req, resp, next) {
    if (req.header("Authorization")) {
        try {
            req.payload = jwt.verify(req.header("Authorization"), privateKey, {
                algorithms: ["RS256"]
            });
            next();
        } catch (error) {
            return resp.status(401).json({error: error.message});
        }
    } else {
        return resp.status(401).json({error: "Authorization header missing."});
    }
});




router.post("/", async function (req, res) {
    console.log("HIT : CREATE_TODO : %s", JSON.stringify(req.body));
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        dateCreated: req.body.dateCreated,
        completed: req.body.completed,
        dateCompleted: req.body.dateCompleted
    });
    await todo
        .save()
        .then((savedTodo) => {
            console.log("RETURN : CREATE_TODO : savedTodo (%s)", JSON.stringify({id: savedTodo._id, title: savedTodo.title, description: savedTodo.description, author: savedTodo.author, dateCreated: savedTodo.dateCreated, completed: savedTodo.completed, dateCompleted: savedTodo.dateCompleted }));
            return res.status(201).json({
                id: savedTodo._id,
                title: savedTodo.title,
                description: savedTodo.description,
                author: savedTodo.author,
                dateCreated: savedTodo.dateCreated,
                completed: savedTodo.completed,
                dateCompleted: savedTodo.dateCompleted
            });
        })
        .catch((error) => {
            console.log("RETURN : CREATE_TODO : ERROR - %s",error.message);
            return res.status(500).json({ error: error.message });
        });
});

router.get("/", async function (req, resp, next) {
    console.log("HIT : GET_TODOS : " + JSON.stringify(req.body));
    Todo
        .find()
        .where("author").equals(req.payload.id)
        .then(
            (todos) => {
                console.log("RETURN : GET_TODOS : " + JSON.stringify(todos.map((todo) => {
                    return {id: todo._id, title: todo.title, description: todo.description, author: todo.author, dateCreated: todo.dateCreated, completed: todo.completed, dateCompleted: todo.dateCompleted}
                })));
                return resp.status(200).json(todos.map((todo) => {
                    return {id: todo._id, title: todo.title, description: todo.description, author: todo.author, dateCreated: todo.dateCreated, completed: todo.completed, dateCompleted: todo.dateCompleted}
                }));
            }
        )
        .catch(
            (error) => {
                console.log("RETURN : GET_TODOS : ERROR - %s", error.message)
                return resp.status(500).json({error: error.message});
            }
        );
});


router.delete("/:id", async function (req, resp) {
    console.log("HIT : DELETE_TODO : (%s) : (%s)", JSON.stringify(req.body), JSON.stringify(req.params));
    Todo
        .findByIdAndDelete(req.params.id)
        .where("author").equals(req.payload.id)
        .then(
            (deletedTodo) => {
                console.log("RETURN : DELETE_TODO : Deleted data (%s)", JSON.stringify(deletedTodo));
                return resp.status(200).json(deletedTodo)
            }
        )
        .catch(
            (error) => {
                console.log("RETURN : DELETE_TODO : ERROR - %s", error.message);
                return resp.status(500).json({error: error.message});
            }
        );
});


router.put("/:id", async function (req, resp) {
   console.log("HIT : UPDATE_TODO : Body (%s) : ReqParams (%s)", JSON.stringify(req.body), JSON.stringify(req.params));
   Todo
       .findByIdAndUpdate(req.params.id, req.body)
       .where("author").equals(req.payload.id)
       .then(
           (todoUpdate) => {
               console.log("RETURN : UPDATE_TODO : Data (%s)", JSON.stringify(todoUpdate))
               return resp.status(200).json(todoUpdate);
           }
       )
       .catch(
           (error) => {
               console.log("RETURN : UPDATE_TODO : ERROR - %s", error.message);
               return resp.status(500).json({error: error.message});
           }
       );
});


module.exports = router;