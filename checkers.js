
const gameBoard = document.querySelector("#checkers-board");


const startingBoard = [
    'w', '', 'w', '', 'w', '', 'w', '',
    '', 'w', '', 'w', '', 'w', '', 'w',
    'w', '', 'w', '', 'w', '', 'w', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', 'b', '', 'b', '', 'b', '', 'b',
    'b', '', 'b', '', 'b', '', 'b', '',
    '', 'b', '', 'b', '', 'b', '', 'b'
]



function createBoard() {
    startingBoard.forEach((startingBoard, i) => {
        const square = document.createElement('div');
        square.classList.add('square');

        const row = Math.floor(i / 8);

        if (row % 2 == 0) {
            square.classList.add(i % 2 == 0 ? "beige" : "brown");
        }
        else {
            square.classList.add(i % 2 == 0 ? "brown" : "beige");
        }


        //square.textContent = startingBoard;
        square.setAttribute('square-id', i);
        gameBoard.append(square);
    })
}


createBoard();
