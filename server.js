
const express = require('express')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const rooms = {
    id:[],
    name:'Vlad'
}

app.get('/vlad', (req,res) =>{
    res.json(rooms)
})

io.on('connection', socket =>{
    console.log('socket connected', socket.id)
})

server.listen(9000,()=>{
    console.log('hey')
})