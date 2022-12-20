let gameStatus = {
    startGame   : false,
    rightCount  : 0,
    wrongCount  : 0,
    select      : "top",
    typeIndex   : 0,
    timeMin     : 3
}

const topKey=['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'];
const homeKey=['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
const bottomKey=['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];
let displayKeys = [];

let display = document.getElementById("display");
let input = document.getElementById("input");
//generated ones
let displayItems = document.getElementsByClassName("displayItems");

(()=>{
    document.getElementById("minutes").textContent = gameStatus.timeMin;
})();

window.addEventListener("keydown", (e)=>{
    if(e.keyCode==13 && !gameStatus.startGame){
        gameStatus.select = document.getElementById("keyspace").value;
        // console.log(e);
        gameStatus.startGame = true;
        gameStatus.rightCount = 0;
        gameStatus.wrongCount = 0;
        for(let i=0; i<10; i++){
            genRandom();
        }
        displayNew();
        count();
        input.disabled = false;
        input.focus();
    }
});

function genRandom(){
    let key = "";
    switch(gameStatus.select){
        case "home":
            key = Math.floor(Math.random() * homeKey.length);
            displayKeys.push(homeKey[key]);
        break;
        case "top":
            key = Math.floor(Math.random() * topKey.length);
            displayKeys.push(topKey[key]);
        break;
        case "bottom":
            key = Math.floor(Math.random() * bottomKey.length);
            displayKeys.push(bottomKey[key]);
        break;
    }
    
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
    let index;
    let keyboard;
    switch(gameStatus.select){
        case "top":
            index = topKey.indexOf(displayItems[gameStatus.typeIndex].textContent);
            keyboard = document.getElementsByClassName("top");
        break;

        case "home":
            index = homeKey.indexOf(displayItems[gameStatus.typeIndex].textContent);
            keyboard = document.getElementsByClassName("home");
        break;

        case "bottom":
            index = bottomKey.indexOf(displayItems[gameStatus.typeIndex].textContent);
            keyboard = document.getElementsByClassName("bottom");
        break;
        
    }
    for(let i=0; i<keyboard.length; i++){
        keyboard[i].style.border = "1px solid var(--dark-green)";
    }
    keyboard[index].style.border = "3px solid var(--pure-green)";

    
}

input.addEventListener("input", (e)=>{
    console.log(e);
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
        let right=document.getElementById('right');
        right.textContent=gameStatus.rightCount;
    }
    else if(e.data !== displayItems[gameStatus.typeIndex].textContent){
        gameStatus.wrongCount += 1;
        let wrong=document.getElementById('wrong');
        wrong.textContent=gameStatus.wrongCount;
    }

});


// timer  events 

var mins;
var secs;

function count() {
    mins= gameStatus.timeMin;
    secs=mins*60;
    setTimeout(decrease(),60);
}

function decrease() {
    
    minutes=document.getElementById("minutes");
    seconds=document.getElementById("seconds");
    if(seconds<59) {
        seconds.value=secs;
    }
    else {
        minutes.textContent=getminutes();
        seconds.textContent=getseconds();
    }
    if(mins<1) {
        document.getElementById("timer").classList.add("timer");
        minutes.style.color="red";
        seconds.style.color="red";
    }
    if(mins<0) {
        // alert('time up');
        displayKeys=[];
        display.innerHTML = "Game over!!!";
        input.disabled = true;
        minutes.textContent=00;
        seconds.textContent=00;
    }
    else {
        secs--;
        setTimeout('decrease()',1000);
    }
    
}
     
function getminutes() {
    mins=Math.floor(secs/60);
    return mins;
}
     
function getseconds() {
    return secs-Math.round(mins*60);
}
