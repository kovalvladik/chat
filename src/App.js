import React, {useEffect, useReducer} from 'react';
import Join from "./components/Join";
import socket from "./socket";
import reducer from "./reducer";
import axios from "axios";
import Chat from "./components/Chat";


function App() {
    // начальный стейт
    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        name: null,
        users: [],
        messages: [],
        time: null,
    });

    const onLogin = async (obj) => {
        dispatch({
            type: 'JOINED',
            payload: obj,
        });
        socket.emit('ROOM:JOIN', obj);
        //тут прихлдят данные по юзерам и сообщениям
        const {data} = await axios.get(`/rooms/${obj.roomId}`);
        dispatch({
            type: 'SET_DATA',
            payload: data,
        });
    };
//
    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users,
        });
    };
// добавление сообщения
    const addMessage = (message) => {
        dispatch({
            type: 'NEW_MESSAGE',
            payload: message,
        });
    };
// сетаем юзеров и сообщения при монтировании
    useEffect(() => {
        socket.on('ROOM:SET_USERS', setUsers);
        socket.on('ROOM:NEW_MESSAGE', addMessage);
    }, []);

    window.socket = socket;

    return (
        <div className="wrapper">
            {!state.joined ? <Join onLogin={onLogin}/> : <Chat {...state} onAddMessage={addMessage}/>}
        </div>

    );
}

export default App;
