import React, { Component, Fragment } from 'react';

import Message from './Message';

// const DUMMY_DATA = [
//   {
//     senderId: 'jerzydudek',
//     text: 'jo uora'
//   },
//   {
//     senderId: 'twojamama',
//     text: 'duyn aaa'
//   },
//   {
//     senderId: 'twojadupa',
//     text: 'noszija'
//   }
// ];

class MessageList extends Component {
  render() {
    return (
      <div className="message-list">
        {this.props.messages.map((message, index) => {
          return (
            <Message key={index} username={message.senderId} text={message.text} />
          );
        })}
      </div>
    );
  }
}

export default MessageList;
