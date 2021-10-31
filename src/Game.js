import React from "react";
import "./table.css";

class Cell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: null,
        };
    }
    render() {
        return(
            <button className="cell" onClick={()=> this.props.onClick()} >
            <div className="square">{this.props.value}</div>
            </button>
        );
    }
}



class Table extends React.Component {
       

    rendersquare(i) {
    return (
      <Cell number={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>
    );
   }

   render() {
        
    return (
      <div className="table">
        <div className="tablerow">
          {this.rendersquare(0)}
          {this.rendersquare(1)}
          {this.rendersquare(2)}
        </div>
        <div className="tablerow">
          {this.rendersquare(3)}
          {this.rendersquare(4)}
          {this.rendersquare(5)}
        </div>
        <div className="tablerow">
          {this.rendersquare(6)}
          {this.rendersquare(7)}
          {this.rendersquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          history: [
            {squares: Array(9).fill(null),}
          ],
          stepNumber: 0,
          xisnext: true,
      };
    }

    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if(caluclatewinner(squares) || squares[i]){
        return;
      }
      squares[i] = this.state.xisnext? 'X' : 'O';
      this.setState({
          history: history.concat([{squares: squares,
          }]),
          stepNumber: history.length,
          xisnext: !this.state.xisnext,
      });
    }

    jumpTo(step){
      this.setState({
        stepNumber: step,
        xisnext: (step%2)=== 0,
      });
    }
  
    render() {

      const history = this.state.history;
      const current = history[this.state.stepNumber];

      const winner = caluclatewinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move? 'Go to move #' + move: 'Go to game start';
        return (
          <div className="history" key ={move}>
            <button onClick={() => this.jumpTo(move)}>
              {desc}
            </button>
          </div>
        );
      });
      let status ;
      if(winner) {
        status = 'winner: ' + winner;
      }
      else{
        status = 'Next player: ' + (this.state.xisnext? 'X' : 'O');
      }

      return(
        <div className="game">
            <h1>Welcome to Tic Tac Toe Game</h1>
            <div className="status"><h2>{status}</h2></div>
            <div className="content">
              <Table squares={current.squares} onClick={(i) => this.handleClick(i)}/>
              <div className="gameinfo">
                {moves}
              </div>
            </div>
        </div>
      );
        
    }
}

function caluclatewinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for(let j = 0; j< lines.length; j++) {
      const [b, n, m] = lines[j];
      if (squares[b] && squares[b] === squares[n] && squares[b] === squares[m]) {
        return squares[b];
      }
  }

  return null;
}

export default Game;
