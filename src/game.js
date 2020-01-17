const xSymbol = "x";
const oSymbol = "o";
const allowedLetters = new Set([xSymbol, oSymbol]);
const boardSize = 3;
let board;
let state;

const start = () => {
    board = new Array(boardSize).fill(Array(boardSize).fill(null));
    state = {
        turn: xSymbol,
        winner: false
    };
};

const getBoard = () => {
    return board;
};

const getState = () => {
    return state;
};

const inBounds = (x, y) => {
    return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
}

const nextTurn = (letter) => {
    return letter == xSymbol ? oSymbol : xSymbol;
};

const isValidMove = (letter, x, y) => {
    return allowedLetters.has(letter) && 
            inBounds(x, y) && 
            board[x][y] === null &&
            state.turn === letter;
};

const placeLetter = (letter, x, y) => {
    if (isValidMove(letter, x, y)) {
        board[x][y] = letter;
        state.turn = nextTurn(letter);
    }
};

module.exports = {
    start,
    getBoard,
    getState,
    placeLetter
};
