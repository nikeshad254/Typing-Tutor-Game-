let gameStatus = {
    startGame   : false,
    rightCount  : 0,
    wrongCount  : 0,
    select      : "top",
    typeIndex   : 0
}

const topKey=['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'];
const homeKey=['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
const bottomKey=['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];
let displayKeys = [];

let display = document.getElementById("display");
let input = document.getElementById("input");
//generated ones
let displayItems = document.getElementsByClassName("displayItems");


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
    gameStatus.typeIndex = 0;
    display.innerHTML = "";
    let str = "";
    displayKeys.forEach(element => {
        str += `<p class="displayItems">${element}</p>`;
    });
    display.innerHTML = str;
    highlight();
}

function highlight(){
    displayItems[gameStatus.typeIndex].style.color = "var(--pure-green)";

    for(let i=0; i<gameStatus.typeIndex; i++){
        displayItems[i].style.color = "var(--dark-green)";
    }

    let index = topKey.indexOf(displayItems[gameStatus.typeIndex].textContent);
    let keyboard = document.getElementsByClassName("top");
    for(let i=0; i<keyboard.length; i++){
        keyboard[i].style.border = "1px solid var(--dark-green)";
    }
    keyboard[index].style.border = "3px solid var(--pure-green)";
}

input.addEventListener("input", (e)=>{
    // console.log(e);
    //console.log(displayItems[gameStatus.typeIndex].textContent);
    if(gameStatus.typeIndex >= displayItems.length-1){
        displayKeys = [];
        for(let i=0; i<10; i++){
            genRandom();
        }
        displayNew();
        return;
    }

    if(e.data === displayItems[gameStatus.typeIndex].textContent){
        gameStatus.typeIndex += 1;
        highlight();
        gameStatus.rightCount += 1;
    }
    else if(e.data !== displayItems[gameStatus.typeIndex].textContent){
        gameStatus.wrongCount += 1;
    }

});
