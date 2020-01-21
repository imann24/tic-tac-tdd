describe("sanity checks", () => {
    it("can load the module", () => {
        require("../src/view.js");
    });
});

describe("drawing", () => {
    let view;
    beforeEach(() => {
        view = require("../src/view.js");
    });

    it("can create the game board", () => {
        const board = view.createBoard();

        expect(board).toBeInstanceOf(HTMLElement);
        expect(board.className).toBe("board");
        expect(board.children.length).toBe(9);
        expect(board.getElementsByClassName("game-square").length).toBe(9);
        for (let i = 0; i < 9; i++) {
            const elem = board.children.item(i);
            expect(elem.getAttribute("data-x")).toBe((i % 3).toString());
            expect(elem.getAttribute("data-y")).toBe((Math.floor(i / 3)).toString());
        }
    });

    it("can draw a board", () => {
        const board = view.createBoard();

        view.drawBoard([["x", "o", null],
                        [null, null, null],
                        [null, null, null]]);

        expect(view.getSquare(0, 0).innerHTML).toBe("x");
        expect(view.getSquare(0, 1).innerHTML).toBe("o");
    })
});

describe("player input", () => {
    let view;
    beforeEach(() => {
        view = require("../src/view.js");
    });

    it("provides a method to listen for clicks", () => {
        const listener = () => {};
        
        view.listenForClicks(listener);
    });

    it("notifies listener when an element is clicked on", () => {
        let clickedElement;

        const listener = (elem) => {
            clickedElement = elem;
        };
        const board = view.createBoard();
        view.listenForClicks(listener);

        board.children.item(0).click();

        expect(clickedElement).toBeInstanceOf(HTMLElement);
        expect(clickedElement.getAttribute("data-x")).toBe("0");
        expect(clickedElement.getAttribute("data-y")).toBe("0");
    });
})
