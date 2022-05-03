const express = require('express')
const app = express()
const Routes = require('./routes.js')

const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

app.use('/', Routes)
let usuarios = []
io.on('connection', (socket)=>{
    
    socket.on('disconnect', function() {
        console.log('Got disconnect!');

        usuarios = usuarios.filter(x=>{
            return x.id!=socket.id
        }) 
        
        socket.emit('newConnected', {person: 'you', id: socket.id, users: usuarios})
        io.emit('newConnected', {person: 'other', id: socket.id, users: usuarios})

        });
    
    if(usuarios.indexOf(element => element.id == socket.id)==-1){
        usuarios = [...usuarios, {id:socket.id, name:''}]
    }
    
    console.log(usuarios)
    console.log('a user connected - '+socket.id)


    socket.emit('newConnected', {person: 'you', id: socket.id, users: usuarios})
    io.emit('newConnected', {person: 'other', id: socket.id, users: usuarios})
    

    socket.on("newMessage", function(data){
        io.emit('newMessageReceived', data)
        console.log(data)
    })

    socket.on("changeName", function(data){
        usuarios.forEach((x, index)=>{
            if(x.id==socket.id){
                console.log(index)
                usuarios[index].name = data.newName
            }
        

        })
        socket.emit('newConnected', {person: 'you', id: socket.id, users: usuarios})
        io.emit('newConnected', {person: 'other', id: socket.id, users: usuarios})


        console.log(usuarios)
    })
    //teste

})
server.listen(8000, ()=>{
    console.log('server rodando')

})