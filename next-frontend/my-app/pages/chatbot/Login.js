import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'cookies-next'

function Login() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
  const router = useRouter();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    });
    const data = await response.json();
    // console.log("the response :",response)
    if (data.message === "Success") {
        setName(data.name);
        console.log("Success")
        localStorage.setItem("email", email)
        localStorage.setItem("name", data.name)
        
       
        router.push("/chatbot/Chatbot");
    }else{
        console.log("Error")
    }

    // setResponse(data.response);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
