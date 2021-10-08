
const express = require('express')

const useSocket = require('socket.io')

const app = express()

const rooms = {
    id:[],
    name:'Vlad'
}

app.get('/vlad', (req,res) =>{
    res.json(rooms)
})

app.listen(9999,()=>{
    console.log('hey')
})