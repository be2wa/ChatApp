import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import './App.css';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';

import { tokenUrl, instanceLocator } from './config';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.roomId = 14411138;
    this.sendMessage = this.sendMessage.bind(this);
  }

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
        this.currentUser = currentUser;

        this.currentUser.getJoinableRooms()
          .then(joinableRooms => {
            this.setState({
              joinableRooms,
              joinedRooms: this.currentUser.rooms
            });
          })
          .catch(err => console.log('Error on joinableRooms', err));

        this.currentUser.subscribeToRoom({
          roomId: this.roomId,
          messageLimit: 20,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            }
          }
        })
      })
      .catch(err => console.log('Error on connection', err));
  }

  sendMessage = (text) => {
    this.currentUser.sendMessage({
      text,
      roomId: this.roomId
    });
  }

  render() {
    return (
      <div className="app">
        <RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        {/* <NewRoomForm /> */}
      </div>
    );
  }
}

export default App;
