import React, { useState } from 'react';

function QA() {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/dataset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: inputValue1, answer: inputValue2 })
    });
    const data = await response.json();
    setResponse(data.response);
  }

  const handleChange1 = (e) => {
    setInputValue1(e.target.value);
  }

  const handleChange2 = (e) => {
    setInputValue2(e.target.value);
  }

  return (
    <>
    
    <div>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>ADD Dataset</h1>
        
      <form style={{ display: 'flex', justifyContent: 'center' }} onSubmit={handleSubmit}>
        <label>
          Question:
          <input type="text" value={inputValue1} onChange={handleChange1} />
        </label>
        
        <label>
          Answer:
          <input type="text" value={inputValue2} onChange={handleChange2} />
        </label>
        <br></br>
        <button type="submit">Send</button>
      </form>
      {response && <p>Response: {response}</p>}
    </div>
    </>
  );
}

export default QA;
