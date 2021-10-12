// const path = require('path')
const express = require('express')
// базовые настройки сервера на экспрессе
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.json())
// создаем элемент мап для удобства работы
const rooms = new Map()
// выдача юзеров и сообщения в комнате
app.get('/rooms/:id', (req, res) => {
    const {id: roomId} = req.params
    const obj = rooms.has(roomId) ? {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()],
    } : {users: [], messages: []}
    res.json(obj)
})
// создание или вход в существеющую комнату
app.post('/rooms', (req, res) => {
    const {roomId, name} = req.body
    if (!rooms.has(roomId)) {
        rooms.set(
            roomId,
            new Map([
                ['users', new Map()],
                ['messages', []],
            ]),
        )
    }
    res.send()
})
//
io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', ({roomId, name}) => {
        socket.join(roomId)
        rooms.get(roomId).get('users').set(socket.id, name)
        const users = [...rooms.get(roomId).get('users').values()]
        // а тут не работает нормально сокет по юрезам :(
        socket.broadcast.to(roomId).emit('ROOM:JOINED', users)
        console.log(roomId, 'eeeeea', users)
    })

    socket.on('ROOM:NEW_MESSAGE', ({roomId, name, text}) => {
        const obj = {
            name,
            text,
        };
        rooms.get(roomId).get('messages').push(obj)
        // и тут работает странно
        socket.broadcast.to(roomId).emit('ROOM:NEW_MESSAGE', obj)
    });

    socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
            if (value.get('users').delete(socket.id)) {
                const users = [...value.get('users').values()]
                //а тут вообще на шару
                socket.broadcast.to(roomId).emit('ROOM:SET_USERS', users)
            }
        });
    });
    console.log('connection', socket.id)
})
// порт нод сервера
server.listen(9000, () => {
    console.log('i`m ALIIIIVE')
})