
let board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

const resultText = document.getElementById("result");

let opponentNextMove = [0,0];

let gameOver = false;

let playerTurn = true;

const hardMode = document.getElementById("HardMode");



function playerMove(row, col) {

    // cant press buttons if its not your turn
    if (!playerTurn) {
        return;
    }

    // player makes their move if the space is valid
    let moveSpace = board[row][col];

    if (moveSpace != 0 || gameOver) {
        return;
    }

    playerTurn = false;


    board[row][col] = 1;
    const button = document.getElementById(`${row},${col}`);
    button.textContent = `X`;


    // check to see if there is a winner
    let winner = checkWin();

    if (winner == 1) {
        playerWins();
        return;
    }

    if (winner == -1) {
        playerLoses();
        return;
    }

    if (winner == 10) {
        playerTie();
        return;
    }


    setTimeout(opponentTurn, 500);

}


function opponentTurn() {

    if (hardMode.checked) {
        opponentNextMove = opponentMove();
    }
    else {
        opponentNextMove = easyOponentMove();
    }

    board[opponentNextMove[0]][opponentNextMove[1]] = -1;
    const buttonNew = document.getElementById(`${opponentNextMove[0]},${opponentNextMove[1]}`);
    buttonNew.textContent = `O`;

    // check to see if there is a winner
    winner = checkWin();

    if (winner == 1) {
        playerWins();
        return;
    }

    if (winner == -1) {
        playerLoses();
        return;
    }


    playerTurn = true;


}



function checkWin() {

    // check 3 in a row
    for (i = 0; i < 3; i++) {
        if (Math.abs(board[i][0] + board[i][1] + board[i][2]) >= 3) {
            return board[i][0];
        }
    }

    // check 3 in a collunm
    for (i = 0; i < 3; i++) {
        if (Math.abs(board[0][i] + board[1][i] + board[2][i]) >= 3) {
            return board[0][i];
        }
    }

    // check the two diagonal options
    if (Math.abs(board[0][0] + board[1][1] + board[2][2]) >= 3) {
        return board[0][0];
    }

    if (Math.abs(board[2][0] + board[1][1] + board[0][2]) >= 3) {
        return board[2][0];
    }

    // search for empty spaces to move in, return 0 if so
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (board[i][j] == 0){
                return 0;
            }
        }
    }

    // otherwise draw, return 10
    return 10;
}


function opponentMove() {


    let space;

    let highest = 0;



    // search for urgent blocks
    for (i = 0; i < 3; i++) {
        if (Math.abs(board[i][0] + board[i][1] + board[i][2]) >= 2) {
            if (board[i][0] + board[i][1] + board[i][2] < 0) {
                highest = Math.random() + 10;
            }
            else {
                highest = Math.random() + 8;
            }
            for (j = 0; j < 3; j++) {
                if (board[i][j] == 0) {
                    space = [i,j]; 
                }
            }
        }
    }

    for (i = 0; i < 3; i++) {
        if (Math.abs(board[0][i] + board[1][i] + board[2][i]) >= 2) {
            if (board[0][i] + board[1][i] + board[2][i] < 0) {
                highest = Math.random() + 10;
            }
            else {
                highest = Math.random() + 8;
            }
            for (j = 0; j < 3; j++) {
                if (board[j][i] == 0) {
                    space = [j, i]; 
                }
            }
        }
    }

    if (Math.abs(board[0][0] + board[1][1] + board[2][2]) >= 2) {
        if (board[0][0] + board[1][1] + board[2][2] < 0) {
            highest = Math.random() + 10;
        }
        else {
            highest = Math.random() + 8;
        }

        if (board[0][0] == 0) {
            space = [0,0];
        }
        else if (board[1][1] == 0) {
            space = [1,1];
        }
        else if (board[2][2] == 0) {
            space = [2,2];
        }
    }

    if (Math.abs(board[2][0] + board[1][1] + board[0][2]) >= 2) {
        if (board[2][0] + board[1][1] + board[0][2] < 0) {
            highest = Math.random() + 10;
        }
        else {
            highest = Math.random() + 8;
        }


        if (board[2][0] == 0) {
            space = [2,0];
        }
        else if (board[1][1] == 0) {
            space = [1,1];
        }
        else if (board[0][2] == 0) {
            space = [0,2];
        }
    }



    // otherwise, pick a random weighted open space
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            let rand = Math.random();

            if (i == 1 && j == 1) {
                rand += 5;
            } else if (i != 1 && j != 1) {
                rand += 3;
            }


            if (board[i][j] == 0 && rand > highest) {
                highest = rand;
                space = [i,j];
            }
        }
    }

    console.log(highest);

    return space;
    
}




function easyOponentMove() {

    let space;

    let highest = 0;

    // otherwise, pick a random open space
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            let rand = Math.random() + 1;
            if (board[i][j] == 0 && rand > highest) {
                highest = rand;
                space = [i,j];
            }
        }
    }

    return space;

}



function playerWins() {
    gameOver = true;
    resultText.textContent = `You Win!`;
}



function playerLoses() {
    gameOver = true;
    resultText.textContent = `You lose... Try again?`;
}

function playerTie() {
    gameOver = true;
    resultText.textContent = `Draw... Try again?`;
}



function resetGame() {

    gameOver = false;

    board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ] ;

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            const button = document.getElementById(`${i},${j}`);
            button.textContent = ``;
        }
    }

    resultText.textContent = ``;

    playerTurn = true;

}


