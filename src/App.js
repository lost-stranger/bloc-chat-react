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
    activeUsername: "Guest"
  };
}

  activateRoom(room, roomId) {
    this.setState({
      activeRoom: room,
      activeRoomId: roomId
      })
    }

  setUser(e) {

    this.setState({activeUsername: e.target.value});
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

        <h3 id = "active-room">
        {this.state.activeRoom}
        </h3>

        <h4 id = "guest-name">
        Welcome: {this.state.activeUsername}
        </h4>

        <User
        firebase={ firebase }
        setUser = { (e) => this.setUser(e)}
        activeUsername = {this.state.activeUsername}
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
