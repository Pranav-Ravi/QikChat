import React, { useState } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]); //array to store all the messages that user send

  console.log(input);
  console.log(messages);

  const sendMessage = (event) => {
    //prevents any automatic refresh of the page
    event.preventDefault();
    //all the logic to send a message goes here 
    setMessages([...messages, input]); //using ... appends the new message to the old array,
    //instead of replacing the old messages
    setInput('');
  };

  return (
    <div className="App">
      <h1>Hello Pranav</h1>

      <form>
      <FormControl>
        <InputLabel>Enter a message...</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)}/>
        <Button variant="contained" color="primary" disabled={!input} onClick={sendMessage}>Send Message</Button>
      </FormControl>
      </form>

      {/* displays the current typed message in to the user screen */}
      {
        messages.map(message => (
        <p>{message}</p>
        ))
      }
    </div>
  );
}

export default App;
