import React, { useState, useEffect } from "react";
import ChatList from "./ChatList";
function WebSocketTest() {
  const [socket, setSocket] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const username = localStorage.getItem('name')
  const useremail = localStorage.getItem('email')
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/chatbot");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      setResponse(event.data)
      console.log("Received message:", event.data);
    };

    ws.onerror = (event) => {
      console.error("WebSocket error:", event);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    let useremail = localStorage.getItem('email')
    const SendingData = JSON.stringify({ prompt: inputValue, email: useremail })
    socket.send(SendingData)
    var getValue= document.getElementById("name");
        if (getValue.value !="") {
            getValue.value = "";
        }
  }
  const handleChange = (e) => {
    setInputValue(e.target.value);
  }
  return (
    <div >
      <ChatList leadName={useremail} name = {username} />
      {/* <h1 style={{ display: 'flex', justifyContent: 'center' }}>Chatbot</h1> */}
      <div style={{ position: 'fixed', bottom: 0, zIndex: 9999, width: '100%' ,backgroundColor: '#E5E4E2'}}>
        <form style={{ display: 'flex', justifyContent: 'center' ,padding: '10px'}} onSubmit={handleSubmit}>
            <label  style={{ width: '100%' }}>
            
            <input type="text" id='name' value={inputValue} onChange={(e)=>setInputValue(e.target.value)}  style={{ width: '100%', padding: '10px' }}/>
            </label>
            <button type="submit">Send</button>
        </form>
        {response && <p style={{ display: 'flex', justifyContent: 'center' }}>Response: {response}</p>}
      </div>
      
    </div>
  );
}

export default WebSocketTest;
