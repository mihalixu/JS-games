var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");



canvas.width = 525;
canvas.height = 525;
box = 25;


// array for visual. , puting numbers into a array, for unshift method
let i = 0;
let arrayCounter = [];
arrayCounter[0] = 0;


let snake = [];
snake[0] = {
    x: 10 * box,
    y: 10 * box,
};



let food = {
    x: Math.floor(Math.random() * 10) * box,
    y: Math.floor(Math.random() * 10) * box
}



function myColison(r1,r2){
    if(r1.x + box > r2.x && r1.x < r2.x + box && r1.y + box > r2.y && r2.y + box > r1.y ){
        return true;
    }
    else
    {
        return false;
    }
}


let key;
function myKey(e){
    if (e.key == "w"){
        key = "UP";
    }
    if (e.key == "s"){ 
        key = "DOWN";
     }
    if (e.key == 'd'){
        key = "RIGHT";
     }
    if (e.key == 'a'){
        key = "LEFT";
    }
    
}


function drawFood() {

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 4;
    ctx.font = '15px Roboto';
    ctx.fillText(i+1, food.x + 7,food.y +20);
    ctx.rect(food.x,food.y,box,box);
    ctx.stroke();

}


function myUnshift() {
    arrayCounter.unshift(arrayCounter[arrayCounter.length - 1])
    arrayCounter.pop();
}

function mySnake(){
    
    for(let i = 0; i < snake.length; i++){
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'hsl(' + hue +', 100%, 50%)';
    ctx.lineWidth = 4;
    
    // When 9 is reached font gets smaller
    if(snake.length < 10){
        ctx.font = '20px Roboto';
    }
    else{
        ctx.font = '15px Roboto';
    }
    
    for(let i = 0; i < snake.length ; i++){
        ctx.fillText(arrayCounter[i], snake[i].x + 5,snake[i].y + 20);
    }

    ctx.rect(snake[i].x,snake[i].y,box,box);
    ctx.stroke();
}
    /*  
    [0,1,2]
    [2,0,1]
    [1,2,0]
    */  
    

    //remeber Headposition
    let newX = snake[0].x;
    let newY = snake[0].y;

    if (key == "UP"){
        newY -= box;
        myUnshift();
    }  
    if (key == "DOWN"){
        newY += box;
        myUnshift();
    } 
    if (key == "RIGHT"){
        newX += box;
        myUnshift();
    }
    if (key == "LEFT"){
        newX -= box;
        myUnshift();
    }
    
    if(myColison(food,snake[0]) == true){
        // i is ArrayCounter counter
        i++;
        arrayCounter.push(i)
        food.x = Math.floor(Math.random() * 20) * box;
        food.y = Math.floor(Math.random() * 20) * box;
    }
    else {
        snake.pop();
    }

    let newHead = {
        x: newX,
        y: newY,
    }

    snake.unshift(newHead);    

}

let hue = undefined;

function myHue() {
    hue = Math.random() * 100;
}


function animate() {
    
    canvas.width = canvas.width;
    drawFood();
    mySnake();

}



function load() {
    canvas.setAttribute('tabindex','0');
    canvas.focus();
    canvas.addEventListener("keydown",myKey);
    setInterval(animate,100);
    setInterval(myHue,300);   
}

