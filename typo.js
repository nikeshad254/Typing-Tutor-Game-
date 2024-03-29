// game status 
let gameStatus = {
    startGame   : false,
    rightCount  : 0,
    wrongCount  : 0,
    select      : "top",
    typeIndex   : 0,
    timeMin     : 1,
    tableOpen   : true,
    playerName  : "",
    bgAudio     : true
}

//defining keys and holders
const topKey=['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'];
const homeKey=['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
const bottomKey=['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];
let displayKeys = [];

//var game audios
var countdownAudio = new Audio("10-9-8 one.mp3");
var looseAudio = new Audio("loosegame.mp3");
var bgAudio = new Audio("bgAudio.mp3");


let display = document.getElementById("display");
let input = document.getElementById("input");
let getName = document.getElementById("getName");   //player's name display place
//generated ones
let displayItems = document.getElementsByClassName("displayItems");

document.getElementById("minutes").textContent = gameStatus.timeMin;
getName.focus();

//this is for starting game and intializing it
window.addEventListener("keydown", (e)=>{
    if(e.keyCode==13 && !gameStatus.startGame && !gameStatus.tableOpen){
        gameStatus.select = document.getElementById("keyspace").value;
        document.getElementById("keyspace").disabled = true;
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

//generate ramdom keys from top, bottom and home
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

//display generated keys
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

//hightlights keyboard 
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

//stops typing or any action on input for specific keys like backspace and space
let invalidKeys = [8, 32, 38, 40, 39, 37];
input.addEventListener("keydown", (e)=>{
    let code = invalidKeys.indexOf(e.keyCode);
    // console.log(code);
    if(code != -1){
        e.preventDefault();
        let wrong=document.getElementById('wrong');
        gameStatus.wrongCount += 1;
        wrong.textContent=gameStatus.wrongCount;
    }
})

//for every input check correct or not and update score
input.addEventListener("input", (e)=>{
    //console.log(e);
    //console.log(displayItems[gameStatus.typeIndex].textContent);
    if(gameStatus.typeIndex >= displayItems.length-1){
        displayKeys = [];
        for(let i=0; i<10; i++){
            genRandom();
        }
        displayNew();
        return;
    }
    let data = e.data.toLowerCase() ;
    if(data === displayItems[gameStatus.typeIndex].textContent){
        gameStatus.typeIndex += 1;
        highlight();
        gameStatus.rightCount += 1;
        let right=document.getElementById('right');
        right.textContent=gameStatus.rightCount;
    }
    else if(data !== displayItems[gameStatus.typeIndex].textContent){
        gameStatus.wrongCount += 1;
        let wrong=document.getElementById('wrong');
        wrong.textContent=gameStatus.wrongCount;
    }

});


// all timer events starts from here
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
        minutes.style.color="#d7c161";
        seconds.style.color="#d7c161";
        document.getElementById("timer").classList.remove("timer");
    }
    if(secs<20) {
        document.getElementById("timer").classList.add("timer");
        minutes.style.color="red";
        seconds.style.color="red";
    }
    if(secs<12){
        countdownAudio.play();
        if(gameStatus.bgAudio){
            bgAudio.pause();
        }
    }
    //stop game
    if(mins<0) {
        // alert('time up');
        looseAudio.play();
        countdownAudio.pause();
        gameStatus.startGame = false;
        displayKeys=[];
        display.innerHTML = "Game over!!!";
        input.disabled = true;
        input.value = "";
        minutes.textContent=1;
        seconds.textContent=00;
        minutes.style.color="#d7c161";
        seconds.style.color="#d7c161";
        document.getElementById("timer").classList.remove("timer");
        let keys = document.getElementsByClassName("key");
        for(let i=0; i<keys.length; i++){
            keys[i].style.border = "1px solid var(--dark-green)";
        }
        
        let arr = [`${gameStatus.playerName}`,`${gameStatus.rightCount}`, `${gameStatus.wrongCount}`];
        localStorage.setItem(Date.now(), JSON.stringify(arr));
        gameStatus.playerName = "";

        document.getElementById("right").textContent = 00;
        document.getElementById("wrong").textContent = 00;
        showTable();

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

//display result table
let table = document.querySelector(".statement-screen");

function sortLocalKeys(){
    let keyArr = [];
    for(let i =0; i<localStorage.length; i++){
        keyArr.push(Number.parseInt(localStorage.key(i)));
    }
    for(let i =0; i<localStorage.length; i++){
        for(let j=i+1; j<localStorage.length; j++){
            if(keyArr[i]>keyArr[j]){
                let temp = keyArr[i];
                keyArr[i] = keyArr[j];
                keyArr[j] = temp;
            }
        }
    }
    return keyArr;
}

function showTable(){
    if(gameStatus.startGame){
        return;
    }
    if(gameStatus.bgAudio){
        bgAudio.pause();
    }
    table.style.display = "flex";
    gameStatus.tableOpen = true;

    let inHtml = "";
    let keyArr = sortLocalKeys();
    for(let i=0; i<localStorage.length; i++){
        let numArr = JSON.parse(localStorage.getItem(keyArr[i]));
        inHtml += `
            <tr>
                <td>${numArr[0]}</td>
                <td>${numArr[1]}</td>
                <td>${numArr[2]}</td>
            </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = inHtml;
}

function closeTable(){
    table.style.display = "none";
    gameStatus.startGame = false;
    display.textContent = "Press Enter to Start";
    document.querySelector(".take-name").style.display = "flex";
    getName.focus();
}


// get name and display player name
function getNameFunc(){
    if(getName.value.length>0){
        let name = getName.value.toUpperCase();
        gameStatus.playerName = name;
        getName.value = "";
        document.getElementById("pName").textContent = gameStatus.playerName;
        setTimeout(()=>{
            gameStatus.tableOpen = false;  
        }, 1000)
        document.querySelector(".take-name").style.display = "none";
        document.getElementById("keyspace").disabled = false;
        if(gameStatus.bgAudio){
            bgAudio.play();
            bgAudio.loop = true;
        }
    }
}
getName.addEventListener("keypress", (e)=>{
    if(e.keyCode == 13){
        getNameFunc();
        console.log("hello");
    }
})
