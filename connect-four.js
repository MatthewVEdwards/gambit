
const cols = document.querySelectorAll(".col");

//const cells = document.querySelectorAll(".cell");

const statusText = document.querySelector("#statusText");

const restartBtn = document.querySelector("#restartBtn");




let board = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
];


let cells = [];

for (i = 0; i < cols.length; i++) {
    cells[i] = cols[i].querySelectorAll(".cell");
}


let currentPlayer = 1;

let running = false;


// The real running section of the code starts here

initializeGame();

console.log("win conditions bugged, especially diagonals. pls fix")


function initializeGame() {
    cols.forEach(cols => cols.addEventListener("click", colClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Enjoy the game! :D`;
    running = true;
}

function colClicked() {

    const colIdx = this.getAttribute("cellIndex");

    if (board[Number(colIdx)][0] != 0 || !running) {
        return;
    }

    updateCell(colIdx);

    let winner = checkWinner();

    if (winner == 1 || winner == -1) {
        statusText.textContent = `Winner detected! :D`
        running = false;
    }
    else if (winner == 10) {
        statusText.textContent = `Draw detected... :/`
        running = false;
    }


    currentPlayer *= -1;

}

function updateCell(index) {

    for (i = 5; i >= 0; i--) {

        //let calcIndex = i * 7 + Number(index);

        if (board[index][i] == 0) {

            board[index][i] = currentPlayer;

            const cellChanged = cells[index][i];

            currentPlayer > 0 ? cellChanged.textContent = "X" : cellChanged.textContent = "O";

            return;
        }



    }

}

function restartGame() {

    for (i = 0; i < 7; i++) {
        for (j = 0; j < 6; j++) {
            board[i][j] = 0;
            const cellChanged = cells[i][j];
            cellChanged.textContent = "";
        }
    }

    statusText.textContent = "Enjoy the game! :D"

    running = true;
}

function checkWinner() {
    
    // check vertical
    for (i = 0; i < cols.length; i++) {
        for (j = 0; j < 3; j++) {
            if (Math.abs(board[i][j] + board[i][j + 1] + board[i][j + 2] + board[i][j + 3]) == 4) {
                return board[i][j];
            }
        }
    }

    // check horizontal
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 4; j++) {
            if (Math.abs(board[j][i] + board[j + 1][i] + board[j + 2][i] + board[j + 3][i]) == 4) {
                return board[j][i];
            }
        }
    }

    // check diagonals

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 4; j++) {
            if (Math.abs(board[i][j] + board[i + 1][j + 1] + board[i + 2][j + 2] + board[i + 3][j + 3]) == 4) {
                return board[i][j];
            }
        }
    }


    for (i = 0; i < 3; i++) {
        for (j = 0; j < 4; j++) {
            if (Math.abs(board[i + 3][j] + board[i + 2][j + 1] + board[i + 1][j + 2] + board[i][j + 3]) == 4) {
                return board[i][j];
            }
        }
    }


    // check for draw or return 0 for no winners yet

    for (i = 0; i < 7; i++) {
        for (j = 0; j < 6; j++) {
            if (board[i][j] == 0) {
                return 0;
            }
        }
    }


    //draw
    return 10;

}


