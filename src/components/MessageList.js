import React, {Component} from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: false,
      message:  {
        RoomId: null,
        content:null,
        SentAt: null,
        username:null }

      };

      this.messagesRef = this.props.firebase.database().ref('messages');    }

      componentDidMount(){
        this.messagesRef.on('child_added', snapshot => {
          const message = snapshot.val();
          message.key = snapshot.key;
          this.setState({ messages: this.state.messages.concat( message ) });
        });
      }

      componentDidUpdate() {

        if (this.state.newMessage) {
          this.messagesRef.push(this.state.message);
          this.setState({
            newMessage: false
          })
        }

      }

      convertTime(x){
        var date = x;
        var d = new Date(date);
        var ds = d.toLocaleTimeString();
        return ds;
      }

      handleMessageSubmit(e, message, activeRoomId, user) {
        e.preventDefault();
        if (message !== "") {
          this.setState({
            newMessage: true,
            message: {
              content: message,
              RoomId: activeRoomId,
              username: user,
              sentAt: firebase.database.ServerValue.TIMESTAMP,
            }
          });
          this.refs.newMessage.value = "";
        }
      }

      render() {
        return (
          <section className="message-list">
          <div className="messages-per-room">
          {this.state.messages.filter((message) => {
            return (this.props.activeRoomId === message.RoomId);
          }).map((message, index) =>
          <div key = {index}>
          <p id = "username">{message.username}</p>
          <p id = "time">{this.convertTime(message.sentAt)}</p>
          <p id = "content">{message.content}</p>
          </div>
        )}
        </div>

        <div className = "sending-messages">
        <form onSubmit={ (e) => this.handleMessageSubmit(
          e,
          this.refs.newMessage.value,
          this.props.activeRoomId,
          this.props.user
        )}
        >

        <input placeholder="start chatting..." ref="newMessage" size="100" />
        <input type="submit" value="Send" />

        <br />
        <br />
        </form>
        </div >
        </section >
      );
    }
  }

  export default MessageList;
