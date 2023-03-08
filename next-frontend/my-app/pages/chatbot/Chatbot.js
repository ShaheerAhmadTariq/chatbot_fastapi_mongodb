import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import ChatList from "pages/chatbot/ChatList";
import { useState, useEffect } from "react";
function Chatbot() {
    const [socket, setSocket] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [response, setResponse] = useState('');
    const [useremail, setUseremail] = useState('');
    const [chatListKey, setChatListKey] = useState(0);
    // const username = typeof window !== 'undefined' ? localStorage.getItem('name') : null
    // const useremail = typeof window !== 'undefined' ? localStorage.getItem('email') : null
    useEffect(() => {
        setUseremail(localStorage.getItem('email'))
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
        // 
        const SendingData = JSON.stringify({ prompt: inputValue, email: useremail })
        socket.send(SendingData)
        var getValue = document.getElementById("name");
        if (getValue.value != "") {
            getValue.value = "";
        }
        setChatListKey(chatListKey + 1);
    }
    const handleChange = (e) => {
        setInputValue(e.target.value);
    }
    return (
        <div >
            <ChatList leadName={'useremail'} name={'username'} key={chatListKey} />
            
            <div style={{ position: 'fixed', bottom: 0, zIndex: 9999, width: '100%', backgroundColor: '#E5E4E2' }}>
                <form style={{ display: 'flex', justifyContent: 'center', padding: '10px' }} onSubmit={handleSubmit}>
                    <label style={{ width: '100%' }}>

                        <input type="text" id='name' value={inputValue} onChange={(e) => setInputValue(e.target.value)} style={{ width: '100%', padding: '10px' }} />
                    </label>
                    <button type="submit">Send</button>
                </form>
                {response && <p style={{ display: 'flex', justifyContent: 'center' }}>Response: {response}</p>}
            </div>

        </div>
    );
}

export default Chatbot;
