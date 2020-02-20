require("./static/css/style.css");

const game = require("./game.js"),
    view = require("./view.js"),
    logger = require("./logger.js"),
    drawState = require("./constants.js").GAME_DRAW_STATUS;

const setUpGame = () => {
    game.start();
    addGameToWindow();
    handleClicks();
};

const addGameToWindow = () => {
    document.body.appendChild(view.createBoard());
    document.body.appendChild(view.createPlayAgainButton(() => {
        game.start();
        view.togglePlayAgainVisible(false);
        refreshView();
    }));
}

const handleClicks = () => {
    view.listenForClicks((elem) => {
        const letter = game.getState().turn;
        const x = parseInt(elem.getAttribute("data-x"));
        const y = parseInt(elem.getAttribute("data-y"));
        game.placeLetter(letter, x, y);
        refreshView();
    });
};

const refreshView = () => {
    view.drawBoard(game.getBoard());
    const gameState = game.getState();
    if (gameState.winner) {
        logger.debug(`Win state is ${gameState.winner}`);
        if (gameState.winner !== drawState) {
            view.showWin(gameState.winningPositions);
        }
        view.togglePlayAgainVisible(true);
    }
};

const getGame = () => {
    return game;
}

window.addEventListener("load", setUpGame);

module.exports = {
    setUpGame,
    refreshView,
    getGame
};
