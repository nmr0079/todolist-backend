const mongoose = require('mongoose')
//monbodb as such is schema less by default, so we have to create a new schema for our data, instantiating a schema object
const Schema = mongoose.Schema

//structure of our todolist todoitem data
const todoItemSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
}, { timestamps : true})

module.exports = mongoose.model('todoitem', todoItemSchema) //model applies the schema structure to the data item