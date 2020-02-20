const contants = require("./constants.js"),
    logger = require("./logger.js"),
    boardSize = contants.BOARD_SIZE,
    drawStatus = contants.GAME_DRAW_STATUS;

const xSymbol = "x";
const oSymbol = "o";
const allowedLetters = new Set([xSymbol, oSymbol]);
let board;
let state;

const start = () => {
    board = new Array(boardSize);
    for (let column = 0; column < boardSize; column++) {
        board[column] = new Array(boardSize).fill(null);
    }
    state = {
        turn: xSymbol,
        winner: false,
        winningPositions: []
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
    let unplacedSquares = boardSize ** 2;

    // Horizontal && Vertical
    const countPlacedInColumn = (column) => {
        return board[column].filter((v) => v !== null).length;
    };
    for (let i = 0; i < boardSize; i++) {
        unplacedSquares -= countPlacedInColumn(i);
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
            state.winningPositions = Array.from({ length: 3 }, (v, n) => [n, i]);
            return;
        }
        if (potentialVerticalWinner) {
            state.winner = potentialVerticalWinner;
            state.winningPositions = Array.from({ length: 3 }, (v, n) => [i, n]);
            return;
        }
    }
    // Diagonal
    let potentialNorthWestWinner = board[0][0];
    let potentialSouthWestWinner = board[0][boardSize - 1];
    for (let i = 1; i < boardSize; i++) {
        if (potentialNorthWestWinner !== board[i][i]) {
            potentialNorthWestWinner = false;
        }
        if (potentialSouthWestWinner !== board[i][boardSize - i - 1]) {
            potentialSouthWestWinner = false;
        }
    }
    if (potentialNorthWestWinner) {
        state.winner = potentialNorthWestWinner;
        state.winningPositions = [[0, 0], [1, 1], [2, 2]];
        return;
    }
    if (potentialSouthWestWinner) {
        state.winner = potentialSouthWestWinner;
        state.winningPositions = [[0, 2], [1, 1], [2, 0]];
        return;
    }

    if (unplacedSquares === 0) {
        state.winner = drawStatus;
        return;
    }
};

const placeLetter = (letter, x, y) => {
    if (isValidMove(letter, x, y)) {
        board[x][y] = letter;
        state.turn = nextTurn(letter);
        checkForWin();
    } else {
        logger.debug(`Invalid move for ${letter} at (${x}, ${y})`);
    }
};

module.exports = {
    start,
    getBoard,
    getState,
    placeLetter
};
