const boardSize = require("./constants.js").BOARD_SIZE;

const listeners = [];
let squares;

const createSquare = (x, y) => {
    const square = document.createElement("div");
    
    square.className = "game-square";
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

const drawBoard = (board) => {
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            squares[y][x].innerHTML = board[x][y] || "";
        }
    }
};

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

module.exports = {
    createBoard,
    drawBoard,
    listenForClicks,
    getSquare
};
