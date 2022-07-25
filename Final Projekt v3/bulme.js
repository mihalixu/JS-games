/**************************************************************
 *   Authors:  Mihael Subasic, Fabian Habjanovic, Alvin Kazaz *
 *                       Powered by "Yugo"                    *
 **************************************************************/

// Our web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQEjWSsJ_c_KO7y-y_-pzmCLVAKnY-08w",
    authDomain: "fir-scoreboard-7468f.firebaseapp.com",
    projectId: "fir-scoreboard-7468f",
    storageBucket: "fir-scoreboard-7468f.appspot.com",
    messagingSenderId: "640388388303",
    appId: "1:640388388303:web:a2e1c172206d82d24f6eba",
    measurementId: "G-1ZC0LC6HYQ"
};    

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

//-------------------------------------------------------------------------

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext('2d');
//-------------------------------------------------------------------------

// Score Logik
var score = document.getElementById('score');
var scoreCounter = 0;
//-------------------------------------------------------------------------

// Live Logik
var lives = document.getElementById('lives');
var liveDecrementor = 3;
//-------------------------------------------------------------------------
var bonusTime = document.getElementById("bonusTime");
//-------------------------------------------------------------------------

// declaring canvas width and height
canvas.width = 900;
canvas.height = 600;
canvas2.width = 900;
canvas2.height = 600;

//fixed snake size both x and y == boxSize
let boxSize = 30;           // snake head and tail width and height
let gameSpeed = 1;          // speed for moving BG, food, reedbull

let snake = [];             // contains snake cords. 
let imageArray = []         // array for random food/prog. languages images
let enemyArray = [];        // contains enemy cords.
let enemyImagesArray = [];  // array for random enemy images
let redbullArray = [];      // contains redbull cords. and image 

//-------------------------------Sounds-----------------------------------
// Menu
const menusound = new Audio();
menusound.src = "audio/begin.mp3";

// eat enemy
const pickup = new Audio();
pickup.src = 'audio/Pickup.wav';

// eat Redbull
let bonusSound = new Audio();
bonusSound.src = "audio/funny.mp3";

// when start button pressed
const mainsound = new Audio();
mainsound.src = "audio/free-funny-music-for-games-loop.mp3";

// eat enemy
const hitenemy = new Audio();
hitenemy.src = "audio/hitenemy.wav";

// gameover
const gameoversound = new Audio();
gameoversound.src = "audio/gameover.wav";

//-------------------------------------------------------------------------
const bulme = new Image();
bulme.src = 'images/probe4_gray.jpg';
//-------------------------------------------------------------------------

//CSS
const css = new Image();
css.src = 'images/css.png';

// HTML
const html = new Image();
html.src = 'images/html.png';

// PHP
const php = new Image();
php.src = 'images/php.png';

// JS
const javascript = new Image();
javascript.src = 'images/js.png';

// Arduino
const arduino = new Image();
arduino.src = "images/arduino_48.png";

// C#
const csharp = new Image();
csharp.src = "images/csharp.png";

// C
const c = new Image();
c.src = "images/c_farbe48.png";

// C++
const cplusplus = new Image();
cplusplus.src = "images/c++.png";

// Java
const java = new Image();
java.src = "images/java_48.png";

// Python black
const pythonblack = new Image();
pythonblack.src = "images/py48.png";

// Python
const python = new Image();
python.src = 'images/python.png';

// ROS
const respi = new Image();
respi.src = "images/rasperry_48.png";

// VS
const vs = new Image();
vs.src = "images/visual_48.png";

//------------------------------------------
// Headlogo
const bulmeLogo = new Image();
bulmeLogo.src = 'images/headlogo.png';

// Redbull
const redbull = new Image();
redbull.src = 'images/redbull.png';
//------------------------------------------

// Bug64
const bug64 = new Image();
bug64.src = "images/bug64.png";

