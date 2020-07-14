import React from 'react';

import Square from './Square';

class Board extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            winner: 0,
        };
    }

    componentDidUpdate(){
        if(this.props.board){
            if(!this.state.winner){
                let winner = this.checkList(this.props.board.squares[0]);

                if(!winner){
                    winner = this.checkList(this.props.board.squares[1]);
                }

                if(!winner){
                    winner = this.checkList(this.props.board.squares[2]);
                }

                if(!winner){
                    let squares = [this.props.board.squares[0][0], this.props.board.squares[1][1], this.props.board.squares[2][2]];
                    winner = this.checkList(squares);
                }

                if(!winner){
                    let squares = [this.props.board.squares[0][2], this.props.board.squares[1][1], this.props.board.squares[2][0]];
                    winner = this.checkList(squares);
                }

                if(!winner){
                    let squares = [this.props.board.squares[0][0], this.props.board.squares[1][0], this.props.board.squares[2][0]];
                    winner = this.checkList(squares);
                }

                if(!winner){
                    let squares = [this.props.board.squares[0][1], this.props.board.squares[1][1], this.props.board.squares[2][1]];
                    winner = this.checkList(squares);
                }

                if(!winner){
                    let squares = [this.props.board.squares[0][2], this.props.board.squares[1][2], this.props.board.squares[2][2]];
                    winner = this.checkList(squares);
                }

                if(winner){
                    this.setState({winner: winner});
                }

            } else if(!this.props.board.currentPlayer){
                this.setState({winner: 0});
            }

        } else if(this.state.winner){
            this.setState({winner: 0});
        }
    }

    checkList(squares): number{
        let values = squares.map( square => square.value);
        let players = squares.map( square => square.player);

        if(values.every(v => v === 'X')){

            if(players.every(player => player === 1)){
                return 1;
            } else if(players.every(player => player === 2)){
                return 2;
            }
        }

        return 0;
    }

    render() {
        return <div className="Board">
        {
            this.props.board ?
            <div>
                <div className="row">
                    {this.props.board.squares[0].map( (square, index) => <Square key={'0'+ index} winner={this.state.winner>0} square={square} onSquareClickHandler={this.props.onSquareClickHandler(square, 0, index)} />)}
                </div>
                <div className="row">
                    {this.props.board.squares[1].map( (square, index) => <Square key={'1'+ index} winner={this.state.winner>0} square={square} onSquareClickHandler={this.props.onSquareClickHandler(square, 1, index)} />)}
                </div>
                <div className="row">
                    {this.props.board.squares[2].map( (square, index) => <Square key={'2'+ index} winner={this.state.winner>0} square={square} onSquareClickHandler={this.props.onSquareClickHandler(square, 2, index)} />)}
                </div>

            </div> : <div></div>
        }
        {this.state.winner > 0 ? <h4>Victory!!!! The winner is player {this.state.winner} </h4> : ''}
        </div>

    }


}

export default Board;