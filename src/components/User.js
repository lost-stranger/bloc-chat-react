import React, {Component} from 'react';

class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      signInModule: null
    };
  }

  handleSignIn(e){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
    this.componentDidMount();
  }

  handleSignOut(e){
    this.props.firebase.auth().signOut();
    this.componentDidMount();
  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    })
  }

  showSignInModule(){
    this.setState({signInModule: true});
  }

  signingOption(){
    if (this.props.activeUsername === "Guest") {
      return(
        <button id = "sign-in-option" onClick={() => this.showSignInModule()}> Sign In </button>
      );
    }
    else {
      return(
        <button id = "sign-out-option" onClick={(e) => this.handleSignOut(e)}> Sign Out </button>
      );
    }
  }

  SignInUserModule() {
    if (this.state.signInModule === true) {
      return(
        <div id="Username-Module">
        <h3> Set a username </h3>
        <p> This name will appear when you send messages </p>
        <form onSubmit={ (e) => this.handleSignIn(e) }>
        <input id="value-field" type="text" onChange = {(e) => this.props.setUser(e)} />
        <button id = "SignIn-user" type="submit"> Set Username</button>
        </form>
        </div>
      );
    }
  }

  render(){
    return(
      <section>
      <div id = "signing-option"> {this.signingOption()} </div>
      <div>
      {this.SignInUserModule()}
      </div>
      </section>

    );
  }
}

export default User;
