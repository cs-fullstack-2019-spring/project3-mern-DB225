import React, { Component } from 'react';
import './App.css';
import TweetHome from "./components/TweetHome";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TweetHome />
      </div>
    );
  }
}

export default App;
