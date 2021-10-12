import React, {useEffect, useRef, useState} from 'react';
import socket from '../socket';

function Chat({users, messages, name, roomId, onAddMessage}) {
    const [messageValue, setMessageValue] = useState('');
    const messagesRef = useRef(null);
// отправка сообщения
    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            name,
            roomId,
            text: messageValue,
        });
        onAddMessage({name, text: messageValue});
        setMessageValue('');
    };
//  обновление сообщений
    useEffect(() => {
        messagesRef.current.scrollTo(0, 99999);
    }, [messages]);

    return (
        <div className="chat">
            <div className="chat-users">
                Комната: <b>{roomId}</b>
                <hr/>
                <b>Онлайн : {users.length}</b>
                <ul>
                    {users.map((name, index) => (
                        <li key={name + index}>{name}</li>
                    ))}
                </ul>
            </div>
            <div className="chat-messages">
                <div ref={messagesRef} className="messages">
                    {messages.map((message) => (
                        <div  className="message">
                            {message.event === 'connection'?<div> tyta {message.name}
                            </div>: <div>
                                <p>{message.text}</p>
                                <div>
                                <span>{message.name} </span>
                                </div>
                            </div>

                            }

                        </div>
                    ))}
                </div>
                <form>
                    <textarea
                      value={messageValue}
                      onChange={(e) => setMessageValue(e.target.value)}
                      className="form-control"
                      rows="3">
                    </textarea>
                    <button onClick={onSendMessage} type="button" className="btn btn-primary">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Chat;