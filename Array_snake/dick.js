var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");



canvas.width = 525;
canvas.height = 525;

box = 25;

let arrayCounter = 0;


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
        console.log(snake);
    }
    
}


function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.font = '40px Arial';
    ctx.fillText(".i.", food.x + 4,food.y +20);


}


function mySnake(){
    
    for(let i = 0; i < snake.length; i++){

    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 4;
    
    // When 9 is reached font need to be smaller
    if(snake.length < 10){
        ctx.font = '20px Roboto';
    }
    else{
        ctx.font = '15px Roboto';
    }
    
    if(snake.length > 3){
        for(let i = 0; i < snake.length ; i++){
            ctx.fillText(i, snake[i].x + 5,snake[i].y +20);
        }
    }
   

    
    
    ctx.rect(snake[i].x,snake[i].y,box,box);
    ctx.stroke();
    }

    //remeber Headposition
    let newX = snake[0].x;
    let newY = snake[0].y;

    if (key == "UP")  newY -= box;
    if (key == "DOWN")  newY += box;
    if (key == "RIGHT")  newX += box;
    if (key == "LEFT")  newX -= box;
    
    if(myColison(food,snake[0]) == true){
        arrayCounter++;
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
}

