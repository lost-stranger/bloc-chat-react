import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],   newRoomName: '',
      createOption: false
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

handleChange(e) {
  this.setState({ newRoomName: e.target.value })
}

handleSubmit(e) {
  e.preventDefault();
  if (!this.state.newRoomName) { return }
  this.roomsRef.push({
  name: this.state.newRoomName
});
const newRoom = { name: this.state.newRoomName};
  this.setState({ rooms: [...this.state.rooms, newRoom], newRoomName: '' });
}

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  clickedNewRoom(){
  this.setState({createOption: true});
  }

  createRoom() {
    if (this.state.createOption === true) {
    return(
    <div id="new-room-field">
    <h2> Create New Room </h2>
    <h3> Enter a room name </h3>
    <form onSubmit={ (e) => this.handleSubmit(e) }>
      <input type="text" value={ this.state.newRoomName} onChange={ (e) => this.handleChange(e) } />
      <input type="submit" name = "Create Room" />
    </form>
    </div>
      );
    }
  }

  render(){
    return(
      <section className="room-list">
        <section className="room-menu">
        <h2 id="room-list-title">Bloc Chat</h2>
        <button id = "new-room" onClick={() => this.clickedNewRoom()}> New Room </button>

        <div className="rooms">
        {
          this.state.rooms.map( (room) =>
          <p id="room">{
            room.name}
            </p>
          )
        }
        </div>
        </section>
                {this.createRoom()}
      </section>
    );
  }
}

export default RoomList;
