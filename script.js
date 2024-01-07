function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "number-row"
        
        for (let j = 0; j < 4; j++) {
            let box = document.createElement("div")
            box.className = "number-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

initBoard()
