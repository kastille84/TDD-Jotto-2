import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getSecretWord} from './actions';
import './App.css';

import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import Input from './Input';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={this.props.success} />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords}  />
      </div>
    );

  }
}

const mapStateToProps = (state) => ({
  success: state.success,
  guessedWords: state.guessedWords,
  secretWord: state.secretWord
})
export default connect(mapStateToProps, {getSecretWord: getSecretWord})(App);
