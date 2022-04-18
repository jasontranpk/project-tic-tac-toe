const gameBoard = (() => {
    let gameBoard_flow = [0,0,0,0,0,0,0,0,0];
    const _board = document.getElementById('board-container');
    const _cellNode = document.getElementsByClassName('cell');
    const cells = Array.from(_cellNode);

    const render = function (){
        gameBoard_flow.forEach((value, index) => {
            if(value == 'X'){
                cells[index].textContent = 'X';
            }
            else if(value == 'O'){
                cells[index].textContent = 'O';
            }
        })
    };
    const checkNull = function(cellId){
        if(gameBoard_flow[cellId] == 0){
            return true;
        }
        else
            return false;
    }
    const changeBoardCell = function (cellId, mask){
        gameBoard_flow[cellId] = mask;
    }
    return {render, changeBoardCell, cells, checkNull, gameBoard_flow}
})();

const player = (name, playerMask) =>
{
    this.name = name;
    this.playerMask = playerMask;
    const playerTick = (cellId) => {
        gameBoard.changeBoardCell(cellId, playerMask);
        gameBoard.render();
    }
    return {name, playerMask, playerTick};
}
const player1 = player('jason', 'X');
const player2 = player('computer', 'O');
const game = (()=>{
    let currentPlayerTurn = player1;
    gameBoard.cells.forEach(cell => {
        cell.addEventListener('click', (e) =>{
            if(gameBoard.checkNull(e.target.id)){
                if(currentPlayerTurn == player1)
                {
                    player1.playerTick(e.target.id);
                    currentPlayerTurn = player2;
                    console.log(checkWinner());
                }
                else{
                    player2.playerTick(e.target.id);
                    currentPlayerTurn = player1;
                    console.log(checkWinner());
                }
            }
        })
    })
    const _checkRowCol = (x,y,z) =>{
        let xCount = 0;
        let oCount = 0;
        if(gameBoard.gameBoard_flow[x] == 'X' )
            xCount++;
        if(gameBoard.gameBoard_flow[x] == 'O' )
            oCount++;
        if(gameBoard.gameBoard_flow[y] == 'X' )
            xCount++;
        if(gameBoard.gameBoard_flow[x] == 'O' )
            oCount++;
        if(gameBoard.gameBoard_flow[z] == 'X' )
            xCount++;
        if(gameBoard.gameBoard_flow[x] == 'O' )
            oCount++;
        if(xCount == 3)
            return 'X';
        if (oCount == 3 )
            return 'O';
        return false;
    }
    const checkWinner = () =>{
        if(_checkRowCol(0,1,2)){
            return _checkRowCol(0,1,2);
        }
    }
}
)();
gameBoard.render();