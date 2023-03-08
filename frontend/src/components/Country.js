import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
function Country() {
  const [country, setCountry] = useState('');
//   const [password, setPassword] = useState('');
  const navigate = useNavigate();
 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/addCountry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: country })
    });
    const data = await response.json();
    // console.log("the response :",response)
    if (data.message === "new country inserted") {
    console.log("Success")
    // navigate("/chatbot");
    }else{
        console.log("Error")
    }

    // setResponse(data.response);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Country:
        <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)} />
      </label>
      
      <button type="submit">Add</button>
    </form>
  );
}

export default Country;