// Bug 64w
const bug64w = new Image();
bug64w.src = "images/bug64w.png";

// Instagram
const instagram = new Image();
instagram.src = "images/insta64.png";

// SPS
const sps = new Image();
sps.src = 'images/sps.png';

// Bier
const bier = new Image();
bier.src = 'images/bier.png';

// Netflix
const netflix = new Image();
netflix.src = 'images/netflix.png';

// Guter alter Punti :)
const punti = new Image();
punti.src = 'images/punti.png';

// Games
const game = new Image();
game.src = 'images/game.png';

//---------------------------------------------------------------------------------

//Start Game and Hide Start Screen
function startHide() {
    canvas.setAttribute('tabindex','0');
    canvas.focus();
    canvas.addEventListener("keydown",myKey);
    menusound.pause();
    mainsound.play(); // when press start main sound starts
    mainsound.loop = true;
    mainsound.volume = 0.2;
    var x = document.getElementById("startScreen");  // Select the element with id
    if (x.style.display === "none") { // If selected element is hidden
      x.style.display = "block"; // Show the hidden element
    } else { // Else if the selected element is shown
      x.style.display = "none"; //Hide the element
    }
}

//Open and Close hidden Description 
function toggleDesc() {
    var y = document.getElementById("descriptionScreen"); 
    if (y.style.display !== "block") {  
      y.style.display = "block";
    } else {
      y.style.display = "none";
    }
}

//Open and Close hidden Rules
function toggleRules() {
    var z = document.getElementById("rulesScreen"); 
    if (z.style.display !== "block") {  
      z.style.display = "block";
    } else {
      z.style.display = "none";
    }
}

//Restart Game
function restartGame() {
    window.location.reload();
    disableLoad = 1;
}

//Disable Start Button until something is written
function disableStart() {
    var name = document.getElementById("name").value;
    var cansubmit = (name.length > 0);
    document.getElementById("startButton").disabled = !cansubmit;
}

// menu sound for onload function
function loadMenuMusic() {
    menusound.loop = true;
    menusound.play();
    menusound.volume = 0.1;   
}

//------------------------Random generate Functions for imagesArray and enemyImagesArray------------------------
//random Image generator betwen 1-13 for Food Prog. Languages
let image;
function randonImage() {
    randomSprache = Math.floor(Math.random() * 14);
    if (randomSprache == 1) image = python;
    if (randomSprache == 2 ) image = css;
    if (randomSprache == 3 ) image = html;
    if (randomSprache == 4 ) image = php;
    if (randomSprache == 5 ) image = javascript;
    if (randomSprache == 6 ) image = arduino;
    if (randomSprache == 7 ) image = csharp;
    if (randomSprache == 8 ) image = c;
    if (randomSprache == 9 ) image = cplusplus;
    if (randomSprache == 10 ) image = java;
    if (randomSprache == 11 ) image = pythonblack;
    if (randomSprache == 12 ) image = respi;
    if (randomSprache == 13 ) image = vs;

}
// caling randomImage function to create imge for snake head
randonImage();

//random enemy Image generator betwen 1-8 for Enemy
let enemy;
function randomEnemyImage() {
    randomEnemy = Math.floor(Math.random() * 9);
    if (randomEnemy == 1) enemy = sps;
    if (randomEnemy == 2 ) enemy = instagram;
    if (randomEnemy == 3 ) enemy = game;
    if (randomEnemy == 4 ) enemy = netflix;
    if (randomEnemy == 5 ) enemy = punti;
    if (randomEnemy == 6 ) enemy = bug64;
    if (randomEnemy == 7 ) enemy = bug64w;
    if (randomEnemy == 8 ) enemy = bier;

}
// caling randomEnemyImage function to create imgg for first enemy spawn
randomEnemyImage();

//------------------------------Moving BG Logic-----------------------------------------------------------------
// Drawing Paralax moving BG :)
let imageDecounter = 0;
let imageDecounter2 = 11701; // BG x width size is 11701
let x = 0;
let x2 = 11701;

