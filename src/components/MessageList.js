import React, {Component} from 'react';

import * as firebase from 'firebase';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],

    };

    this.messagesRef = this.props.firebase.database().ref('messages');

    }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }


  render(){
    return(
      <section className="message-list">

        <div className="messages-per-room">
          {this.state.messages.filter((message) => {
            return (this.props.activeRoomId == message.RoomId);
          }).map((message) =>
          <div>
            <p id = "username">{message.username}</p>
            <p id = "time">{message.sentAt}</p>
            <p id = "content">{message.content}</p>
            </div>
        )}
            </div>
      </section>
    );
  }
}

export default MessageList;
