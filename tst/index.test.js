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
