const boardSize = require("./constants.js").BOARD_SIZE;

const gameSquareClass = "game-square";
const stateAttribute = "state";
const listeners = [];
let squares;
let playAgainButton;

const createSquare = (x, y) => {
    const square = document.createElement("div");

    square.className = gameSquareClass;
    square.setAttribute("data-x", x);
    square.setAttribute("data-y", y);
    square.onclick = notifyListeners;

    return square;
};

const createBoard = () => {
    const boardView = document.createElement("div");

    boardView.className = "board";

    squares = [];
    for (let y = 0; y < boardSize; y++) {
        squares.push([]);
        for (let x = 0; x < boardSize; x++) {
            const newSquare = createSquare(x, y);
            squares[y].push(newSquare);
            boardView.appendChild(newSquare);
        }
    }

    return boardView;
};

const createPlayAgainButton = (onPlayAgain) => {
    playAgainButton = document.createElement("div");

    playAgainButton.id = "play-again";
    playAgainButton.style.display = "none";
    playAgainButton.innerText = "Play Again";
    playAgainButton.onclick = onPlayAgain;

    return playAgainButton;
};

const drawBoard = (board) => {
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            const squareUsed = board[x][y] != null;
            squares[y][x].innerHTML = board[x][y] || "";
            squares[y][x].className = squareUsed ? `${gameSquareClass} ${board[x][y]}` : gameSquareClass;
            if (!board[x][y]) {
                squares[x][y].setAttribute(stateAttribute, "");
            }
        }
    }
};

const togglePlayAgainVisible = (isVisible) => {
    playAgainButton.style.display = isVisible ? "block" : "none";
}

const notifyListeners = (click) => {
    listeners.forEach((listener) => {
        listener(click.target);
    });
};

const listenForClicks = (listener) => {
    listeners.push(listener);
};

const getSquare = (x, y) => {
    return squares[y][x];
};

const showWin = (positions) => {
    for (const pos of positions) {
        squares[pos[1]][pos[0]].setAttribute(stateAttribute, "win");
    }
};

module.exports = {
    createBoard,
    createPlayAgainButton,
    drawBoard,
    togglePlayAgainVisible,
    listenForClicks,
    getSquare,
    showWin
};
