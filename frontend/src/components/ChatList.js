import React, { useState, useEffect } from 'react';

function ChatList(props) {
  const [chats, setChats] = useState([]);
  async function fetchData() {
    const response = await fetch('http://127.0.0.1:8000/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: props.leadName })
      });
  const data = await response.json();
  console.log("all chats:",data)
  setChats(data?.chat_list);
}
  useEffect(() => {
 
    fetchData();
  }, [props.leadName]);
  // console.log(chats, "chats>>>>>>>>>>..")
  return (
    <div>
      <a href={'https://calendly.com/shaheer-ahmad-1/test-meeting'} style={{ color: 'blue', textDecoration: 'underline' }}>Link for meeting</a>
      <h2>Chats for <b style={{ color: 'grey', fontSize: '28px', fontWeight: 'bold' }}>{props.name}</b></h2>
      <ul>
        {chats?.map(chat => (
          <li key={chat._id} style={{ backgroundColor: '#f5f5f5', padding: '10px', marginBottom: '10px' }} >
            <strong>Prompt:</strong> {chat.prompt}<br />
            <strong>completion:</strong> {chat.completion}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ChatList;