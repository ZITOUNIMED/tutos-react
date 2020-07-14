import React from 'react';

import Board from './Board';
import './Game.css';

const SQUARES = [[{ value: 'O', player: 0}, { value: 'O', player: 0}, { value: 'O', player: 0}],
    [{ value: 'O', player: 0}, { value: 'O', player: 0}, { value: 'O', player: 0}],
    [{ value: 'O', player: 0}, { value: 'O', player: 0}, { value: 'O', player: 0}]
];

const copyList = (list) => {
    return [{...list[0]}, {...list[1]}, {...list[2]}];
};
const copySquares = (squares) => {
   return [copyList(squares[0]), copyList(squares[1]), copyList(squares[2]) ];
};

const copyBoard = (board) => {
    return {
        ...board,
        squares: copySquares(board.squares)
    };
};
class Game extends React.Component{
    timerInterval: any;
    history: [];

    constructor(props){
        super(props);
        this.state = {
            board: {
                currentPlayer: 0,
                squares: copySquares(SQUARES)
            },
            history: [],
            showedBoard: null,
            resume: false
        };
    }

    componentDidUpdate(){
        if(this.state.resume){
            this.history = [...this.state.history.map(board => copyBoard(board))];

            this.timerInterval = setInterval(() => {
                if(this.history.length){
                    const board = copyBoard(this.history.shift());
                    this.setState({...this.state, showedBoard: board});
                }
            }, 1000);

            this.setState({...this.state, resume: false});

            setTimeout(() => { clearInterval(this.timerInterval); }, this.state.history.length * 1000);
        }

    }

    render(){
        return <div className="Game">
            <h2>My Game!</h2>
            <Board board={this.state.board} onSquareClickHandler={
                (square, i, j) => {
                    return () => {
                           const board = this.state.board;
                           const squares = copySquares(board.squares);
                           squares[i][j].value = square.value === 'O' ? 'X' : 'O';
                           board.currentPlayer = board.currentPlayer < 2 ? board.currentPlayer + 1 : 1;
                           squares[i][j].player = board.currentPlayer;

                           board.squares = squares;

                           const history = this.state.history;
                           history.push(copyBoard(board));
                           this.setState({ ...this.state, board : board, history: history});
                       };
                }

            }/>
            <button onClick={() => {
                  this.setState({
                            board: {
                                currentPlayer: 0,
                                squares: copySquares(SQUARES)
                            },
                            history: [],
                            showedBoard: null,
                            resume: false,
                        });

            }}>Clear!</button>

            <h3>History </h3>
            <button onClick={!this.state.resume ? () => {
                    this.setState({...this.state, resume: true})
            } : undefined}>Resume</button>

            <Board key={'showedBoard'} board={this.state.showedBoard}  onSquareClickHandler={ (...args) => {}} />
        </div>
    }
}

export default Game;