function drawLayer(){
    ctx.drawImage(bulme,x,0);
    ctx.drawImage(bulme,x2,0);
    if(x < -11701) x = 11701 - gameSpeed;
    else x -= gameSpeed;
    if(x2 < -11701) x2 = 11701 - gameSpeed;
    else x2 -= gameSpeed;
}

//----------------------------------Food-------------------------------------------------------------------------
// Image/Food starting cord.
food = {
    x: canvas.width,
    y: Math.floor(Math.random() * (canvas.height / 2 - boxSize)),
}

// Drawing Food Spawn triger
function drawFood(){
    ctx.drawImage(image,food.x,food.y,48,48);
    food.x -= gameSpeed;
    // 48 is the size of the food images
    if (food.x < -48) food.x = canvas.width;
}

//-----------------------------Enemy Functions--------------------------------------------------------------------
// Enemy class for push array
class enemyClass {
    constructor() {
        this.x = Math.floor(Math.random() * 300 ) + canvas.width;
        this.y = Math.floor(Math.random() * (canvas.height - 100));
        // 0.20 is the the gamespeed increment value
        this.speed = (Math.random() * 2) + gameSpeed + 0.40;
    }
}

// Drawing Moving Image/Enemy for snake
function drawEnemy(){
    for (let i = 0; i < enemyImagesArray.length; i++){
        ctx.drawImage(enemyImagesArray[i],enemyArray[i].x,enemyArray[i].y,48,48);
        enemyArray[i].x -= enemyArray[i].speed;
    }
}

// if Snake Head snake[0] eats food, remove food element from Image Array 
function eatEnemy() {
    for (let i = 0; i < enemyArray.length; i++){
        if (bonusActiveted == 0){
            if(myColison(snake[0],enemyArray[i]) == true){
                if (bonusActiveted == 0){
                    liveDecrementor--;
                    hitenemy.play();
                    if (liveDecrementor == 2){
                        lives.innerHTML = "Lives: ♥ ♥" ;
                    }
                    if (liveDecrementor == 1){
                        lives.innerHTML = "Lives: ♥" ;
                    }
                    if (liveDecrementor == 0){
                        lives.innerHTML = "Lives: ☠" ;
                    }
                }
                enemyArray.splice(i,1);
                enemyImagesArray.splice(i,1);
            }
        }
    }
}

// remove Enemy if enemy.x < - 100
function removeEnemy() {
    for (let i = 0; i < enemyArray.length; i++){
        if (enemyArray[i].x < -100){
            enemyArray.splice(i,1);
            enemyImagesArray.splice(i,1);
        } 
    }
}

//-------------------------Redbull and Bonus Functions-----------------------------------------------
// Redbull Klase
class redbullClass {
    constructor(){
        this.x = canvas.width + 200;
        this.y = Math.floor(Math.random() * (canvas.height - 50));
        this.img = redbull;
    }
}

// drawing Redbull
function drawingRebull() {
    ctx.drawImage(redbullArray[0].img, redbullArray[0].x,redbullArray[0].y,25,54) 
    redbullArray[0].x -= gameSpeed;
}

// random Bonus generator 10% chance per new wawe 0-4
let bonus = undefined;
function bonusGenerator() {
    bonus = Math.floor(Math.random() * 11);
}

//Eating redbull
function removingRedbull() {
    if(myColison(snake[0],redbullArray[0]) == true || redbullArray[0].x < -30){
        redbullArray.splice(0,1);
    }
}

// Eating redbull and geting Bounus Activeted
let bonusActiveted = 0;
function eatingRedbull() {
    if (redbullArray.length == 1){
        if(myColison(snake[0],redbullArray[0]) == true && bonusActiveted != 1){
            bonusActiveted = 1;
        }
    }
}

