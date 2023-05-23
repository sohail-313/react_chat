import './App.css';
import Chat from './Chat'
import io from "socket.io-client"
import { useState } from "react"
const socket = io.connect("http://localhost:3001");

function App() {
  const [user, setUserName] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [isLog, setLog] = useState(false);
  const joinRoom = () => {
    if (user !== "" && roomNo !== "") {
      socket.emit('join_room', roomNo);
      setLog(true);
    }
  }

  return (
    <div className="App">

     { isLog === false ? (<div className='login_page'>
        <input
          type="text"
          placeholder='your Name...'
          onChange={(event) => {
            setUserName(event.target.value)
          }}
        />
        <input
          type="text"
          placeholder='Room No...'
          onChange={(event) => {
            setRoomNo(event.target.value)
          }}
        />

        <button onClick={joinRoom}>Join A Room</button>
      </div>)
        : (<Chat  socket={socket} room ={roomNo} username ={user}/>)
}
    </div>
  );
}

export default App;
