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
});

describe("user input", () => {
    let index;
    beforeEach(() => {
        index = require("../src/index.js");
    });

    it("can send a click from view to game", () => {
        index.setUpGame();

        document.getElementsByClassName("game-square").item(0).click();

        expect(index.getGame().getBoard()[0][0]).toBe("x");
    });

    it("draws game updates to the view", () => {
        index.setUpGame();
        const topLeftSquare = document.getElementsByClassName("game-square").item(0);

        topLeftSquare.click();
        
        expect(topLeftSquare.innerHTML).toBe("x");
    });

    afterEach(() => {
        document.body.innerHTML = "";
    })
});

describe("game state", () => {
    let index;
    beforeEach(() => {
        index = require("../src/index.js");
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
    })
});

