function winChecker(board, x, y)
{
    //diaognally
    let continous = true;
    let bSize = board.length
    let counter = 1;
    let needed = board.length == 3 ? 3 : 5;

    for(let i = 1; i<needed; i+=1)
    {
        
        if(y-i >= bSize || y-i < 0 || x-i >= bSize || x-i < 0 )
        {
            i = 999
        } 
        else if(board[y-i][x-i] == " ")
            {
                i = 999
            }
        else
        {
            if(board[y][x] == board[y-i][x-i])
            {
               
                counter+=1;
            }
            
            else
            {
                continous = false;
                i = 999
            }
        }    
    }
    for(let i = 1; i<needed; i+=1)
    {
        
        if(y+i >= bSize || y+i < 0 || x+i >= bSize || x+i < 0 )
        {
            i = 999
        } 
        else if(board[y+i][x+i] == " ")
        {
            i = 999
        }
        else
        {
            if(board[y][x] == board[y+i][x+i])
            {
               
                counter+=1;
            }
          
            else
            {
                continous = false;
                i = 999
            }
        }    
    }
    if(continous && counter >= needed)
    {
        return 1
    }
    counter = 1
    continous = true
    
    for(let i = 1; i<needed; i+=1)
    {
        
        if(y-i >= bSize || y-i < 0 || x+i >= bSize || x+i < 0 )
        {
            i = 999
        } 
        else
        {
            if(board[y][x] == board[y-i][x+i])
            {
               
                counter+=1;
            }
            else if(board[y-i][x+i] == " ")
            {
                i = 999
            }
            else
            {
                continous = false;
                i = 999
            }
        }    
    }
    for(let i = 1; i<needed; i+=1)
    {
        
        if(y+i >= bSize || y+i < 0 || x-i >= bSize || x-i < 0 )
        {
            i = 999
        } 
        else
        {
            if(board[y][x] == board[y+i][x-i])
            {
               
                counter+=1;
            }
            else if(board[y+i][x-i] == " ")
            {
                i = 999
            }
            else
            {
                continous = false;
                i = 999
            }
        }    
    }
    if(continous && counter >= needed)
    {
        return 1
    }


    // Vertically
    counter = 1
    continous = true
    
    for(let i = 1; i<needed; i+=1)
    {
        
        if(y-i >= bSize || y-i < 0)
        {
            i = 999
        } 
        else
        {
            if(board[y][x] == board[y-i][x])
            {
                counter+=1;
            }
            else if(board[y-i][x] == " ")
            {
                i = 999
            }
            else
            {
                continous = false;
                i = 999
            }
        }    
    }
    for(let i = 1; i<needed; i+=1)
    {
        
        if(y+i >= bSize || y+i < 0)
        {
            i = 999
        } 
        else
        {
            if(board[y][x] == board[y+i][x])
            {
                counter+=1;
            }
            else if(board[y+i][x] == " ")
            {
                i = 999
            }
            else
            {
                continous = false;
                i = 999
            }
        }    
    }
    if(continous && counter >= needed)
    {
        return 1
    }
    // Horizontally
    counter = 1
    continous = true
    
    for(let i = 1; i<needed; i+=1)
    {
        
        if(x-i >= bSize || x-i < 0)
        {
            i = 999
        } 
        else
        {
            if(board[y][x] == board[y][x-i])
            {
                counter+=1;
            }
            else if(board[y][x-i] == " ")
            {
                i = 999
            }
            else
            {
                continous = false;
                i = 999
            }
        }    
    }
    for(let i = 1; i<needed; i+=1)
    {
        
        if(x+i >= bSize || x+i < 0)
        {
            i = 999
        } 
        else
        {
            if(board[y][x] == board[y][x+i])
            {
                counter+=1;
            }
            else if(board[y][x+i] == " ")
            {
                i = 999
            }
            else
            {
                continous = false;
                i = 999
            }
        }    
    }
    if(continous && counter >= needed)
    {
        return 1
    }




    return 0
}
const isTie = (board) =>
{
    let bSize = board.length
    for(let i = 0; i < bSize; i+=1)
    {
        for(let j = 0; j < bSize; j+=1)
        {
            if (board[i][j] == " ")
                return false 
        }
    }
    return true
}
export {isTie, winChecker}