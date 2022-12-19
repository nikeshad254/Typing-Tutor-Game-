let gameStatus = {
    startGame   : false,
    rightCount  : 0,
    wrongCount  : 0,
    select      : "home"
}

const topKey=['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'];
const homeKey=['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
const bottomKey=['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];
let displayKeys = [];

let display = document.getElementById("display");
let input = document.getElementById("input");


window.addEventListener("keydown", (e)=>{
    if(!gameStatus.startGame){
        console.log("i am no");
        gameStatus.startGame = true;
        gameStatus.rightCount = 0;
        gameStatus.wrongCount = 0;
        for(let i=0; i<10; i++){
            genRandom();
        }
        displayNew();
    }
});

function genRandom(){
    let key = Math.floor(Math.random() * topKey.length);
    displayKeys.push(topKey[key]);
}

function displayNew(){
    display.textContent = "";
    let str = "";
    displayKeys.forEach(element => {
        str += `${element} `;
    });
    display.textContent = str;
}
