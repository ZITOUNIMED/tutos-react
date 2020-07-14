import React from 'react';

function Square (props) {
    return <div className="Square">
               <div className="col-md-4" onClick={!props.winner? props.onSquareClickHandler : undefined} style={{ color: props.square.player === 1 ? 'red' : props.square.player === 2 ? 'green' : 'black'}}>
                   {props.square.value}
               </div>
           </div>;
}

export default Square;