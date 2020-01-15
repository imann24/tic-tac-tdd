it("can load the module", () => {
    require("../src/game.js");
});

it("can start a game", () => {
    const game = require("../src/game.js");
    
    game.start();
});

it("can retrieve board state", () => {
    const game = require("../src/game.js");
    game.start();
    
    const boardState = game.getBoard();
    
    expect(boardState.length).toBe(3);
    for (const column of boardState) {
        expect(column.length).toBe(3);
    }
});

it("starts with all squares on board empty", () => {
    const game = require("../src/game.js");
    game.start();
    
    const boardState = game.getBoard();

    for (const column of boardState) {
        for (const square of column) {
            expect(square).toBeNull();
        }
    }
});

it("can place a letter 'x'", () => {
    const game = require("../src/game.js");
    game.start();

    game.placeLetter("x", 0, 0);

    const letter = game.getBoard()[0][0];
    expect(letter).toBe("x");
});

it("can place a letter 'o'", () => {
    const game = require("../src/game.js");
    game.start();

    game.placeLetter("o", 0, 0);

    const letter = game.getBoard()[0][0];
    expect(letter).toBe("o");
});

it("cannot place an invalid letter", () => {
    const game = require("../src/game.js");
    game.start();

    game.placeLetter("z", 0, 0);

    const letter = game.getBoard()[0][0];
    expect(letter).toBe(null);
});

it("cannot place a letter out of bounds", () => {
    const game = require("../src/game.js");
    game.start();

    game.placeLetter("o", -1, 3);

    const boardState = game.getBoard();
    for (const column of boardState) {
        for (const square of column) {
            expect(square).toBeNull();
        }
    }
});

it("cannot replace an existing letter", () => {
    const game = require("../src/game.js");
    game.start();

    game.placeLetter("o", 0, 0);
    game.placeLetter("x", 0, 0);

    const letter = game.getBoard()[0][0];
    expect(letter).toBe("o");
});

it("resets the board on start", () => {
    const game = require("../src/game.js");
    game.start();
    game.placeLetter("o", 0, 0);
    game.placeLetter("x", 1, 1);

    game.start();

    const boardState = game.getBoard();
    for (const column of boardState) {
        for (const square of column) {
            expect(square).toBeNull();
        }
    }
})