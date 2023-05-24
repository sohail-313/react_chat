import React, { useState, useEffect } from 'react'
const Chat = ({ socket, room, username }) => {

    const [userMsg, setCurrentMesssage] = useState("");
    const [msgList, setMsgList] = useState([]);

    const sendMessage = () => {
        if (userMsg !== "") {
            const messageData = {
                room: room,
                author: username,
                message: userMsg
            }

            socket.emit('send_message', messageData);
            setMsgList((list) =>
                [...list, messageData]
            )
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMsgList((list) => [...list, data]);
        });
    },[]);

    return (
        <div>
            <div className='message_window'>
                <div className="chat-header">
                    <p>Live Chat</p>
                </div>

                <div>
                    {msgList.map((messageContent) => {
                        return (
                            <p>{messageContent.author} : {messageContent.message}</p>
                        )
                    })}
                </div>
            </div>
            <input
                type="text"
                placeholder='message'
                onChange={(event) => {
                    setCurrentMesssage(event.target.value);
                }}
            />

            <button onClick={sendMessage}>&#9658;</button>

        </div>
    )
}

export default Chat
