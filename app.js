let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const statusDisplay = document.querySelector('.status');

const winnerWinner = () => `${currentPlayer} is the winner!`;
const draw = () => `It's a draw! Play again?`;
const currentPlayerTurn = () => `${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function displayPlayers(){
    const displayP1 = document.getElementById("display");
    const name = document.getElementById("p1").value;
    const name2 = document.getElementById("p2").value;
    displayP1.innerHTML=name + " VS " + name2;
}
displayPlayers();

function clickIt(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function takeTurns() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function winLoseDraw() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningStates[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winnerWinner();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = draw();
        gameActive = false;
        return;
    }

    takeTurns();
}

function cellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('cellIndex'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    clickIt(clickedCell, clickedCellIndex);
    winLoseDraw();
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => 
cell.addEventListener('click', cellClick));