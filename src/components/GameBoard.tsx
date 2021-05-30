import { useState, useEffect, useRef } from "react";
import "./gameBoard.scss";

import { ReactComponent as Cross } from "./svgs/Cross.svg";
import { ReactComponent as Circle } from "./svgs/Circle.svg";
import TopStuff from "./TopStuff"

import { winChecker, isTie } from "./winChecker";

import { randomSymbol, makeGrid, constructDifficulty } from "./helpers";

import { findBestMove } from "./ai"

export default function GameBoard({ gameScreen, settings }) {
  const gameBoardRef: any = useRef(0);
  const [ roundReset, setRoundReset ] = useState(false);
  const [gameVolume, setGameVolume] = useState(0.5)
  const [canPlay, setCanPlay] = useState(true)
  const [gameScreenState, setGameScreenState] = gameScreen;

  const [settingsState, setSettingsState] = settings;
  const bSize = settingsState.boardSize;

  let moveSound = new Audio('/sniper.mp3');
  moveSound.volume = gameVolume

  let winSound = new Audio('/win.mp3');
  winSound.volume = gameVolume

  let loseSound = new Audio('/lose.mp3');
  loseSound.volume = gameVolume

  let tieSound = new Audio('/tie.mp3');
  tieSound.volume = gameVolume

  const [vBoard, setvBoard] = useState(Array.from({ length: bSize }, (e) => Array(bSize).fill(" ")));
  let [tiesState, setTiesState] = useState(0);
  let [crossesTurn, setCrossesTurn] = useState(true);

  const [player1State, setPlayer1State] = useState({
    name: settingsState.mode == "Computer" ? "Player" : settingsState.playerNames[0],
    curSymbol: randomSymbol(),
    score: 0,
  });

  const [player2State, setPlayer2State] = useState({
    name: settingsState.mode == "Computer" ? "Computer" : settingsState.playerNames[1],
    curSymbol: player1State.curSymbol === "x" ? "o" : "x",
    score: 0,
  });


  const resetBoard = () =>
  {
    setvBoard(Array.from({ length: bSize }, (e) => Array(bSize).fill(" ")))
   
    setCrossesTurn(true)

    const rand = randomSymbol()
    setPlayer1State(prevState => ({
        ...prevState,
        curSymbol: rand
    }));
    setPlayer2State(prevState => ({
        ...prevState,
        curSymbol:rand === "x" ? "o" : "x"
    }));

    setRoundReset(false)
  }


  const claim = (e, x, y) => {
    //also checks for winning

    if (!e.currentTarget.classList.contains("claimed") && canPlay) {
      setCanPlay(false)
      moveSound.play()
      
      let temp = vBoard.slice();
      temp[y][x] = crossesTurn ? "x" : "o";
      setvBoard(temp);
      if(winChecker(temp,x,y))
      {
        scoreUpdate()
        setRoundReset(true)
      }
      else if(isTie(vBoard))
      {
        setTiesState(prevState=>prevState+1)
        setRoundReset(true)
        tieSound.play()
      }
      else
      {
        setCrossesTurn((prevState) => !prevState);
       
      }
      setTimeout(()=>setCanPlay(true),495)
    }
  };

  const gameBoxes: any = makeGrid(vBoard, claim);


  const scoreUpdate = () => {
    if (
      (player1State.curSymbol == "x" && crossesTurn) ||
      (player1State.curSymbol == "o" && !crossesTurn)
    ) {
      setPlayer1State((prevState) => ({
        ...prevState,
        score: player1State.score + 1,
      }));
      winSound.play()
    } else {
      setPlayer2State((prevState) => ({
        ...prevState,
        score: player2State.score + 1,
      }));
      loseSound.play()
    }
  };

  useEffect(()=>{
     if(((crossesTurn && player2State.curSymbol == "x") || (!crossesTurn && player2State.curSymbol == "o")) && roundReset != true && settingsState.mode == "Computer")
    {
      let bestMove = findBestMove(vBoard,player2State.curSymbol, player1State.curSymbol, constructDifficulty(settingsState.aiDifficulty, bSize))
      console.log(bestMove)
      setTimeout(()=> gameBoardRef.current.querySelectorAll('div')[bestMove.y*bSize+bestMove.x].click()
      ,500)
    
    }

  },[crossesTurn,roundReset])



  return (
    <div>
      <TopStuff setGameScreenState = {setGameScreenState} gameVolume = { gameVolume } setGameVolume = {setGameVolume}/>
      <h4  className={`${roundReset ? "nextRoundShow" : "hideNextRound"}`}>
        click on the board to start the next round
      </h4>
      <div className="centerGame">
        <div className="scoreSide">
          <h2
            className={
              (player1State.curSymbol == "x" && crossesTurn) ||
              (player1State.curSymbol == "o" && !crossesTurn)
                ? "nowToPlay"
                : ""
            }>
            {player1State.name}
            {player1State.curSymbol == "x" ? <Cross /> : <Circle />}
          </h2>
          <h3>{player1State.score}</h3>
        </div>
        <section ref={gameBoardRef} className="gameBoard">
          <span onClick = {()=>resetBoard()}
            className={`${roundReset && "resetOverlay"}`}
          ></span>
          {gameBoxes}
        </section>
        <div className="scoreSide">
          <h2
            className={
              (player2State.curSymbol == "x" && crossesTurn) ||
              (player2State.curSymbol == "o" && !crossesTurn)
                ? "nowToPlay"
                : ""
            }
          >
            {player2State.name}
            {player2State.curSymbol == "x" ? <Cross /> : <Circle />}
          </h2>
          <h3>{player2State.score}</h3>
        </div>
      </div>
      <h4>
        Ties <span className="sinMon">{tiesState}</span>
      </h4>
    </div>
  );
}
