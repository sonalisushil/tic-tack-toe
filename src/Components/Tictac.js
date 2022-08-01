import React,{useState} from "react";
//import "./Tictac.css";
//import './App.css';
import Square from "./Square";
import EndGame from "./EndGame";

const initial = "";
const X_Player = "X";
const O_Player = "O";

const winCombination = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

const Tictac = () =>{

  const [grid, setGrid] = useState(Array(9).fill(initial));
  const [player, setPlayer] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [draw, setDraw] = useState(false);
  const [winCount, setwinCount] = useState({X:0,O:0});


  function isGameOver() {
    if(!gameFinished){
      // X Win check
      for(let i=0; i<8;i++){
        if(
          grid[winCombination[i][0]] === X_Player &&
          grid[winCombination[i][1]] === X_Player &&
          grid[winCombination[i][2]] === X_Player 
        ){
          setGameFinished(true);
          setwinCount({...winCount, Xs: winCount.X + 1});
          console.log("X WON");
          return;
        }
      }

       // O Win check
       for(let i=0; i<8;i++){
        if(
          grid[winCombination[i][0]] === O_Player &&
          grid[winCombination[i][1]] === O_Player &&
          grid[winCombination[i][2]] === O_Player 
        ){
          setGameFinished(true);
          setwinCount({...winCount, Os: winCount.O + 1});
          console.log("O WON");
          return;
        }
      }

    //Draw game check
    if(!grid.includes(initial)){
      setDraw(true);
      setGameFinished(true)
      console.log("DRAW");
    }
  }
  }

  function restartGame () {
     setGrid(Array(9).fill(initial));
     setGameFinished(false);
     setDraw(false);
  }

  function clearHistory () {
    setwinCount({X:0,O:0});
    restartGame();
  }

  isGameOver();


  function handleClick (id)  {
    console.log("Inside handleClick");
    setGrid(
      grid.map((item, index) => {
        if(index === id){
        if(player){
          return X_Player;
        }else {
          return O_Player;
        }
      }else{
        return item;
      }
      })
    );
    setPlayer(!player);
  }
 
return(
       <div>
        {/* <span className="win-history">
                X's WINS:{winCount.X}
                <br />
                O's WINS:{winCount.O}

            </span> */}
        {gameFinished && (
          <EndGame winCount={winCount}
          restartGame={restartGame}
          player={player}
          draw={draw}
          clearHistory={clearHistory}
          />
          )}
        <Square clickedArray={grid} handleClick={handleClick}/>
       </div>
    );
}
export default Tictac;