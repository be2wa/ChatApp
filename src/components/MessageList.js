import React, { Component, Fragment } from 'react';

const DUMMY_DATA = [
  {
    senderId: 'jerzydudek',
    text: 'jo uora'
  },
  {
    senderId: 'twojamama',
    text: 'duyn aaa'
  },
  {
    senderId: 'twojadupa',
    text: 'noszija'
  }
];

class MessageList extends Component {
  render() {
    return (
      <div className="message-list">
        {DUMMY_DATA.map((message, index) => {
          return (
            <div key={index} className="message">
              <div className="message-username">{message.senderId}</div>
              <div className="message-text">{message.text}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default MessageList;
