import React, {useState} from 'react';
import socket from "../socket";

const Join = () => {
    const [roomId, setRoomId ] = useState('')
    const [name, setName ] = useState('')

    return (
        <div>
            <div>
                <input placeholder={'room id'} value={roomId} onChange={event => setRoomId(event.target.value)}/>
            </div>
            <div>
                <input placeholder={' name'}  value={name} onChange={event => setName(event.target.value)}/>
            </div>
            <button >
                connect
            </button>
        </div>
    );
};

export default Join;