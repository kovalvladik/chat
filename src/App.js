import React from 'react';
import io from 'socket.io-client'


function App() {
    const socket =()=>{
        io('http://localhost:9000',{ transports : ['websocket'] })
    }

    return (
        <h1 className="App">
            hello im ui

            <button onClick={socket}>
                connect
            </button>
        </h1>

    );
}

export default App;
