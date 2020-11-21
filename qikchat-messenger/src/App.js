import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {username: 'pranav', text: 'hey guys'},
    {username: 'kiran', text: 'hey dude'}
  ]); //array to store all the messages that user send
  const [username, setUsername] = useState('');

  console.log(input);
  console.log(messages);

  useEffect(() => {
    // runs only once when the app component loads
    db.collection('messages').OnSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()))
    });
  }, [])

  useEffect(() => {
    //normal way
    //const username = prompt('Please enter your name');
    //react way
    setUsername(prompt('Please enter your name'));
  }, [])

  const sendMessage = (event) => {
    //prevents any automatic refresh of the page
    event.preventDefault();
    //all the logic to send a message goes here 
    setMessages([...messages, {username: username, text: input}]); //using ... appends the new message to the old array,
    //instead of replacing the old messages
    setInput('');
  };

  return (
    <div className="App">
      <h2>Welcome {username}</h2>

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
          <Message username={username} message={message}/> //accessing the functionality in components
        ))
      }
    </div>
  );
}

export default App;
