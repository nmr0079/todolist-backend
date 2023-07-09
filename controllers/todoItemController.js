const todoitem = require('../models/todoModel')
const mongoose = require('mongoose')

//get all todo items
const gettodoList = async (req, res) => {
    const todoItems = await todoitem.find({}).sort({createdAt: -1})
    res.status(200).json(todoItems)
}


//get a single todoitem
const gettodoItem  = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {  //if the id (which is supposed to be 12 bit) is not valid
        return res.status(404).json({error: 'Invalid ID error'})
    }

    const todoItem =  await todoitem.findById(id)

    if(!todoItem){
        return res.status(404).json({error: 'No such todo item enterd'})
    }

    res.status(200).json(todoItem)
}

//create a new todo item
const createtodoItem = async (req, res) => {
    const {title, description} = req.body

    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }

    if(!description){
        emptyFields.push('description')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    //add doc to db
    try {
        const todoItem = await todoitem.create({title,description})
        res.status(200).json(todoItem)  //if the post was a success
    } catch (error) {
        res.status(400).json({error : error.message})
    }
    res.json({mssg : 'Post a new todo item'})
}
// delete an item
const deleteItem = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {  //if the id (which is supposed to be 12 bit) is not valid
        return res.status(404).json({error: 'Invalid ID error'})
    }

    const todoItem = await todoitem.findOneAndDelete({_id: id})

    if(!todoItem){
        return res.status(404).json({error: 'No such todo item found'})
    }

    res.status(200).json(todoItem)


}

//update an item
const updateItem = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {  //if the id (which is supposed to be 12 bit) is not valid
        return res.status(404).json({error: 'Invalid ID error'})
    }

    const todoItem = await todoitem.findOneAndUpdate({_id: id},{ ...req.body })

    if(!todoItem){
        return res.status(404).json({error: 'No such todo item found'})
    }

    res.status(200).json(todoItem)

}

module.exports = {
    createtodoItem,
    gettodoItem,
    gettodoList,
    deleteItem,
    updateItem
}