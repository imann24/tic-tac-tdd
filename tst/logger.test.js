describe("sanity checks", () => {
    it("can load the module", () => {
        require("../src/logger.js");
    });

    it("has a debug function", () => {
        expect(require("../src/logger.js").debug).toBeInstanceOf(Function);
    });
});

describe("debug function", () => {
    const logger = require("../src/logger.js");

    it("logs when the env var is set to correct value", () => {
        process.env.TIC_TAC_DEBUG = "true";
        const messageToLog = "Hello World!";
        console.log = jest.fn();

        logger.debug(messageToLog);

        expect(console.log.mock.calls[0][0]).toBe(`[tic-tac-tdd] ${messageToLog}`);

        delete process.env.TIC_TAC_DEBUG;
    });

    it("does not log when the env var is set to the wrong value", () => {
        process.env.TIC_TAC_DEBUG = "wrong";
        const messageToLog = "Hello World!";
        console.log = jest.fn();

        logger.debug(messageToLog);

        expect(console.log.mock.calls.length).toBe(0);

        delete process.env.TIC_TAC_DEBUG;
    });

    it("does not log when env var is unset", () => {
        delete process.env.TIC_TAC_DEBUG;
        const messageToLog = "Hello World!";
        console.log = jest.fn();

        logger.debug(messageToLog);

        expect(console.log.mock.calls.length).toBe(0);
    });
})
