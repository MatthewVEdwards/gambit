
let board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];




function playerMove(row, col) {
    // player makes their move if the space is valid
    let moveSpace = board[row][col];

    if (moveSpace != 0) {
        return;
    }


    board[row][col] = 1;
    const button = document.getElementById(`${row},${col}`);
    button.textContent = `X`;


    // check to see if there is a winner
    let winner = checkWin();

    if (winner == 1) {
        playerWins();
    }

    if (winner == 2) {
        playerLoses();
    }

}


function checkWin() {

    // check 3 in a row
    for (i = 0; i < 3; i++) {
        if (board[i][0] != 0 && board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
            return board[i][0];
        }
    }

    // check 3 in a collunm
    for (i = 0; i < 3; i++) {
        if (board[i][0] != 0 && board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
            return board[0][i];
        }
    }

    // check the two diagonal options
    if (board[0][0] != 0 && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
        return board[0][0];
    }

    if (board[2][0] != 0 && board[2][0] == board[1][1] && board[1][1] == board[0][2]) {
        return board[2][0];
    }

    // if no 3 in a row, return 0
    return 0;
    
}


function randOponentMove() {
    let randomX = Math.floor((Math.random() * 3));
    let randomY = Math.floor((Math.random() * 3));

    while (board[randomX][randomY] != 0) {
        randomX = Math.floor((Math.random() * 3));
        randomY = Math.floor((Math.random() * 3));
    }

    board[row][col] = 2;
    const button = document.getElementById(`${row},${col}`);
    button.textContent = `O`;


}



function playerWins() {

}



function playerLose() {
    
}


