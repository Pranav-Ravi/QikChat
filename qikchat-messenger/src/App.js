import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase'; 
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]); //array to store all the messages that user send
  const [username, setUsername] = useState('');

  console.log(input);
  console.log(messages);

  useEffect(() => {
    // runs only once when the app component loads
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
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

    //push data to the database
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() //uses the time based on the server country()
    })
    //all the logic to send a message goes here 
    //setMessages([...messages, {username: username, text: input}]); //using ... appends the new message to the old array,

    //instead of replacing the old messages
    setInput('');
  };

  return (
    <div className="App">
      <img class="logo-image" src="https://icons.iconarchive.com/icons/pelfusion/long-shadow-ios7/1024/Messages-icon.png?w=100&h=100"/>
      <h2>Welcome {username}</h2>

      <form className="app__form">
      <FormControl className="app__formControl">
        <Input className="app__input" placeholder='Enter a message...' value={input} onChange={event => setInput(event.target.value)}/>
        <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" onClick={sendMessage}>
            <SendIcon/>
        </IconButton>
      </FormControl>
      </form>

      {/* displays the current typed message in to the user screen */}
      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message key={id} username={username} message={message}/> //accessing the functionality in components
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
