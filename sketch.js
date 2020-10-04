var monkey, monkey_running, background;
var banana, bananaImage, obstacle, obstacleImage,end;
var FoodGroup, obstacleGroup, ground;
var score;
var invisibleGround;
var survivalTime = 0;
var END = 0;
var PLAY = 1;
var gameState = PLAY;


function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}


function setup() {
  createCanvas(600, 600);
  invisibleGround = createSprite(300, 485, 600, 15);
  monkey = createSprite(50, 450, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  bananaGroup = new Group();

  obstacleGroup = new Group();
  
  ground = createSprite(300, 485, 600, 15);
  ground.velocityX = -10;
}


function draw() {
 background("lightBlue");
  monkey.collide(invisibleGround);
 if (gameState === PLAY){
   
  if (ground.x < 0){
    ground.x = ground.width / 2;
  }
 

 food();
  obstacle();

  if (keyDown("space")) {
    monkey.velocityY = -12;

  }
  invisibleGround.visible = false;
  monkey.velocityY = monkey.velocityY + 0.8
  

  if (monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
  }
  
  

  

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime, 50, 50)

   if (monkey.isTouching(obstacleGroup)){
  gameState = END;
}  
 }
  if (gameState === END){
    background("Black");
  textSize(50);
    text("GAME OVER",150,300);
  
    monkey.visible = false;
    monkey.velocityX = 0;
  }
 
   drawSprites();
}
function food() {
  if (frameCount % 80 === 0) {
    rand = Math.round(random(200, 350));
    banana = createSprite(600, rand, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -10
    banana.setLifetime = 50;
    bananaGroup.add(banana);
  }
}

function obstacle() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600, 450, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -10
    obstacle.setLifetime = 50;
    obstacleGroup.add(obstacle);
  }
}


