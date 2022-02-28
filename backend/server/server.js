const express = require('express')
const app = express()
const Routes = require('./routes.js')

const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

app.use('/', Routes)

io.on('connection', (socket)=>{
    console.log('a user connected')
    socket.on("newMessage", function(data){
        socket.emit('newMessageReceived', data)
        socket.broadcast.emit('newMessageReceived', data)
        console.log(data)
    })

})
server.listen(8000, ()=>{
    console.log('server rodando')

})