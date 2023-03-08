import { useState, useEffect } from 'react';

function ChatList(props) {
  const [chats, setChats] = useState([]);
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  useEffect(() => {
    setUsername(localStorage.getItem('name'));
    setUseremail(localStorage.getItem('email'));

    if (!username || !useremail) {
      console.log("redirect for getting data from local storage")
      // const mainURL = window.location.origin;
      // window.location.href = "Chatbot";
    } else {
      console.log('do not redirect')
      fetchData();
    }
  },[username])
  async function fetchData() {
    const response = await fetch('http://127.0.0.1:8000/chats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: useremail })
    });
    const data = await response.json();
    console.log("all chats:", data)
    setChats(data?.chat_list);
  }
  // useEffect(() => {

    
  // }, [username]);
  // console.log(chats, "chats>>>>>>>>>>..")
  return (
    
    <div>
      <h2>Chats for <b style={{ color: 'grey', fontSize: '28px', fontWeight: 'bold' }}>{props.name}</b></h2>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {chats?.map(chat => (
          <li key={chat._id} style={{ display: 'flex', justifyContent:  'flex-start', marginTop: '50px' }}>
            <div style={{ backgroundColor:  '#fff', borderRadius: '10px', padding: '10px', maxWidth: '80%',  }}>
              <span style={{ color: 'black' }}>{chat.prompt}</span>
            </div>
            <div style={{ backgroundColor: '#efefef', borderRadius: '10px', padding: '10px', marginLeft: chat.isMe ? '0' : '1000px', maxWidth: '80%', }}>
              <span style={{ color: 'black' }}>{chat.completion}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>


  );
}
export default ChatList;