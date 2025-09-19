

let board;

let move;

document.getElementById("moveButton").onclick = function(){
    move = document.getElementById("playerMove").value;
    console.log(move);
}


class Piece{
    constructor(name, value){
        this.name = name;
        this.value = value;
    }
}
