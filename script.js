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
            else{
                cells[index].textContent = '';
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
    const resetBoard = () =>{
        gameBoard_flow = [0,0,0,0,0,0,0,0,0];
        gameBoard.render();
    }
    return {render, changeBoardCell, cells, checkNull, gameBoard_flow, resetBoard}
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
                    if(checkWinner() != 0){
                        if(checkWinner() == 'X'){
                            setTimeout(function() {
                                alert("player 1 win");
                                gameBoard.resetBoard()
                            },20)
                            //setTimeout(gameBoard.resetBoard(),21);
                        }
                        else{
                            setTimeout(function() {
                                alert("player 2 win");
                                gameBoard.resetBoard()
                            },20)
                            //setTimeout(gameBoard.resetBoard(),21);
                        }
                    }
                }
                else{
                    player2.playerTick(e.target.id);
                    currentPlayerTurn = player1;
                    if(checkWinner() != 0){
                        if(checkWinner() == 'X'){
                            setTimeout(function() {
                                alert("player 1 win");
                                gameBoard.resetBoard()
                            },20)
                            //setTimeout(gameBoard.resetBoard(),21);
                        }
                        else{
                            setTimeout(function() {
                                alert("player 2 win");
                                gameBoard.resetBoard()
                            },20)
                            //setTimeout(gameBoard.resetBoard(),21);
                        }
                    }
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
        if(gameBoard.gameBoard_flow[y] == 'O' )
            oCount++;
        if(gameBoard.gameBoard_flow[z] == 'X' )
            xCount++;
        if(gameBoard.gameBoard_flow[z] == 'O' )
            oCount++;
        if(xCount == 3)
            return 'X';
        if (oCount == 3 )
            return 'O';
        return '0';
    }
    const checkWinner = () =>{
        const winCases = [120, 345, 678, 630, 471, 852, 840, 642];
        for (let winCase of winCases)
        {
            winCase = winCase.toString().split('');
            let digits = winCase.map(Number)
            let resultCheck = _checkRowCol(digits[0],digits[1],digits[2])
            // console.log(digits);
            if(resultCheck === 'X' || resultCheck === 'O'){
                return resultCheck;
                break;
            }
        }
        return '0';
    }
}
)();
gameBoard.render();