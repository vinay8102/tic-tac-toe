const cells = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('game-board');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    if (checkWin()) {
        gameStatus.innerText = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (gameState.includes("")) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.innerText = `${currentPlayer}'s turn`;
    } else {
        gameStatus.innerText = `It's a tie!`;
        gameActive = false;
    }
};

const checkWin = () => {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] === currentPlayer &&
               gameState[a] === gameState[b] &&
               gameState[a] === gameState[c];
    });
};

const handleRestartGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameStatus.innerText = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.innerText = "");
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
gameStatus.innerText = `${currentPlayer}'s turn`;
