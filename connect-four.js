
const cols = document.querySelectorAll(".col");

//const cells = document.querySelectorAll(".cell");

const statusText = document.querySelector("#statusText");

const restartBtn = document.querySelector("#restartBtn");

const indCell = document.getElementById("indCell");


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



function initializeGame() {
    cols.forEach(cols => cols.addEventListener("click", colClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Reds Turn`;
    changeIndicator(1);
    running = true;
}

function colClicked() {

    const colIdx = this.getAttribute("cellIndex");

    if (board[Number(colIdx)][0] != 0 || !running) {
        return;
    }

    updateCell(colIdx);

    let winner = checkWinner();

    if (winner == 1) {
        statusText.textContent = `Red Wins!`
        changeIndicator(1);
        running = false;
        return;
    }
    else if (winner == -1) {
        statusText.textContent = `Blue Wins!`
        changeIndicator(-1);
        running = false;
        return;
    }
    else if (winner == 10) {
        statusText.textContent = `Draw...`
        indCell.classList.remove("player-red", "player-blue");
        running = false;
        return;
    }


    currentPlayer *= -1;

    if (currentPlayer == 1) {
        statusText.textContent = `Reds Turn`
        changeIndicator(1);
    }
    else {
        statusText.textContent = `Blues Turn`
        changeIndicator(-1);
    }

}

function updateCell(index) {

    for (i = 5; i >= 0; i--) {

        //let calcIndex = i * 7 + Number(index);

        if (board[index][i] == 0) {

            board[index][i] = currentPlayer;

            const cellChanged = cells[index][i];

            //currentPlayer > 0 ? cellChanged.textContent = "X" : cellChanged.textContent = "O";
            currentPlayer > 0 ? cellChanged.classList.add("player-red") : cellChanged.classList.add("player-blue");


            return;
        }



    }

}

function restartGame() {

    for (i = 0; i < 7; i++) {
        for (j = 0; j < 6; j++) {
            board[i][j] = 0;
            const cellChanged = cells[i][j];
            cellChanged.classList.remove("player-red", "player-blue", "player-win");
        }
    }

    statusText.textContent = "Reds Turn"

    running = true;
}

function checkWinner() {
    
    // check vertical
    for (i = 0; i < cols.length; i++) {
        for (j = 0; j < 3; j++) {
            if (Math.abs(board[i][j] + board[i][j + 1] + board[i][j + 2] + board[i][j + 3]) == 4) {
                
                hightlightWinner(i,j,"vert")
                
                return board[i][j];
            }
        }
    }

    // check horizontal
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 4; j++) {
            if (Math.abs(board[j][i] + board[j + 1][i] + board[j + 2][i] + board[j + 3][i]) == 4) {
                
                hightlightWinner(j,i,"hor")

                return board[j][i];
            }
        }
    }

    // check diagonals

    for (i = 0; i < 4; i++) {
        for (j = 0; j < 3; j++) {

            if (Math.abs(board[i][j] + board[i + 1][j + 1] + board[i + 2][j + 2] + board[i + 3][j + 3]) == 4) {
                hightlightWinner(i,j,"diag1")
                return board[i][j];
            }

            if (Math.abs(board[i + 3][j] + board[i + 2][j + 1] + board[i + 1][j + 2] + board[i][j + 3]) == 4) {
                hightlightWinner(i,j,"diag2")
                return board[i + 3][j];
            }

        }
    }

    console.log(board);


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



function changeIndicator(value) {
    indCell.classList.remove("player-red", "player-blue");
    
    if (value == 1) {
        indCell.classList.add("player-red");
    }
    else {
        indCell.classList.add("player-blue");
    }
}


function hightlightWinner(col, row, arrangemnt) {

    let cellChanged1;
    let cellChanged2;
    let cellChanged3;
    let cellChanged4;

    switch (arrangemnt) {
        case "vert":
            cellChanged1 = cells[col][row];
            cellChanged2 = cells[col][row + 1];
            cellChanged3 = cells[col][row + 2];
            cellChanged4 = cells[col][row + 3];

            cellChanged1.classList.add("player-win");
            cellChanged2.classList.add("player-win");
            cellChanged3.classList.add("player-win");
            cellChanged4.classList.add("player-win");

            break;
        case "hor":
            cellChanged1 = cells[col][row];
            cellChanged2 = cells[col+1][row];
            cellChanged3 = cells[col+2][row];
            cellChanged4 = cells[col+3][row];

            cellChanged1.classList.add("player-win");
            cellChanged2.classList.add("player-win");
            cellChanged3.classList.add("player-win");
            cellChanged4.classList.add("player-win");

            break;
        case "diag1":
            cellChanged1 = cells[col][row];
            cellChanged2 = cells[col+1][row+1];
            cellChanged3 = cells[col+2][row+2];
            cellChanged4 = cells[col+3][row+3];

            cellChanged1.classList.add("player-win");
            cellChanged2.classList.add("player-win");
            cellChanged3.classList.add("player-win");
            cellChanged4.classList.add("player-win");

            break;
        case "diag2":
            cellChanged1 = cells[col+3][row];
            cellChanged2 = cells[col+2][row+1];
            cellChanged3 = cells[col+1][row+2];
            cellChanged4 = cells[col][row+3];

            cellChanged1.classList.add("player-win");
            cellChanged2.classList.add("player-win");
            cellChanged3.classList.add("player-win");
            cellChanged4.classList.add("player-win");

            break;
    }
}

