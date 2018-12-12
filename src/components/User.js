import React, {Component} from 'react';

class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      signInModule: null
    };
  }

  handleSignIn(e){
    console.log("Signing in...");
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  handleSignOut(e){
    this.props.firebase.auth().signOut();
  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( e => {
      this.props.setUser(e)
    });
  }

  showSignInModule(){
    this.setState({signInModule: true});
  }

  signingOption(){
    if (this.props.user === "Guest") {
      return(
        <button id = "sign-in-option" onClick={(e) => this.handleSignIn(e)}> Sign In </button>
      );
    }
    else {
      return(
        <button id = "sign-out-option" onClick={(e) => this.handleSignOut(e)}> Sign Out </button>
      );
    }
  }


  render(){
    return(
      <section>
      <div id = "signing-option"> {this.signingOption()}
      </div>
      </section>

    );
  }
}

export default User;
