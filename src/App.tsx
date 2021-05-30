import React, {useState} from 'react'
import BeginScreen from "./components/BeginScreen"
import GameBoard from "./components/GameBoard"
import { CSSTransition } from 'react-transition-group';


function App() {
  let [settingsState, setSettingsState] = useState({
    mode: "",
    boardSize: -1,
    playerNames: ["",""],
    aiDifficulty: 2
})
let [gameScreenState, setGameScreenState] = useState(1)


  return (
    <div className="App">
      <CSSTransition in = {gameScreenState == 1} classNames = "windowsChange" timeout={300} unmountOnExit>
        <BeginScreen gameScreen = {[gameScreenState, setGameScreenState]} settings = {[settingsState, setSettingsState]}/>
      </CSSTransition>

      <CSSTransition in = {gameScreenState == 2} classNames = "windowsChange" timeout={300} unmountOnExit>
        <GameBoard gameScreen = {[gameScreenState, setGameScreenState]} settings = {[settingsState, setSettingsState]}/>
      </CSSTransition>
    </div>
  );
}

export default App;
