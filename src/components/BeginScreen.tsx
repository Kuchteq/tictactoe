import React, {useRef} from 'react'
import { ReactComponent as Logo } from "./svgs/logo.svg"
import { ReactComponent as Swords } from "./svgs/swords.svg"
import { ReactComponent as Ai } from "./svgs/ai.svg"
import { ReactComponent as Friend } from "./svgs/friend.svg"
import { ReactComponent as BoardIcon } from "./svgs/boardIcon.svg"
import { ReactComponent as SizeIcon } from "./svgs/sizeIcon.svg"
import { ReactComponent as PlayIcon } from "./svgs/playIcon.svg"
import "./beginScreen.scss"
import { CSSTransition } from 'react-transition-group';


export default function BeginScreen({gameScreen, settings}) {

    let[settingsState, setSettingsState] = settings
    let[gameScreenState, setGameScreenState] = gameScreen
    const aiBut:any = useRef(0);
    let avSizes = [
        {
            id:5,
            name:"5x5",
        },
        {
            id:6,
            name:"6x6",
        },
        {
            id:7,
            name:"7x7",
        },
        {
            id:8,
            name:"8x8",
        },
        {
            id:9,
            name:"9x9",
        },
        {
            id:10,
            name:"10x10",
        },
    ]


    //h
    let hModeSelect = (value:any,e:any) =>
    {
        if(e.target.tagName != "INPUT")
        {
            setSettingsState(prevState => ({
                ...prevState,
                mode: settingsState.mode == value ? "" : value
            }));

        
        }   
    }
    let hDifficultySelect = (value:any) =>
    {
        setSettingsState(prevState => ({
            ...prevState,
            aiDifficulty: settingsState.aiDifficulty == value ? "" : value
        })); 
    }
    let hBoardSelect = (value:any,e:any, fromLower:any) =>
    {
        setSettingsState(prevState => ({
            ...prevState,
            boardSize: settingsState.boardSize == value || (fromLower == -1 && (settingsState.boardSize != -5 && settingsState.boardSize != -3 && settingsState.boardSize != -1 && settingsState.boardSize != 3))  ? fromLower : value
        }));
    }


    const updateName1 = (e:any) =>
    {
        setSettingsState(prevState => ({
            ...prevState,
            playerNames: [e.target.value, settingsState.playerNames[1]]
        }));
    }
    const updateName2 = (e:any) =>
    {
        setSettingsState(prevState => ({
            ...prevState,
            playerNames: [settingsState.playerNames[0], e.target.value]
        }));
    }

    return (
        <main>
            <h1 className = "welcome txt">Welcome to Tick Tack Toe <Logo/></h1>
            <span className = "belowLine"></span>
            <section>
                <h5 className = "txt">First chose your mode<Swords/></h5>
                <div className = "btnWrap against">
                    <div ref = {aiBut} className = {settingsState.mode == "Computer"?"selected":settingsState.mode == "Friend"? "smaled" : ""} onClick = {(e)=>hModeSelect("Computer",e)}> <Ai/> <span>Computer</span></div>
                    <div className = {settingsState.mode == "Friend"?"selected larged":""} onClick = {(e)=>hModeSelect("Friend",e)}><Friend/>
                        <span>Friend</span>
                        <div className = "inputNames">
                            <input onChange = {(e)=>updateName1(e)} value = {settingsState.playerNames[0]} placeholder = "Player one name" type = "text"/>
                            <input onChange = {(e)=>updateName2(e)} value = {settingsState.playerNames[1]} placeholder = "Player two name" type = "text"/>
                        </div>
                     </div>
                </div>
            </section>
            <CSSTransition in = {settingsState.mode == "Computer"} classNames="sizeAppear" timeout={300} unmountOnExit>
            <section>
                <h5 className = "txt">Ai difficulty</h5>
                <div className = "btnWrap aiBtns">
                    <div onClick = {()=>hDifficultySelect(1)} className = {settingsState.aiDifficulty == 1 ? "selected" :""}>Easy</div>
                    <div onClick = {()=>hDifficultySelect(2)} className = {settingsState.aiDifficulty == 2 ? "selected" :""}>Medium</div>
                    <div onClick = {()=>hDifficultySelect(3)} className = {settingsState.aiDifficulty == 3 ? "selected" :""}>Hard</div>
                </div>
            </section>
            </CSSTransition>
            <section>
                <h5 className = "txt">Next, what board do you want to play on?<BoardIcon/></h5>
                <div className = "btnWrap boardWhich">
                    <div className = {settingsState.boardSize == 3?"selected":""} onClick = {(e)=>hBoardSelect(3,e,-1)}>standard 3x3</div>
                    <div className = {settingsState.boardSize != 3 && settingsState.boardSize != -1?"selected":""} onClick = {(e)=>hBoardSelect(-5,e,-1)}>from 5x5 up to 10x10</div>
                </div>
            </section>
            <CSSTransition in = {settingsState.boardSize != -1 && settingsState.boardSize != 3 } classNames="sizeAppear" timeout={300} unmountOnExit>
                <section className = "sizeSection">
                    <h5 className = "txt">Chose the size <SizeIcon/></h5>
                    <div className = "btnWrap sizeWhich">
                        {avSizes.map((av) => 

                        <div className = {settingsState.boardSize == av.id ?"selected":""} onClick = {(e)=>hBoardSelect(av.id,e,-5)}>{av.name}</div>

                        )}
                    </div>
                </section>
            </CSSTransition>
            <CSSTransition in = {(settingsState.mode == "Computer" || (settingsState.mode == "Friend" && settingsState.playerNames[0] != "" && settingsState.playerNames[1] != "")) && (settingsState.boardSize != -1 && settingsState.boardSize != -5)} timeout = {300} classNames="playAppear" unmountOnExit>
                <div className = "btnWrap playSection">
                    <div className = "playGameBut" onClick = {()=>setGameScreenState(2)}>
                            Play <PlayIcon/>
                    </div>
                </div>
            </CSSTransition>
        </main>
    )
}
