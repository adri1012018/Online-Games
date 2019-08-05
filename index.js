
alert("Random colours!");

let ball;
let paddle;
let score = 0;
let score2 = 0;
let fps;
let particles = [];
let blocks = [];

function setup(){
    blocks = [];
    createCanvas(windowWidth, windowHeight);
    ball = new Ball(width/3, height/4*3, 20, 3.87, 3.9);
    paddle = new Paddle(width/2, height-50, 100, 5);
    score = 0;
    score2 = 0;
    for(let i = 0;i<(height/3*2)/2.5;i++){
        blocks.push(new Block(map(i%10, 0, 10, 0, width), ceil(i/10)*20));
    }
    for(let i = 0;i<(height/3*2)/5;i++){
        blocks.splice(random((height/3*2)/2.5), 1)
    }
}

class Ball{
    constructor(x, y, d, xs, ys){
        this.x = x;
        this.y = y;
        this.d = d;
        this.xs = xs;
        this.ys = ys;
        this.r = random(200);
        this.g = random(200);
        this.b = random(200);
        this.h = [];
    }
    show(){
        //stroke(this.r-50, this.g-50, this.b-50);
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.d);
        this.x += this.xs;
        this.y += this.ys;
        if(this.y + this.d/2 >= height){
            alert("Game over. Your score was " + score + ". Retry?");
            setup();
        }
        if(this.y - this.d/2 <= 0){
            this.ys *= -1;
            for(let i = 0;i<5;i++){
                particles.push(new Particle(this.x, this.y, random(-5, 5), random(-5, 5), 3));
            }
        }
        if(this.x + this.d/2 >= width || this.x - this.d/2 <= 0){
            this.xs *= -1;
            for(let i = 0;i<5;i++){
            particles.push(new Particle(ball.x, ball.y, random(-5, 5), random(-5, 5), 3));
        }
        } 
        var v = createVector(this.x, this.y);
        this.h.push(v);
        for(let i = 0;i<this.h.length;i++){
            fill(this.r, this.g, this.b, map(i, 0, this.h.length, 0, 255));
            var p = this.h[i];
            ellipse(p.x, p.y, this.d);
        }
        if(this.h.length > 5){
            this.h.splice(0, 1);
        }
    }
}

class Paddle{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = random(200);
        this.g = random(200);
        this.b = random(200);
    }
    show(){
        fill(this.r, this.g, this.b);
        stroke(this.r, this.g, this.b);
        rect(this.x, this.y, this.w, this.h);
        this.x = mouseX-this.w/2;
    }
}

class Particle{
    constructor(x, y, xs, ys, p){
        this.x = x;
        this.y = y;
        this.d = random(3, 7);
        this.xs = xs;
        this.ys = ys;
        if(p == 1){
            this.p = paddle;
        }else if(p == 3){
            this.p = ball;
        }else{
            this.p = paddle2;
        }
        //this.f = Math.floor(Math.random()*2+1);
        this.f = floor(random(1, 3));
    }
    show(){
        if(this.f == 1){
            console.log("Hello World");
            fill(ball.r, ball.g, ball.b);
            stroke(ball.r, ball.g, ball.b);
        }else if(this.f == 2){
            console.log("yes");
            stroke(this.p.r, this.p.g, this.p.b);
            fill(this.p.r, this.p.g, this.p.b);
        }
        ellipse(this.x, this.y, this.d);
        this.x += this.xs;
        this.y += this.ys;
        if(
            this.y-500 > height
            ||
            this.y+500 < 0
            ||
            this.x-500 > width
            ||
            this.x+500 < 0
        ){
            particles.splice(0, 1);
        }
    }
}

class Block{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 10;
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);
    }
    show(){
        noStroke();
        fill(this.r, this.g, this.b);
        rect(this.x, this.y, this.width, this.height);
    }
}

function draw(){
    if(blocks.length == 0){
        alert("You won! Restart?");
        setup();
    }
    noStroke();
    background(200);
    //stroke(0);
    fill(255);
    fps = "fps: " + floor(frameRate());
    textSize(10);
    text(fps, 10, 20);
    textSize(20);
    text(floor(score), width/2, height/2+50);
    ball.show();
    for(let i = 0;i<particles.length;i++){
        particles[i].show();
    }
    paddle.show();
    if(collideRectCircle(paddle.x, paddle.y, paddle.w, paddle.h, ball.x, ball.y, ball.d)){
        ball.ys *= -1;
        for(let i = 0;i<5;i++){
            particles.push(new Particle(ball.x, ball.y, random(-5, 5), random(-5, 5), 1));
        }
        
    }
    for(let i = 0;i<blocks.length;i++){
        blocks[i].show();
        if(collideRectCircle(blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height, ball.x, ball.y, ball.d)){
            ball.ys *= -1;
            blocks.splice(i, 1);
            score += 1;
        }
    }
}
