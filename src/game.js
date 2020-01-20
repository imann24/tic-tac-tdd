const xSymbol = "x";
const oSymbol = "o";
const allowedLetters = new Set([xSymbol, oSymbol]);
const boardSize = 3;
let board;
let state;

const start = () => {
    board = new Array(boardSize);
    for (let column = 0; column < boardSize; column++) {
        board[column] = new Array(boardSize).fill(null);
    }
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
            state.turn === letter &&
            !state.winner;
};

const checkForWin = () => {
    // Horizontal && Vertical
    for (let i = 0; i < boardSize; i++) {
        let potentialHorizontalWinner = board[0][i];
        let potentialVerticalWinner = board[i][0];
        for (let j = 1; j < boardSize; j++) {
            if (potentialHorizontalWinner !== board[j][i]) {
                potentialHorizontalWinner = false;
            }
            if (potentialVerticalWinner !== board[i][j]) {
                potentialVerticalWinner = false;
            }
        }
        if (potentialHorizontalWinner) {
            state.winner = potentialHorizontalWinner;
            return;
        }
        if (potentialVerticalWinner) {
            state.winner = potentialVerticalWinner;
            return;
        }
    }

    // Diagonal
    for (const letter of allowedLetters) {
        if (board[0][0] === letter && 
            board[1][1] === letter && 
            board[2][2] === letter) {
            state.winner = letter;
            return;
        }
        if (board[2][0] === letter && 
            board[1][1] === letter && 
            board[0][2] === letter) {
            state.winner = letter;
            return;
        }
    }

};

const placeLetter = (letter, x, y) => {
    if (isValidMove(letter, x, y)) {
        board[x][y] = letter;
        state.turn = nextTurn(letter);
        checkForWin();
    }
};

module.exports = {
    start,
    getBoard,
    getState,
    placeLetter
};
