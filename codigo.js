const main = document.getElementById("main");
const sectionGame = document.querySelector(".section-game");
const formPlayers = document.getElementById("register-player");
const containMatriz = document.querySelector(".matriz");
const btnAgain = document.querySelector(".btn-again");

let turno = "X";
let win = false;
let empate = false;

let players = {
    player1 : "",
    player2 : ""
}

let matriz = [  [[""],[""],[""]],
                [[""],[""],[""]],
                [[""],[""],[""]]        ];

const registerPlayer=(e)=>{
    e.preventDefault();
    const inputPlayer1 = document.getElementById("input-player1");
    const inputPlayer2 = document.getElementById("input-player2");
    if(inputPlayer1.value != "" && inputPlayer2.value != ""){
        players.player1 = inputPlayer1.value;
        players.player2 = inputPlayer2.value;
        startGame();
        e.target.reset();
    }
}
const startGame=()=>{
    sectionGame.style.display = "flex";
    formPlayers.style.display = "none";
    sectionGame.firstElementChild.innerHTML = `Turno de: <b>${players.player1}</b>`;
    for (const items of containMatriz.children) {
        items.addEventListener("click",()=>{
            let i = items.classList.item(1).substring(0,1);
            let j = items.classList.item(1).substring(1,2);
            if(matriz[i][j] == "" && win == false){
                items.textContent = turno;
                matriz[i][j] = turno;
                verificarWin();
                cambiarTurno();
            }
        });
    }
};
const verificarWin=()=>{
    for(let i=0;i<3;i++){
        if( (matriz[i][0]=="X" && matriz[i][1]=="X" && matriz[i][2]=="X")||
            (matriz[i][0]=="O" && matriz[i][1]=="O" && matriz[i][2]=="O")){
            winner();
            win = true;
            }
        if( (matriz[0][i]=="X" && matriz[1][i]=="X" && matriz[2][i]=="X")||
            (matriz[0][i]=="O" && matriz[1][i]=="O" && matriz[2][i]=="O")){
            winner();
            win = true;
        };
    }
    if( (matriz[0][0]=="X" && matriz[1][1]=="X" && matriz[2][2]=="X")||
    (matriz[0][0]=="O" && matriz[1][1]=="O" && matriz[2][2]=="O")){
        winner();
        win = true;
    };
    if( (matriz[2][0]=="X" && matriz[1][1]=="X" && matriz[0][2]=="X")||
    (matriz[2][0]=="O" && matriz[1][1]=="O" && matriz[0][2]=="O")){
        winner();
        win = true;
    };
    if( (matriz[0][0]!="" && matriz[0][1]!="" && matriz[0][2]!="")&&
        (matriz[1][0]!="" && matriz[1][1]!="" && matriz[1][2]!="")&&
        (matriz[2][0]!="" && matriz[2][1]!="" && matriz[2][2]!="")&&(win == false)){
            empate = true;
        empateMessage();
    };
}
const showButton =(message)=>{
    btnAgain.style.display = "block"; 
    btnAgain.textContent = message;
    btnAgain.addEventListener("click",playAgain);
}
const empateMessage=()=>{
    sectionGame.firstElementChild.textContent = `Nadie ganó, Empate`;   
    showButton("Volver a jugar");
}
const winner=()=>{
    if(turno == "X"){
        sectionGame.firstElementChild.textContent = `Felicidades ${players.player1} le has ganado a ${players.player2}`;    
    }else if(turno == "O"){
        sectionGame.firstElementChild.textContent = `Felicidades ${players.player2} le has ganado a ${players.player1}`; 
    }
    showButton("Revancha");
}
const cambiarTurno =()=>{
    let playerTurn;
    if(turno == "X") {
        playerTurn = players.player2;
        turno = "O";
    }else {
        playerTurn = players.player1;
        turno = "X";
    };
    if(win == false && empate == false)
    sectionGame.firstElementChild.innerHTML = `Turno de: <b>${playerTurn}</b>`;
}
function playAgain(){
    btnAgain.style.display = "none";
    turno = "X";
    win = false;
    empate = false;
    for (const items of containMatriz.children) {
        items.textContent = "";
    }
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            matriz[i][j] = "";
        }
    }
    startGame();
}

formPlayers.addEventListener("submit",registerPlayer);