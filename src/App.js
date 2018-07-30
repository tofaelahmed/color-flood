import React, { Component } from 'react';
import './App.css';
import {Game}  from './lib';

const COLORS = ["#E62F41","#E7E228","#CD2FAB","#32CD32","#23856E"];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      game: null,
      optimalMoves:0,
      isFinished: false,
      best: 0
    }
  }

  componentDidMount(){
    this.createNewGame();
  }

  getPlayersBestScore(){
    return localStorage.getItem('best') || 0;
  }

  createNewGame(){
    let game = new Game(6,5);
    game.board.generateTiles();
    let currentBest = this.getPlayersBestScore();
    this.setState({game, isFinished: false, best:currentBest});
  }

  onMove(color) {
    if (this.state.isFinished) {
      return;
    }

    this.state.game.makeMove(color);
    this.setState({game: this.state.game});

    let totalMoves = this.state.game.totalMoves;
    let currentBest = this.getPlayersBestScore();


    if(this.state.game.isFinished()) {

      let updatedState = {isFinished: true};
      if( totalMoves > currentBest){
        localStorage.setItem('best', totalMoves);
        updatedState.best = totalMoves;
      }

      this.setState(updatedState);
    }

  }

  render() {
    let {game, best} = this.state;
    return (
      <div className="App">
        <div className="hud">
          <span> Moves: {game && game.totalMoves}</span>
          <span> Best: {best}</span>
        </div>
        <header>
          <h1>Color Flood</h1>
        </header>

          <div className="grid">
            {
              this.state.game && this.state.game.board.tiles.length &&
              this.state.game.board.tiles.map((row,key)=>
                  <div key={key} className="row">
                    {
                      row.map((cell,key)=> <div key={key} className="box" style={{backgroundColor: COLORS[cell]}}></div>)
                    }
                  </div>
              )
            }
          </div>

        {
          this.state.isFinished &&
          <div style={{paddingTop: 20}}>
            <a className="blink new-game" onClick={this.createNewGame.bind(this)}>New Game</a>
          </div>
        }

        {
          !this.state.isFinished &&
          <div className="row">
            {
              COLORS.map((cell,key)=> <div key={key} className="circle" onClick={this.onMove.bind(this, key)} style={{background: cell}}></div>)
            }
          </div>
        }
      </div>
    );
  }
}

export default App;
