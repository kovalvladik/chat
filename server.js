const express = require('express')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.json())

const rooms = new Map();

app.get('/rooms/:id', (req, res) => {
    const {id: roomId} = req.params;
    const obj = rooms.has(roomId) ? {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()],
    } : {users: [], messages: []};
    res.json(obj);
});

app.post('/rooms', (req, res) => {
    const {roomId, name} = req.body;
    if (!rooms.has(roomId)) {
        rooms.set(
            roomId,
            new Map([
                ['users', new Map()],
                ['messages', []],
            ]),
        );
    }
    res.send();
});

io.on('connection', (socket) => {
    socket.on('room:join', (data) => {
        socket.join(data.roomId)
        rooms.get(data.roomId).get('users').set(socket.id, data.name)
        const users = [...rooms.get(data.roomId).get('users').values()]
        socket.to(data.roomId).broadcast.emit('ROOM:JOINED',users)
    })
    console.log('connection', socket.id)
})

server.listen(9000, () => {
    console.log('hey')
})