let timer = 1100;
function countdown() {
    // 1000 / 60 = 16,6 ms.
    // 100 / 16,6 = 6,0241 
    // 6,0241 * 16.6 = 100  in my case 100 is 1 Sec. 
    // every 16.6 increment 6.0241 to get 100 in 1 Sec.
    timer -= 6.0241;
}

function resetBonus(){
    timer = 1100;
    bonus = 0;
    bonusActiveted = 0;
    bonusTime.innerHTML = "";
}

//------------------------------------------Snake Functions and Logic------------------------------------
// Colsion Function
function myColison(r1,r2){
    if(r1.x + boxSize > r2.x && r1.x < r2.x + boxSize && r1.y + boxSize > r2.y && r2.y + boxSize > r1.y ){
        return true;
    }
    else
    {
        return false;
    }
}

// First snake element Center cords.
snake[0] = {
    x: boxSize * 15,
    y: boxSize * 10,
}

//Array that contains image name for snake drawing loop
imageArray[0] = bulmeLogo;

// saving in key variable  UP,DOWN,LEFT,RIGHT for newSnake array
let key;
function myKey(e){
    if ((e.key == "w" || e.key == "ArrowUp") && key != 'DOWN'){
        key = "UP";
    }
    if ((e.key == "s" || e.key =="ArrowDown") && key != 'UP'){ 
        key = "DOWN";
    }
    if ((e.key == 'd' || e.key =="ArrowRight") && key != 'LEFT'){
        key = "RIGHT";
    }
    if ((e.key == 'a' || e.key =="ArrowLeft") && key != 'RIGHT'){
        key = "LEFT";       
    }
    }

function drawSnake(){
    if (bonusActiveted == 0){
        for (let i = 0; i < imageArray.length; i++){
            ctx2.drawImage(imageArray[i],snake[i].x,snake[i].y,boxSize,boxSize);
        }
    }
    else {
        // if bonus active allowing snake to cross border and spawns on the opposite side 
        for (let i = 0; i < imageArray.length; i++){
            if(snake[i].y < 0) snake[i].y = canvas.height;
            if(snake[i].y > canvas.height) snake[i].y = 0;
            if(snake[i].x > canvas.width) snake[i].x = 0;
            if(snake[i].x < 0) snake[i].x = canvas.width;
            ctx2.drawImage(imageArray[i],snake[i].x,snake[i].y,40,40);
        }
    }
    //------------------------------------------------------------------------------------------------------------------------------------

    newSnakeX = snake[0].x;
    newSnakeY = snake[0].y;
    if (key == 'UP') newSnakeY -= boxSize; // boxsize = 30, snake width and height == boxsize
    if (key == 'DOWN') newSnakeY += boxSize;
    if (key == 'LEFT') newSnakeX -= boxSize;
    if (key == 'RIGHT') newSnakeX += boxSize;

    newSnake = {
        x: newSnakeX,
        y: newSnakeY,
    }
    //-------------------------------------------------------------------------------------------------------------------------------------
    if (myColison(snake[0],food) == true){
        imageArray.push(image);
        if (bonusActiveted == 0){
            scoreCounter++; // incrementing score if snake eats food and bonus == 0
            bonusGenerator(); // everytime snake eats food bonusgenerator generates number betwen 0-10 if the number is 3 bonus is active
            if(bonus == 3 && redbullArray.length == 0){
                redbullArray.push(new redbullClass);
            }
        } 
        if (bonusActiveted == 1){
            scoreCounter += 3; // incrementing score if snake eats food and bonus == 1
        }
        randonImage(); 
        gameSpeed += 0.25; // every time snake eats food game geting faster
        score.innerHTML = "Score: " + scoreCounter;
        //----------------------------------------------------------------------------------------------------------------------------------
        food.x = canvas.width + boxSize; // if snake eats food food cords. going to start pos. with random height
        food.y = Math.floor(Math.random() * (canvas.height - 50));
        pickup.play();
        // if snake eats food new Wave of Enemy is spawned :)
        for(let i = 0; i < Math.floor(Math.random() * 8); i++){
            randomEnemyImage();
            enemyArray.push(new enemyClass);
            enemyImagesArray.push(enemy);
        }
    }
    else{
        snake.pop();
    }
    snake.unshift(newSnake);
}

