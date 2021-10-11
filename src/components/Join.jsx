import React, {useState} from 'react';
import socket from "../socket";
import axios from "axios";

const Join = ({onLogin}) => {
    const [roomId, setRoomId] = useState('')
    const [name, setName] = useState('')
    const [isLoading, setLoading] = React.useState(false);

    const onEnter = async () => {
        if (!roomId || !name) {
            return alert('Неверные данные');
        }
        const obj = {
            roomId,
            name,
        };
        setLoading(true);
        await axios.post('/rooms', obj);
        onLogin(obj);
    };

    return (
        <div>
            <div>
                <input placeholder={'room id'} value={roomId} onChange={event => setRoomId(event.target.value)}/>
            </div>
            <div>
                <input placeholder={' name'} value={name} onChange={event => setName(event.target.value)}/>
            </div>
            <button disabled={isLoading} onClick={onEnter} >
                {isLoading ? 'Вход...' : 'Войти'}

            </button>
        </div>
    );
};

export default Join;