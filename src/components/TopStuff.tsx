import React from 'react'
import { ReactComponent as BackArrow } from "./svgs/backArrow.svg";

import "./topStuff.scss";

export default function TopStuff({setGameScreenState, gameVolume, setGameVolume}) {


    return (
        <div className="topStuff">
        <div onClick={() => setGameScreenState(1)}>
          <BackArrow />
          Go back to the setup screen
        </div>
        <div>
          <div>
          Turn {gameVolume != 0 ? "off" : "on"} sounds
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	        viewBox="0 0 480 480" onClick = {()=>setGameVolume(prev=>prev == 0 ? 1 : 0)}>
        <path style = {{fill:gameVolume == 0 ? "#868686" : "#fff"}} d="M278.944,17.577c-5.568-2.656-12.128-1.952-16.928,1.92L106.368,144.009H32c-17.632,0-32,14.368-32,32v128
            c0,17.664,14.368,32,32,32h74.368l155.616,124.512c2.912,2.304,6.464,3.488,10.016,3.488c2.368,0,4.736-0.544,6.944-1.6
            c5.536-2.656,9.056-8.256,9.056-14.4v-416C288,25.865,284.48,20.265,278.944,17.577z"/>
        <path style = {{fill:gameVolume < 0.2 ? "transparent" : "#fff"}} d="M368.992,126.857c-6.304-6.208-16.416-6.112-22.624,0.128c-6.208,6.304-6.144,16.416,0.128,22.656
            C370.688,173.513,384,205.609,384,240.009s-13.312,66.496-37.504,90.368c-6.272,6.176-6.336,16.32-0.128,22.624
            c3.136,3.168,7.264,4.736,11.36,4.736c4.064,0,8.128-1.536,11.264-4.64C399.328,323.241,416,283.049,416,240.009
            S399.328,156.777,368.992,126.857z"/>
        <path style = {{fill:gameVolume < 0.5 ? "transparent" : "#fff"}} d="M414.144,81.769c-6.304-6.24-16.416-6.176-22.656,0.096c-6.208,6.272-6.144,16.416,0.096,22.624
            C427.968,140.553,448,188.681,448,240.009s-20.032,99.424-56.416,135.488c-6.24,6.24-6.304,16.384-0.096,22.656
            c3.168,3.136,7.264,4.704,11.36,4.704c4.064,0,8.16-1.536,11.296-4.64C456.64,356.137,480,299.945,480,240.009
            S456.64,123.881,414.144,81.769z"/>
        </svg>

          </div>
          <div>
            <div className = "volSlider" onClick = {(e)=>{setGameVolume((e.pageX - e.currentTarget.offsetLeft)/120)}}>
                <div className = "volController" style = {{width:gameVolume*100+"%"}}></div>
            </div>
          </div>
        </div>
      </div>
    )
}