//-------------------------------------------------------Gameover Functions-------------------------------------------------------------------
let stopAnimation = 0;
// Game over if snake passes Canvas border 900x600
function gameOver() {
    if(snake[0].x + boxSize > canvas.width || 
        snake[0].x < 0 || 
        snake[0].y + boxSize > canvas.height || 
        snake[0].y < 0){
        stopAnimation = 1;
        gameoversound.play();
        mainsound.pause();
        var x = document.getElementById("gameOverScreen");  
        setTimeout(function() {x.style.display = "block"},200);
    }   
}

// if snake eats his tail
function gameOver2() {
    for (let i = 1; i < snake.length; i++){
        if (myColison(snake[0],snake[i]) == true){
            gameoversound.play();
            stopAnimation = 1;
            mainsound.pause();
            var x = document.getElementById("gameOverScreen");  
            setTimeout(function() {x.style.display = "block"},200);
        }
    }
}

// No lifes
function gameOver3() {
    if(liveDecrementor == 0){
        gameoversound.play();
        stopAnimation = 1;
        mainsound.pause();
        var x = document.getElementById("gameOverScreen");  
        setTimeout(function() {x.style.display = "block"},200);
    }
}

// saving score for firebase
function savingscore(){
    saveScore();
    score2.innerHTML = "Nice try! Your Score is: " + scoreCounter;
}

//-----------------------------Animations----------------------------------------------
function animate1(){
    canvas.width = canvas.width;
    
    if(bonusActiveted == 0) gameOver();
    if(bonusActiveted == 0) gameOver2();
    if(bonusActiveted == 0) gameOver3();
    drawLayer();
    if (redbullArray.length == 1){
        drawingRebull();
        eatingRedbull();
        removingRedbull();
    } 
    eatEnemy();
    drawEnemy();
    drawFood();
    removeEnemy();
    if (stopAnimation == 0) requestAnimationFrame(animate1);
    if (stopAnimation == 1) savingscore();
}
animate1()

//--------------------------------------------------------------------------------------
var fpsInterval = 60;
var then = Date.now();
var now, elapsed;

function animate2() {
    now = Date.now();

    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now;
        canvas2.width = canvas2.width;
        drawSnake();
        // Reseting Bonus and Timer appears
        if (bonusActiveted == 1){
            bonusSound.play();
            countdown();
            bonusTime.innerHTML = "Bonus Time: " + Math.floor(timer / 100) + " sec.";
            if (timer <= 0){
                resetBonus();
            }
        }
    }
    if (stopAnimation == 0) requestAnimationFrame(animate2); 
}
animate2();

//-------------------------------------DATABASE CODE-------------------------------------
function saveScore() {
    // Get name from input box
    let name = document.getElementById('name').value;

    // Make sure name has a value, if not send alert.
    
        // Add a new document in collection "scores"
        db.collection("scores").doc().set({
            name: name,
            score: scoreCounter
        })
        .then(function() {
            console.log("Document successfully written!");
            updateScores();
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
     
}

function updateScores() {
    // Clear current scores in our scoreboard
    document.getElementById('scoreboard').innerHTML = '<tr><th>Name</th><th>Score</th></tr>';
    
    // Get the top 5 scores from our scoreboard
    db.collection("scores").orderBy("score", "desc").limit(50).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById('scoreboard').innerHTML += '<tr>' +
            '<td>' + doc.data().name + '</td>' +
            '<td>' + doc.data().score + '</td>' +
            '</tr>';
        })
    })
}
