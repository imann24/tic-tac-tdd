const debug = (message) => {
    if (process.env.TIC_TAC_DEBUG === "true") {
        console.log(`[tic-tac-tdd] ${message}`);
    }
}

module.exports = {
    debug
}
