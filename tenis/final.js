var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
var img1 = document.getElementById("source1");
var img2 = document.getElementById("source2");
var audio1 = document.getElementById("audio_shot");
var move1 = document.getElementById("audio_move1");
var move2 = document.getElementById("audio_move2");
var crowd = document.getElementById("audio_crowd");
crowd.volume = 0.1;
var ball_out = document.getElementById("audio/ball out.m4a");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Player{
    constructor(){
        this.x = 0;
        this.y = canvas.height/2 - 75;
        this.height = 150;
        this.src = img1;
        this.width = 50;
        this.color = 'white ';
        this.speedY = 50;
        this.linebegin = 60;
        this.compareYBallCords = 0;
        this.compareYPlayerCords = 0;
    }
    //comperes Player and ball y cordinate
    compareYPoint(player){
        if(colisionP1(ball1,player) == true || colisionP2(ball1,player2) == true){
            this.compareYCords = ball1.y;
            this.compareYPlayerCords = this.y - this.compareYCords;
            this.compareYPlayerCords = -this.compareYPlayerCords;
            
            // making vektor with point where the ball hit player
            if(this.compareYPlayerCords >= 60 && this.compareYPlayerCords <=89){
                ball1.velocityY = 0;
            }
            if(this.compareYPlayerCords >= 0   && this.compareYPlayerCords <=29){
                ball1.velocityY = -1.875;
            }
            if(this.compareYPlayerCords >= 30 && this.compareYPlayerCords <=59){
                ball1.velocityY = -0.9;
            }
            if(this.compareYPlayerCords >= 90 && this.compareYPlayerCords <=119){
                ball1.velocityY = 0.9;
            }
            if(this.compareYPlayerCords >= 120 && this.compareYPlayerCords <=150){
                ball1.velocityY = 1.875;
            }
            console.log(this.compareYPlayerCords,ball1.velocityY);
        }
        
    }
    
    draw(){
        //Force players to stay in canvas 
        
        if(this.y + this.height > canvas.height){
            this.y = canvas.height - this.height;
        }
        if(this.y  < 0){
            this.y = 0;
        }
        if(this.x < 0){
            this.x = 0;
        }
        if(this.x > canvas.width){
            this.x = canvas.width - this.width;
        }
        if(player1.x + player1.width > canvas.width/2){
            player1.x = canvas.width/2 - player1.width - 10;
        }
        if(player2.x < canvas.width/2){
            player2.x = canvas.width/2 +10;
        }

        ctx.drawImage(this.src,this.x,this.y,this.width,this.height);
        
    }

    drawingNet(){
        player_net.x = canvas.width/2 - 5;
        player_net.y = canvas.height - canvas.height;
        player_net.width = 10;
        player_net.height = 50;
        for(let i = 0; i < canvas.height; i+= player_net.height + 32,7){
            ctx.fillStyle = "white";
            ctx.fillRect(player_net.x,player_net.y+i,player_net.width,player_net.height);
        }
    
    }
    

    drawline(){
        ctx.beginPath();
        ctx.moveTo(this.linebegin,0);
        ctx.lineTo(this.linebegin,canvas.height);
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'white';
        ctx.stroke();
    }
    
}




//Player 1 and ball Colision
function colisionP1(r1,r2){
    if(r1.x - r1.radius > r2.x + r2.width && r1.x - r1.radius < r2.x + r2.width + 15 && r1.x + r1.radius > r2.x + r2.width + 15 && r1.y - r1.radius > r2.y - 15 && r1.y + r1.radius < r2.y + r2.height + 15){
        return true;
    }
    else{
        return false;
    }
}
//Player 2 and ball Colision
function colisionP2(r1,r2){
    if(r1.x + r1.radius < r2.x && r1.x + r1.radius > r2.x - 15 && r1.x - r1.radius < r2.x - 15 && r1.y - r1.radius > r2.y - 15 && r1.y + r1.radius < r2.y + r2.height + 15){
        return true;
    }
    else{
        return false;
    }
}



class Ball {
    constructor(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 13;
        this.color = "yellow";
        this.speed = 2;
        this.maxSpeed = 10;
        this.velocityX = 2;
        this.velocityY = 0;
        this.velocityX_StartSpeed = 2;
        this.score1 = document.getElementById("Player1");
        this.sc1 = 0;
        this.score2 = document.getElementById("Player2");
        this.sc2 = 0;
    }    

