import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import './App.css';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';

import { tokenUrl, instanceLocator } from './config';


class App extends Component {

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'uberadmin',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    });

    chatManager.connect()
      .then(currentUser => {
        currentUser.subscribeToRoom({
          roomId: 14411138,
          hooks: {
            onNewMessage: message => {
              console.log(message.text)
            }
          }
        })
      })
  }

  render() {
    return (
      <div className="app">
        {/* <RoomList /> */}
        <MessageList />
        {/* <SendMessageForm /> */}
        {/* <NewRoomForm /> */}
      </div>
    );
  }
}

export default App;
