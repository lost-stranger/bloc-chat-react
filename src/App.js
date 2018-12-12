import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User  from './components/User';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDMpi6i6KHCkYpFL1iSzI-RMAaTQug-u4A",
  authDomain: "bloc-chat-react-amj.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-amj.firebaseio.com",
  projectId: "bloc-chat-react-amj",
  storageBucket: "bloc-chat-react-amj.appspot.com",
  messagingSenderId: "1079344474568"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state= {
    activeRoom: null,
    activeRoomId: null,
    user: "Guest"
  };
}

  activateRoom(room, roomId) {
    this.setState({
      activeRoom: room,
      activeRoomId: roomId
      })
    }

  setUser(user) {
    if (user === null) {
      this.setState({
        user: "Guest"
      });
    } else {
    this.setState({
      user: user.displayName
    });
  }
}

  render() {
    return (
      <div className="App">

        <header className="App-header">
        </header>

        <div>
        <RoomList
        firebase={ firebase }
        activateRoom = {(room, roomId) => {this.activateRoom(room, roomId)}}
        />
        </div>

        <h5 id = "active-room">
        {this.state.activeRoom}
        </h5>

        <p id = "guest-name">
        Welcome {this.state.user}
        </p>

        <User
        firebase={ firebase }
        setUser = { (user) => this.setUser(user)}
        user = {this.state.user}
        />


        <div>
        <MessageList
        firebase={ firebase }
        activeRoomId = {this.state.activeRoomId}
        />
        </div>

      </div>
    );
  }
}

export default App;
