var bg,bgimg,ground
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,bush
var FoodGroup, obstacleGroup
var score=0,survtime
var play=1,end=2
var gamestate=play  


function preload(){
  
  bgimg=loadImage("jungle.jpg")
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bush=loadImage("bush.png")
 
}

function setup() 
{
  createCanvas(800,750);

  bg=createSprite(width/2,height/2);
  bg.addImage("bg",bgimg);


  
  iground=createSprite(width/2,height-100,width,5);
  iground.visible=false;
  
  monkey=createSprite(100,400);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.2;
  monkey.velocityY=2;

  FoodGroup = new Group();
  obstacleGroup= new Group();
  
}


function draw() 
{
  if(gamestate===play)
    {
      bg.velocityX=-8;
    if(bg.x<450)
      {
        bg=createSprite(bg.width+300,height/2) 
        bg.addImage("bg",bgimg);
        bg.depth=monkey.depth-1;
        bg.lifetime=22.5;
      }
      
      obs();
      bananas();
      
    if(   monkey.collide(iground)  )
      {
        if(keyDown("space") || touches.length>0)
          {    
            monkey.velocityY=-15
            touches=[];
          }

      }

      if(monkey.isTouching(FoodGroup))
        {
          FoodGroup.destroyEach();
          score=score+2;
        }
      
      switch(score)
        {
          case 10: monkey.scale=0.22;
          
          case 20: monkey.scale=0.25;
                   break;
          case 30: monkey.scale=0.27;
                   break;
          case 40: monkey.scale=0.3;
                   break;
          case 50: monkey.scale=0.32;
                   break;
          case 60: monkey.scale=0.35;
                   break;
          case 70: monkey.scale=0.37;
                   break;
          case 80: monkey.scale=0.4;
                   break;   
          case 90: monkey.scale=0.42;
                   break;
          case 100: monkey.scale=0.45;
                   break;
          default : break;
        }
    }
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(iground);
  
  if(monkey.isTouching(obstacleGroup))
    {
      monkey.scale=0.2;
    }

  drawSprites();
  
  survtime = Math.ceil(frameCount/frameRate());
  fill("yellow")
  textSize(30)    
  text("Survival Time : "+ survtime,350,50);
  text("Score : "+ score,50,50);
}

function obs()
{
  if(frameCount%150===0)
    {  
      obstacle=createSprite(550,height-160)
      obstacle.velocityX=-8;
      obstacle.lifetime=120
      obstacle.depth=monkey.depth-1;
      
      var rand=Math.round(random(1,2));
      
      switch(rand)
        {
          case 1: obstacle.addImage("obs",obstacleImage)
                  obstacle.scale=0.2
                  break;
          case 2: obstacle.addImage("obs2",bush)
                  obstacle.scale=0.16
                  break;
      }
      obstacleGroup.add(obstacle);
    }

}

function bananas()
{
  if(frameCount%80===0)
    {
      banana=createSprite(550,Math.round(random(height-400,height-300)))
      banana.velocityX=-8;
      banana.lifetime=120;
      banana.addImage("food",bananaImage)
      banana.scale=0.15;
      banana.depth=monkey.depth-1;
      FoodGroup.add(banana);
    }
  
}
