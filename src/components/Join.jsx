import React, {useState} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom'
const Join = ({onLogin}) => {
    const [roomId, setRoomId] = useState('')
    const [name, setName] = useState('')
    const [isLoading, setLoading] = React.useState(false);
// проверка на пустые поля и пост запрос на сервер
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
        <div className="join-block">
            <div>
                <input placeholder={'room id'} value={roomId} onChange={event => setRoomId(event.target.value)}/>
            </div>
            <div>
                <input placeholder={' name'} value={name} onChange={event => setName(event.target.value)}/>
            </div>
            <button disabled={isLoading} onClick={onEnter} className="btn btn-success"
                    component={Link} to={`/room/${roomId}`} >
                {isLoading ? 'Вход...' : 'Войти'}

            </button>
        </div>
    );
};

export default Join;