const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----
`;


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
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        author: req.payload.id,
        dateCreated: req.payload.dateCreated,
        completed: req.payload.completed,
        dateCompleted: req.payload.dateCompleted
    });
    await todo
        .save()
        .then((savedTodo) => {
            return res.status(201).json({
                id: savedTodo._id,
                title: savedTodo.title,
                content: savedTodo.description,
                author: savedTodo.author,
                dateCreated: savedTodo.dateCreated,
                completed: savedTodo.completed,
                dateCompleted: savedTodo.dateCompleted
            });
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});

router.get("/", async function (req, resp, next) {
    Todo
        .find()
        .where("author").equals(req.payload.id)
        .then(
            (todos) => {
                return resp.status(200).json(todos);
            }
        )
        .catch(
            (error) => {
                return resp.status(500).json({error: error.message});
            }
        );
});


// router.get("/", async function (req, res, next) {
//     const todos = await Todo
//         .find()
//         .where("author").equals(req.payload.id)
//         .exec();
//     return res.status(200).json({ posts: todos });
// });

module.exports = router;