    update(){
        crowd.play();

        //playing crowd sound
        
        this.score1.innerHTML = this.sc1;
        this.score2.innerHTML = this.sc2;
        

        //Winer announcement
        if(this.sc1 == 3){
            window.location.reload();
            window.alert("Player 1 Won");
            
        }
        if(this.sc2 == 3){
            window.location.reload();
            window.alert("Player 2 Won");
            
        }

        // limits ball speed
        if(this.velocityX > this.maxSpeed){
            this.speed = 0;
        }
        
        // move aminations
        function shotAnimation1(){
            player1.src = img1;
        }
        function shotAnimation2(){
            player2.src = img2;
        }
      

        // ball player1 colison
        if(colisionP1(ball1,player1) == true){
            this.velocityX+= this.speed;
            this.velocityX= -this.velocityX;
            this.velocityY= -this.velocityY;
            player1.src = img2;
            
            // animation and move sound
            
            audio1.play();
            setTimeout(shotAnimation1,300);
            console.log(this.velocityX);
            
        }
        // ball player2 colison
        if(colisionP2(ball1,player2) == true){
            this.velocityX += -this.speed;
            this.velocityX= -this.velocityX;
            this.velocityY= -this.velocityY;

            // animation and move sound 
            player2.src = img1;
            audio1.play();
            setTimeout(shotAnimation2,300);
            console.log(this.velocityX);
        }
        // changes direction of ball.y if ball hits top or botom
        if(this.y - this.radius < 0 || this.y + this.radius > canvas.height){
            this.velocityY = -this.velocityY;
            
        }

        // when ball ist out(left side), ball gets restart cordinats on middle 
        if(this.x - this.radius < 0){
            
            this.sc2++;
            this.velocityX = this.velocityX_StartSpeed;
            this.velocityY = 0;
            this.velocityX = this.velocityX;
            this.x = canvas.width/2;
            this.y = canvas.height/2;
            this.speed = 2;
        }
         // when ball ist out(right side), ball gets restart cordinats on midle 
        if(this.x + this.radius > canvas.width){
            
            this.sc1++;
            this.velocityX = this.velocityX_StartSpeed;
            this.velocityY = 0;
            this.velocityX = this.velocityX;
            this.x = canvas.width/2;
            this.y = canvas.height/2;
            this.speed = 2;
           
            
        }
        
        // ball moves on start cordinats (midle of canvas)
        this.x -= this.velocityX;
        this.y -= this.velocityY;
    }


    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill(); 
    }

}



var player_net = new Player
var ball1 = new Ball();
var player1 = new Player();
var player2 = new Player();
player2.x = canvas.width -50;
player2.src = img2;
var img = new Player();


function randomMove(){
    // to gerate a randome rounded number between 1 to 10;
    var theRandomNumber = Math.floor(Math.random() * 2) + 1;
    if(theRandomNumber == 1){
        move1.play()
    }
    if(theRandomNumber == 2){
        move2.play()
    }
    
    
}

function myKey(e){
    if (e.key == "w"){
        randomMove();
        player1.y -=60;
    }
    if (e.key == "s"){  
        randomMove();
        player1.y +=60;
        
    }
    if (e.key == "d"){
        randomMove();
        player1.x +=60;
        crowd.stop();
        }
    if (e.key == "a"){  
        randomMove();
        player1.x -=60;
        
    }
    if (e.key == 'ArrowUp'){
        randomMove();
        player2.y -=60;
        
        }
    if (e.key == 'ArrowDown'){
        randomMove();
        player2.y +=60;
        
    }
    if (e.key == 'ArrowLeft'){
        randomMove();
        player2.x -=60;
        
        }
    if (e.key == 'ArrowRight'){
        randomMove();
        player2.x +=60;
        
    }
    
}

function animation() {
    canvas.width = canvas.width;
    ball1.update();
    player1.draw();
    player2.draw();
    ball1.draw();
    player1.drawline();
    player2.linebegin = canvas.width - 60;
    player2.drawline();
    player_net.drawingNet();
    player1.compareYPoint(player1);
    player2.compareYPoint(player2);
    
}

function loadBegin(){
    canvas.setAttribute('tabindex','0');
    canvas.focus();
    canvas.addEventListener('keydown',myKey,false);
    setInterval(animation,10);
}