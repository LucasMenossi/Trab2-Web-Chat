  
const express = require("express")
const routes = express.Router()

const MessageController = require("./controller/MessageController")

routes.get("/messages/:user/:friend", MessageController.findAllMessages)
routes.post("/messages/:user/:friend", MessageController.store)

module.exports = routes