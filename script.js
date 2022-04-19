const gameBoard = (() => {
    let gameBoard_flow = [0,0,0,0,0,0,0,0,0];
    const _board = document.getElementById('board-container');
    const _cellNode = document.getElementsByClassName('cell');
    const cells = Array.from(_cellNode);

    const render = function (){
        this.gameBoard_flow.forEach((value, index) => {
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
        if(this.gameBoard_flow[cellId] == 0){
            return true;
        }
        else
            return false;
    }
    const changeBoardCell = function (cellId, mask){
        this.gameBoard_flow[cellId] = mask;
    }
    const resetBoard = () =>{
        this.gameBoard_flow = [0,0,0,0,0,0,0,0,0];
        gameBoard.gameBoard_flow = [0,0,0,0,0,0,0,0,0];
        render();
    }
    return {render, changeBoardCell, cells, checkNull, gameBoard_flow, resetBoard}
})();

const player = (name, playerMask) =>
{
    this.name = name;
    this.playerMask = playerMask;
    const playerTick = (cellId) => {
        gameBoard.changeBoardCell(cellId, playerMask);
        // console.log(gameBoard.gameBoard_flow);
        gameBoard.render();
    }
    return {name, playerMask, playerTick};
}
const player1 = player('', 'X');
const player2 = player('player2', 'O');
const game = (()=>{
    let currentPlayerTurn = player1;
    gameBoard.cells.forEach(cell => {
        cell.addEventListener('click', (e) =>{
            if(gameBoard.checkNull(e.target.id)){
                
                if(currentPlayerTurn == player1)
                {
                    player1.playerTick(e.target.id);
                    currentPlayerTurn = player2;
                    checkWinner();
                }
                else{
                    player2.playerTick(e.target.id);
                    currentPlayerTurn = player1;
                    checkWinner();
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
        let result = '';
        if(!gameBoard.gameBoard_flow.includes(0)){
            result = 1;
        }
        else{
            const winCases = [120, 345, 678, 630, 471, 852, 840, 642];
            for (let winCase of winCases)
            {
                winCase = winCase.toString().split('');
                let digits = winCase.map(Number)
                let resultCheck = _checkRowCol(digits[0],digits[1],digits[2])
                console.log(resultCheck);
                if(resultCheck == 'X' || resultCheck == 'O'){
                    result =  resultCheck;
                    break;
                }
            }
        }
        console.log(result);
        if(result == 'X'){
            setTimeout(function() {
                alert(`${player1.name} win!`);
                gameBoard.resetBoard()
                currentPlayerTurn = player1;
            },20)
        }
        if(result == 'O'){
            setTimeout(function() {
                alert(`${player2.name} win!`);
                gameBoard.resetBoard()
                currentPlayerTurn = player1;
            },20)
        }
        
        if(result == 1){
            setTimeout(function() {
                alert(`DRAW`);
                gameBoard.resetBoard()
                currentPlayerTurn = player1;
            },20)
        }

    }
}
)();
const displayController = (()=>{
    const startBtn = document.getElementById('startBtn');
    const nameInput = document.getElementById('name');
    const resetBtn = document.getElementById('reset');
    startBtn.addEventListener('click', (e)=>{
        player1.name = nameInput.value;
    })
    resetBtn.addEventListener('click', (e)=>{
        gameBoard.resetBoard();
    })
})();
