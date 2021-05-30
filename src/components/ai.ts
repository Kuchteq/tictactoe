import { winChecker, isTie} from "./winChecker";


const minimax = (board:any,depth:any,isMax:any, x:number, y:number, player, opponent) =>
{
    if(winChecker(board,x,y) == 1 && isMax)
    {
        return -1
    }
    if(winChecker(board,x,y) == 1 && !isMax)
    {
        return 1
    }
    if(isTie(board) == true)
    {
        return 0;
    }
    if(depth <= 0)
    {
        return 0;
    }
    if(isMax)
    {
        let bestScore:any = -100;
        
        for(let y=0; y<board.length; y++)
        {
            for(let x=0; x<board.length; x++)
            {
                if(board[y][x] == " ")
                {
                    board[y][x] = player

                    bestScore = Math.max(bestScore, minimax(board, depth-1, !isMax, x, y, player, opponent))

                    board[y][x] = " "
                }
            }
        }
        return bestScore
    }
    else
    {
        let bestScore:any = 100;
        
        for(let y=0; y<board.length; y++)
        {
            for(let x=0; x<board.length; x++)
            {
                if(board[y][x] == " ")
                {
                    board[y][x] = opponent

                    bestScore = Math.min(bestScore, minimax(board, depth-1, !isMax, x, y,  player, opponent))

                    board[y][x] = " "
                }
            }
        }
        return bestScore

    }


}

const findBestMove = (board, player, opponent, depthDifficulty) =>
{
    let bestMove = {x:-1,y:-1}
    let bestVal = -100

    for(let y=0; y<board.length; y++)
    {
        for(let x=0; x<board.length; x++)
        {
            if(board[y][x] == " ")
            {
                board[y][x] = player;

                let moveVal = minimax(board, depthDifficulty, false, x, y, player, opponent)
                
                board[y][x] = " "
                
                if(moveVal > bestVal)
                {
                    bestMove.x = x
                    bestMove.y = y
                    bestVal = moveVal
                }

            }
        }
    }
    console.log(bestVal)
    return bestMove;

}




export {findBestMove};