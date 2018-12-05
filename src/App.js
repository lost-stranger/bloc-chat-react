import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
    activeRoom: "Room 1"
  };
}

  activateRoom(room) {
    this.setState({
      activeRoom: `${room}`,
      })
    }

  render() {
    return (
      <div className="App">

        <header className="App-header">
        </header>

        <div>
        <RoomList
        firebase={ firebase }
        activateRoom = {(room) => this.activateRoom(room)}
        />
        </div>

        <div>
        <MessageList
        firebase={ firebase }
        />
        </div>
        <section>
        <div>
        {this.state.activeRoom}
        </div>
        </section>
      </div>
    );
  }
}

export default App;
