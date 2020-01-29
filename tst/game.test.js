describe("sanity checks", () => {
    it("can load the module", () => {
        require("../src/game.js");
    });
});

describe("game logic tests", () => {
    let game;
    beforeEach(() => {
        game = require("../src/game.js");
    });

    describe("start game", () => {
        it("can start a game", () => {
            game.start();
        });

        it("resets the board on start", () => {
            game.start();
            game.placeLetter("x", 1, 1);
            game.placeLetter("o", 0, 0);
    
            game.start();
    
            const boardState = game.getBoard();
            for (const column of boardState) {
                for (const square of column) {
                    expect(square).toBeNull();
                }
            }
        })

        it("resets the game state on start", () => {
            game.start();
            game.placeLetter("x", 0, 0);
    
            game.start();
    
            const gameState = game.getState();
            expect(gameState.turn).toBe("x");
        })
    });

    describe("board state", () => {
        beforeEach(() => {
            game.start();
        });

        it("can retrieve board state", () => {            
            const boardState = game.getBoard();
            
            expect(boardState.length).toBe(3);
            for (const column of boardState) {
                expect(column.length).toBe(3);
            }
        });
    
        it("starts with all squares on board empty", () => {
            const boardState = game.getBoard();
    
            for (const column of boardState) {
                for (const square of column) {
                    expect(square).toBeNull();
                }
            }
        });
    });

    describe("game state", () => {
        beforeEach(() => {
            game.start();
        });

        it("can get the state of the game", () => {
            const gameState = game.getState();

            expect(gameState.hasOwnProperty('turn')).toBeTruthy();
            expect(gameState.hasOwnProperty('winner')).toBeTruthy();
            expect(gameState.turn).toBe("x");
            expect(gameState.winner).toBe(false);
            expect(gameState.winningPositions).toMatchObject([]);
        });

        it("can return the winning positions", () => {
            game.placeLetter("x", 0, 0);
            game.placeLetter("o", 0, 1);
            game.placeLetter("x", 1, 1);
            game.placeLetter("o", 1, 2);
            game.placeLetter("x", 2, 2);

            expect(game.getState().winningPositions).toMatchObject([[0, 0], [1, 1], [2, 2]]);
        });

        it("can identify when a player has won the game diagonally: NW -> SE", () => {
            game.placeLetter("x", 0, 0);
            game.placeLetter("o", 0, 1);
            game.placeLetter("x", 1, 1);
            game.placeLetter("o", 1, 2);
            game.placeLetter("x", 2, 2);

            expect(game.getState().winner).toBe("x");
            expect(game.getState().winningPositions).toMatchObject([[0, 0], [1, 1], [2, 2]]);
        });

        it("can identify when a player has won the game diagonally: SW -> NE", () => {
            game.placeLetter("x", 0, 2);
            game.placeLetter("o", 0, 1);
            game.placeLetter("x", 1, 1);
            game.placeLetter("o", 1, 2);
            game.placeLetter("x", 2, 0);

            expect(game.getState().winner).toBe("x");
            expect(game.getState().winningPositions).toMatchObject([[0, 2], [1, 1], [2, 0]]);
        });

        it("can identify when a player has won the game horizontally", () => {
            game.placeLetter("x", 0, 0);
            game.placeLetter("o", 0, 1);
            game.placeLetter("x", 1, 0);
            game.placeLetter("o", 1, 2);
            game.placeLetter("x", 2, 0);

            expect(game.getState().winner).toBe("x");
            expect(game.getState().winningPositions).toMatchObject([[0, 0], [1, 0], [2, 0]]);
        });

        it("can identify when a player has won the game vertically", () => {
            game.placeLetter("x", 0, 0);
            game.placeLetter("o", 1, 1);
            game.placeLetter("x", 0, 1);
            game.placeLetter("o", 1, 2);
            game.placeLetter("x", 0, 2);

            expect(game.getState().winner).toBe("x");
            expect(game.getState().winningPositions).toMatchObject([[0, 0], [0, 1], [0, 2]]);
        });

        it("can identify when a 'o' player has won the game", () => {
            game.placeLetter("x", 0, 0);
            game.placeLetter("o", 0, 1);
            game.placeLetter("x", 2, 2);
            game.placeLetter("o", 1, 1);
            game.placeLetter("x", 0, 2);
            game.placeLetter("o", 2, 1);

            expect(game.getState().winner).toBe("o");
            expect(game.getState().winningPositions).toMatchObject([[0, 1], [1, 1], [2, 1]]);
        });
    });

    describe("placing letters", () => {
        beforeEach(() => {
            game.start();
        });

        it("can place a letter 'x'", () => {
            game.placeLetter("x", 0, 0);
    
            const letter = game.getBoard()[0][0];
            expect(letter).toBe("x");
        });
    
        it("can place a letter 'o'", () => {
            game.placeLetter("x", 1, 1);
            
            game.placeLetter("o", 0, 0);
    
            const letter = game.getBoard()[0][0];
            expect(letter).toBe("o");
        });
    
        it("cannot place an invalid letter", () => {
            game.placeLetter("z", 0, 0);
    
            const letter = game.getBoard()[0][0];
            expect(letter).toBe(null);
        });
    
        it("cannot place a letter out of bounds", () => {
            game.placeLetter("o", -1, 3);
    
            const boardState = game.getBoard();
            for (const column of boardState) {
                for (const square of column) {
                    expect(square).toBeNull();
                }
            }
        });

        it("cannot replace an existing letter", () => {
            game.placeLetter("x", 0, 0);
            game.placeLetter("o", 0, 0);
    
            const letter = game.getBoard()[0][0];
            expect(letter).toBe("x");
        });

        it("turn changes after placing letter", () => {
            game.placeLetter("x", 0, 0) ;
            
            expect(game.getState().turn).toBe("o");
        });

        it("ignores moves on the wrong turn", () => {
            game.placeLetter("o", 0, 0) ;
            
            expect(game.getState().turn).toBe("x");
            const letter = game.getBoard()[0][0];
            expect(letter).toBe(null);
        });

        it("cannot place letters after game is won", () => {
            game.placeLetter("x", 0, 0);
            game.placeLetter("o", 0, 1);
            game.placeLetter("x", 1, 0);
            game.placeLetter("o", 1, 2);
            game.placeLetter("x", 2, 0);
            game.placeLetter("o", 2, 2);

            const letter = game.getBoard()[2][2];
            expect(letter).toBe(null);
        })
    });
});
