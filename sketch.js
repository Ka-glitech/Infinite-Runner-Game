var mouse, mouseImage, mouseStopImage;
var cheese, cheeseImage, cheeseGroup;
var trap, trapImage, trapGroup;
var ground, groundImage;
var score = 0
var PLAY = 1;
var END = 2;
var gameState = PLAY;

function preload() {
  mouseImage = loadAnimation(
    "rodent1.png",
    "rodent2.png",
    "rodent3.png",
    "rodent4.png");
  //mouseStopImage = loadAnimation(
  //  "rodent2.png");
  cheeseImage = loadImage("cheese.png");
  trapImage = loadImage("trap.png");

}

function setup() {
  createCanvas(500, 400);

  mouse = createSprite(80, 315, 20, 20);
  //mouse.addAnimation("mouseStop", mouseStopImage);
  mouse.addAnimation("mouseRun", mouseImage);
  mouse.changeAnimation ("mouseRun");
  mouse.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -10;
  ground.x = ground.width / 2;
  //console.log(ground.x);

  cheeseGroup = createGroup();
  trapGroup = createGroup();
}

function draw() {
  
  background("pink");

  camera.position.x= mouse.x
  
  if (gameState === PLAY) {
    handleJump();
    resetGround();
    createCheese();
    createTrap();
  }

  // do score
  if (mouse.isTouching(cheeseGroup)) {
    score = score + 5;
    if (score) {
      ground.velocityX = -4 * score/8;
    } else {
      ground.velocityX = -4;
    }
    if (mouse.scale < 0.18) {
      mouse.scale = mouse.scale + 0.02;
    }
    cheeseGroup.destroyEach();
  }

  // prevent survival
  if (mouse.isTouching(trapGroup)) {
    //gameState = END;
    //mouse.changeAnimation("mouseStop");

    //cheeseGroup.setVelocityXEach(0);
    //trapGroup.setVelocityXEach(0);
    //ground.velocityX = 0;
    
    if (score > 0) {
      score = score - 5;
    }
    if (mouse.scale > 0.1) {
      mouse.scale = mouse.scale - 0.02;
    }
    trapGroup.destroyEach();
  }

  if (gameState == END) {

    // Display "GAME OVER"
    stroke("red");
    textSize(30);
    fill("red");
    text("GAME OVER", 300, 300);
    
    //  restart game
    if (keyDown("space")) {
      mouse.changeAnimation("mouseRun");
      gameState = PLAY;
      ground.velocityX = -4;
    }
  }
  
  /*switch (score) {
      case 20:
        mouse.scale = 0.12;
        break;
      case 50:
        mouse.scale = 0.14;
        break;
      case 80:
        mouse.scale = 0.16;
        break;
      case 120:
        mouse.scale = 0.18;
        break;
    }*/

  mouse.collide(ground);

  drawSprites();

  stroke("Black");
  textSize(15);
  fill("Black");
  text("score: " + score, 400, 50);
}

function handleJump() {

  // jump on space key
  if (keyDown("space")) {
    mouse.velocityY = -15;
  }
  
  // add gravity
  mouse.velocityY = mouse.velocityY + 1;
  //console.log (mouse.Y);
}

function resetGround() {
  
  // scroll ground
  if (ground.x < ground.width / 2) {
    ground.x = ground.width / 2;
  }
}

function createCheese() {
  if ((World.frameCount % 60) === 0) {
    var randY = Math.round(random(120, 210));
    cheese = createSprite(450, randY, 20, 20);
    cheese.addImage(cheeseImage);
    cheese.lifetime = 140;
    if (score) {
      cheese.velocityX = -10 * score/10;
    } else {
      cheese.velocityX = -10;
    }
    cheese.scale = 0.07;
    cheeseGroup.add(cheese);
  }
}

function createTrap() {
  if ((World.frameCount % 120) === 0) {
    var randY = Math.round(random(120, 210));
    trap = createSprite(600, randY, 20, 20);
    trap.addImage(trapImage);
    trap.lifetime = 140;
    if (score) {
      trap.velocityX = -10 * score/10;
    } else {
      trap.velocityX = -10;
    }
    trap.scale = 0.25;
    trapGroup.add(trap);
  }
}