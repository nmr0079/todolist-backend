const express = require('express')
const {
    createtodoItem,
    gettodoItem,
    gettodoList, 
    deleteItem,
    updateItem
} = require('../controllers/todoItemController')


//creating an instance of the router
const router = express.Router()
//attaching a handler to the router object
//all the todos entered will be shown when they hit the root domain /api/todolist
router.get('/', gettodoList)

//Get a single todo
router.get('/:id', gettodoItem)

//to create a new todo item
//for a post or patch request, we are sending data to the server
router.post('/', createtodoItem)

//to delete a todo item
router.delete('/:id', deleteItem)

//to update a todo item
router.patch('/:id', updateItem)

module.exports = router

