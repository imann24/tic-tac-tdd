describe("sanity checks", () => {
    it("can load the module", () => {
        require("../src/index.js");
    });
});

describe("setting up the app", () => {
    let index;
    beforeEach(() => {
        index = require("../src/index.js");
    });

    it("can add the game to the window" , () => {
        index.setUpGame();

        expect(document.getElementsByClassName("board").length).toBe(1);
    });

    it("can add play again button to the window", () => {
        index.setUpGame();

        const playAgainButton = document.getElementById("play-again");
        expect(playAgainButton).toBeInstanceOf(HTMLElement);
        expect(playAgainButton.onclick).toBeInstanceOf(Function);
    });
});

describe("user input", () => {
    let index;
    beforeEach(() => {
        index = require("../src/index.js");
        index.setUpGame();
    });

    it("can send a click from view to game", () => {
        document.getElementsByClassName("game-square").item(0).click();

        expect(index.getGame().getBoard()[0][0]).toBe("x");
    });

    it("draws game updates to the view", () => {
        const topLeftSquare = document.getElementsByClassName("game-square").item(0);

        topLeftSquare.click();

        expect(topLeftSquare.innerHTML).toBe("x");
    });

    it("hides 'play again' button by default", () => {
        const playAgainButton = document.getElementById("play-again");

        expect(playAgainButton.style.display).toBe("none");
    });

    it("handles a 'play again' clicked", () => {
        const game = index.getGame();
        game.placeLetter("x", 0, 0);
        game.placeLetter("o", 0, 1);
        game.placeLetter("x", 1, 0);
        game.placeLetter("o", 1, 2);
        game.placeLetter("x", 2, 0);
        index.refreshView();
        const playAgainButton = document.getElementById("play-again");

        playAgainButton.click();

        expect(game.getState().wiiner).toBeFalsy();
        expect(game.getBoard()).toMatchObject([[null, null, null],
                                               [null, null, null],
                                               [null, null, null]]);
        expect(playAgainButton.style.display).toBe("none");
        for (let x = 0; x < 9; x++) {
            const gameSquare = document.getElementsByClassName("game-square").item(x);
            expect(gameSquare.getAttribute("state")).toBe("");
        }
    });

    afterEach(() => {
        document.body.innerHTML = "";
    })
});

describe("game state", () => {
    let index;
    beforeEach(() => {
        index = require("../src/index.js");
        index.getGame().start();
        // Necessary to reset the UI each time:
        index.refreshView();
    });

    it("can refresh view", () => {
        index.refreshView();
    });

    it("can handle game win", () => {
        index.setUpGame();
        const game = index.getGame();
        game.placeLetter("x", 0, 0);
        game.placeLetter("o", 0, 1);
        game.placeLetter("x", 1, 0);
        game.placeLetter("o", 1, 2);
        game.placeLetter("x", 2, 0);
        index.refreshView();

        for (let x = 0; x < 3; x++) {
            const gameSquare = document.getElementsByClassName("game-square").item(x);
            expect(gameSquare.getAttribute("state")).toBe("win");
        }

        const winButton = document.getElementById("play-again");
        expect(winButton.style.display).toBe("block");
    })

    it("can handle game draw", () => {
        index.setUpGame();
        const game = index.getGame();
        game.placeLetter("x", 0, 0);
        game.placeLetter("o", 1, 0);
        game.placeLetter("x", 2, 0);
        game.placeLetter("o", 2, 1);
        game.placeLetter("x", 0, 1);
        game.placeLetter("o", 0, 2);
        game.placeLetter("x", 1, 1);
        game.placeLetter("o", 2, 2);
        game.placeLetter("x", 1, 2);
        index.refreshView();

        for (let i = 0; i < 9; i++) {
            const gameSquare = document.getElementsByClassName("game-square").item(i);
            expect(gameSquare.getAttribute("state")).toBeFalsy();
        }

        const winButton = document.getElementById("play-again");
        expect(winButton.style.display).toBe("block");
    })
});
