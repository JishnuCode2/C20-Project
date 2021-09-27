//assigning the variables
    var backGround, backGroundImg,backGround2, invisibleGround;
    var runner, runner_animation;
    var obstacle, obstacleImg,clouds,cloudsImg;

    var gameState = "play";
    var score = 0;

    var obstaclesGroup, cloudsGroup;

    var restart, restartImg, gameOver, gameOver_img;
    var balloonImg,obstacle2,obstacle3,obstacle4;;

    var rand; 
    var day = 1;

    var dieSound, jumpSound, checkPointSound; 



function preload(){

 // loading the animations, sounds and images.

 runner_animation = loadAnimation("mainPlayer1.png","mainPlayer2.png");

 backGroundImg = loadImage("backGround.png");

 obstacleImg = loadImage("obstacle1.png");

 restartImg = loadImage("restart.png");

 gameOver_img = loadImage("gameOver.png");

 cloudsImg = loadImage("cloud.png");

 balloonImg = loadImage("blue_balloon0.png");

 obstacle2 = loadImage("obstacle2.png");

 obstacle3 = loadImage("obstacle3.png");

 obstacle4 = loadImage("obstacle4.png");

 backGround2 = loadImage("backGround2.png");

 dieSound = loadSound("die.mp3");

 jumpSound = loadSound("jump.mp3");

 checkPointSound = loadSound("checkpoint.mp3")

}

function setup() {
 // creating the canvas
 createCanvas(600,400);

 //creating the sprites and assigning properties to them
 backGround = createSprite(200,100);
 backGround.addImage("background", backGroundImg);
 backGround.addImage("night",backGround2);
 backGround.scale = 4;
 backGround.width = 600;

 runner = createSprite(100,200);
 runner.addAnimation("Running", runner_animation);
 runner.scale = 0.05;
 runner.setCollider("rectangle",0,0,800,800);

 invisibleGround = createSprite(100,330,400,50);
 invisibleGround.visible = false; 

 restart = createSprite(300,200);
 restart.scale = 0.5;
 restart.addImage("restart", restartImg);
 restart.visible = false;

 gameOver = createSprite(300,150);
 gameOver.scale = 0.4;
 gameOver.addImage("gameover", gameOver_img);
 gameOver.visible = false;

 //creating the groups
 obstaclesGroup = new Group();
 cloudsGroup = new Group();



}

function draw() {

 background("white");


 if(backGround.x<50){
     backGround.x = 600;
    }

 rand = Math.round(random(1,5));


 if(gameState === "play"){
     runner.velocityY = runner.velocityY+0.7;
     backGround.velocityX = -(3+score/100);

     if(keyDown("space") && runner.y>280){
         runner.velocityY = -12.6;
         jumpSound.play();
        }

     score = Math.round(score+getFrameRate()/60);

     if(score%100 === 0 && score>0){
         checkPointSound.play();
        }

     if(score%500=== 0 && score>0 ){
         backGround.changeImage("night",backGround2);
         day = 0
     } else if(score%800 === 0 && score>0 ){
         backGround.changeImage("background", backGroundImg);
         day = 1;
        }

     if(day === 0 && rand === 5){
         obstaclesGroup.destroyEach();
        }

     runner.collide(invisibleGround);

     if(obstaclesGroup.isTouching(runner)){
         dieSound.play();
         gameState = "end";
        }

     spawnObstacles();
     spawnClouds();
    }


 if(gameState === "end"){
     runner.visible = false;
     backGround.velocityX = 0;
     obstaclesGroup.destroyEach();
     cloudsGroup.destroyEach();
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     obstaclesGroup.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1);
     restart.visible = true;
     gameOver.visible = true;
    
     runner.velocityY=0;

     if(mousePressedOver(restart)){
         reset();
        }

    }


  drawSprites()

  textSize(20);
  fill("red");
  text("Score: "+score,10,30);
}

function spawnObstacles(){
    if(frameCount%70 === 0){
    obstacle = createSprite(600,300,20,20);
  
    obstacle.velocityX = -(4+score/100);
    obstacle.lifetime =600;
    obstacle.scale = 0.6;
    obstaclesGroup.add(obstacle);
    
    switch(rand){
        case 1:   obstacle.addImage(obstacleImg);
        break;
        case 2:  obstacle.addImage(obstacle2);  
        break;
        case 3 :  obstacle.addImage(obstacle3);
                  obstacle.scale = 0.8;
        break;
        case 4 :  obstacle.addImage(obstacle4);
                  obstacle.scale = 0.6;                        
        break;
        case 5:   obstacle.addImage(balloonImg);
                  obstacle.scale = 0.08;
                  obstacle.y = 210;
                  obstacle.velocityX = -(6+score/100);
        default: break;
    }
    }
}
function spawnClouds(){
    if(frameCount%46 === 0){
    clouds = createSprite(600,Math.round(random(30,180)),20,20);
    clouds.addImage(cloudsImg);
   
    clouds.velocityX = -(4+score/100);
    clouds.lifetime =600;
    clouds.scale = 0.4;
    cloudsGroup.add(clouds);
    clouds.depth = runner.depth;
    runner.depth = runner.depth+1;
    }
}

function reset(){
    gameState = "play";
    restart.visible = false;
    gameOver.visible = false;
    runner.visible = true;
    score = 0;
}



