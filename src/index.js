import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

ReactDOM.render( <App/>, document.getElementById('root') );

class Square extends React.Component {
  render() {
    return(
      <button
        className="square"
        onClick = {() => this.props.onClick()}>
        <div className="square-status">
          {this.props.value}
        </div>
      </button>
    )
  }
}

class ResetButton extends React.Component {
  render () {
    return (
      <button
        className="reset"
        onClick={() => this.props.onClick()}>
        <div>RESET</div>
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: newBoard(),
      nextIsX: true
    }
  }

  handleSquareClick(i) {
    if (tieCondition(this.state.squares) || winCondition(this.state.squares) || this.state.squares[i]) {
      return;
    }

    let squares = this.state.squares.slice();
    squares[i] = this.state.nextIsX ? "X" : "O";
    this.setState({
      squares: squares,
      nextIsX: !this.state.nextIsX});
  }

  handleResetClick() {
    const resetSquares = newBoard();
    this.setState({
      squares: resetSquares,
      nextIsX: true
    });
  }

  renderSquare(i) {
    return(
      <Square
        value = {this.state.squares[i]}
        onClick = {() => this.handleSquareClick(i)}
      />
    )
  }

  render() {
    const tie = tieCondition(this.state.squares);
    const winner = winCondition(this.state.squares);
    let status;

    if (tie) {
      status = "Tie"
    } else if(winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.nextIsX ? "X" : "O");
    };

    return(
      <div className="game-elements">
        <div className="status">{status}</div>
        <div>
          <div className="board-row">
            {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
          </div>
        </div>

        <ResetButton onClick={() => this.handleResetClick()}/>
      </div>
    )
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game/>, document.getElementById('root')
)

// Helper Methods

function winCondition(squares) {
    const possibleWins = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]];

    for (let i = 0; i < possibleWins.length; i++) {
      const [a, b, c] = possibleWins[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      };
    };
  return null;
}

function tieCondition(squares) {
  if (winCondition(squares)) {
    return null;    
  } else if (squares.includes(null)) {
    return;
  };
  return true;
}

function newBoard() {
  return Array(9).fill(null);
}