var  boy, backgroundIMG, ground, boyIMG, back,roof,obstaclesGroup,gameState, starGroup, i,count,ground2;

function preload() {
    backgroundIMG=loadImage("Background.jpg")
    boyIMG=loadImage("boy.png");
}

function setup(){
    createCanvas(1480,1000)
    back=createSprite(100,500,1000,1000)
    boy=createSprite(200, 800,10,10)
    boy.scale=0.2
    back.addImage(backgroundIMG)
    back.scale=2
    ground= createSprite(750, 900, 1500, 10);
    ground2= createSprite(750, 900, 1500, 10);
    ground2.shapeColor="white"
    ground.visible=true;
    roof = createSprite(740,0,1500,10)
    obstaclesGroup=new Group();
    starGroup=new Group();
    count=0
    gameState=0
}

function draw(){
    //background(backgroundIMG)

    if(gameState==0){
        i=0
        count = count + round(getFrameRate()/60 );
        boy.visible=true;
        back.velocityX=2
        back.x=back.width/2
        ground.velocityX=3
        ground.x=ground.width/2
        ground2.x=ground2.width/2
        ground2.velocityX=3
        boy.addImage("boy",boyIMG)
        if(keyDown(UP_ARROW)){
            boy.velocityY=-20
        }
        boy.velocityY=boy.velocityY+0.8
        boy.collide(ground);
        boy.bounceOff(roof);
        
        spawnObstacles();
        spawnStars();

        
        if(boy.isTouching(starGroup)){
            gameState=2
        }

        if(obstaclesGroup.isTouching(boy)){
            gameState=1
        }

        if(count > 200 && count<3000){
            var number = 5//random(1,10);
            if(number==5){
                //floor is lava text here
                console.log(number)
                if(boy.isTouching(ground2)){
                    console.log(gameState)
                    gameState=1
                }
            }
        }


    
    if(gameState==1){
        
        obstaclesGroup.setVelocityXEach(0);
        starGroup.setVelocityXEach(0);
        boy.velocityY=0;
        back.velocityX=0
        ground.velocityX=0
        fill("red");
        textFont("Algerian");
        textSize(30);
        text("Game Over",740,500);
    }

    if(gameState==2){
        boy.visible=false
        back.velocityX=2
        back.x=back.width/2
        ground.velocityX=3
        ground.x=ground.width/2
        i++
        if(i==500){
            gameState=0
        }
    }

    drawSprites();
    
    
    textSize(25)
    text("Score: "+count,1300, 200)
}

function spawnObstacles(){
    if(frameCount % 80 === 0){
        var obstacle=createSprite(1550, 800,20,20)
        
        obstacle.velocityX=-4
        var position=Math.round(random(1,2))
        if(position==1){
            obstacle.y=boy.y-Math.round(random(10,20))
        }
        if(position==2){
            obstacle.y=boy.y+Math.round(random(10,20))
        }
        obstaclesGroup.add(obstacle);
    }

    
}

function spawnStars(){
    if(frameCount % 1000 === 0){
        var star = createSprite(1550,500,50,50)
        star.velocityX=random(-3,-8);
        var starposition=Math.round(random(1,2))
        if(starposition==1){
            star.y=boy.y-Math.round(random(10,20))
        }
        if(starposition==2){
            star.y=boy.y+Math.round(random(10,20))
        }
        starGroup.add(star);
    }
}
}