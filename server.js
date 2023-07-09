//dotenv is a package  that loads the environment variables from a .env file into the process.env object-available to us globally
//in a nodejs environment
require('dotenv').config()
//entry point for the backend folder
const express = require('express')
const todoroutes = require('./routes/todos')
const mongoose = require('mongoose')

//creating an instance of an express app
const app = express()


//middleware for post,patch requests,for accessing the data send to the server
app.use(express.json())
//What it does is any request that comes in it looks if it has some body to the request(some data that we are sending to the server), if it does
//then it passes it and attaches it to the request object so that we can access it in the request handler

//global middleware, next is a function which has to be run at the end of this middleware inorder to move onto the next middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//route handler for reacting to the listening, req - request object which has the info about the request
//res - response object used for sending a response back to the browser or the client
//app.use(todoroutes)  //takes all the routes from the todoroutes and uses them here
app.use('/api/todolist', todoroutes)  //only fire the routes when we come accross the path /api/todolist
//that is when a request is fired to the above path,then we fire all the routes

//connect to db, asynchronous in nature
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listening for requests, only when we are connected to the database
    app.listen(process.env.PORT, ()=>{
         console.log('Connected to DB and listening to the port 4000')
    })

})
.catch((error) => {
    console.log(error)
})


//middleware - it's a code that executes between us getting a request on the server and us sending a response 