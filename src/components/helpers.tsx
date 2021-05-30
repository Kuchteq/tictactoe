import { ReactComponent as Cross } from "./svgs/Cross.svg";
import { ReactComponent as Circle } from "./svgs/Circle.svg";

export const randomSymbol = () =>
{
    if(Math.round(Math.random()%2) == 1)
    {
        return "x"
    }
    return "o"
}


//loop for columns
export const makeGrid = (vBoard:any, claim: any ) => {
    


let gameSize = window.innerHeight * 0.75;
let grid:any= []

  for (let y = 0; y < vBoard.length; y++) {
    for (let x = 0; x < vBoard.length; x++) {
      grid.push(
        <div
          className={vBoard[y][x] != " " ? "claimed" : ""}
          onClick={(e) => claim(e, x, y)}
          style={{ width: gameSize / vBoard.length, height: gameSize / vBoard.length }}
        >
          {vBoard[y][x] == "x" && <Cross />}
          {vBoard[y][x] == "o" && <Circle />}
        </div>
      );
    }
    grid.push(<span className="end"></span>);
  }
  return grid;
};

export const constructDifficulty = (number, bSize)=>{
  
    if(bSize==3)
    {
      return number*2
    }
    if(bSize == 5)
    {
      return number+1
    }
    if(bSize >= 8)
    {
      if(number == 3)
      {
        return 2
      }
    }
    return number
}