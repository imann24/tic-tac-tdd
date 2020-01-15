const allowedLetters = new Set(["x", "o"]);
const boardSize = 3;
let board;

const start = () => {
    board = new Array(boardSize).fill(Array(boardSize).fill(null));
};

const getBoard = () => {
    return board;
};

const inBounds = (x, y) => {
    return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
}

const placeLetter = (letter, x, y) => {
    if (allowedLetters.has(letter) && inBounds(x, y) && board[x][y] == null) {
        board[x][y] = letter;
    }
};

module.exports = {
    start,
    getBoard,
    placeLetter
};
