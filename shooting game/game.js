window.addEventListener("load", function(){
    //setup canvas
    const canvas = document.getElementById("canvas1")
    const ctx = canvas.getContext("2d")
    canvas.width=700
    canvas.height = 500

    class InputHandler{
        constructor(game){
            this.game = game
            window.addEventListener("keydown", function(e){
                if ((e["key"] === "ArrowDown" || e["key"] === "ArrowUp" ) 
                && game.keys.indexOf(e["key"])===-1)  game.keys.push(e["key"])
               else if (e.key === " ") game.player.shootTop()
               else if (e.key === "d") {game.debug = !game.debug}
               else if(e.key ==="c"){game.player.frameY=!game.player.frameY}


            })
            addEventListener("keyup", function(e){
            if(e["key"]==="ArrowUp" || e["key"]==="ArrowDown") game.keys.splice(game.keys.indexOf(e["key"]),1)


            })
        }
     }
    class Projectile {
        constructor(game, x,y){
            this.x = x
            this.y= y
            this.width= 10
            this.height=3
            this.speed =3
            this.mardedForDeletion
            this.image = document.getElementById("pro")
    
        }
        update(){
            this.x += this.speed
            if (this.x > 0.8*game.width) this.mardedForDeletion=true

        }
        draw(context){
            context.drawImage(this.image,this.x, this.y)
            context.strokeRect( this.x,this.y , this.width, this.height )
        }
    }
    class Particle{
        constructor(game, x, y){
            this.game = game
            this.x = x
            this.y = y
            this.image = document.getElementById("gear")
            this.frameX=Math.floor(Math.random()*3)
            this.frameY=Math.floor(Math.random()*3)
            this.height=50
            this.width= 50
            this.speedX = Math.random()*6-3
            this.speedY = Math.random()*-15
            this.gravity=0.5
            this.markForDeletion=false
            this.va= Math.random()*0.2-0.1
        }
        update(){
            this.angle += this.va
            this.speedY+= this.gravity
            this.x -= this.speedX
            this.y += this.speedY


            

        }
        draw(context){
            context.drawImage(this.image,this.frameX*this.width, this.frameY*this.height, this.width,this.height,this.x, this.y,this.width, this.height)
        }
    }
    class Player{
        constructor(game){
            this.game = game
            this.width = 120
            this.height =190
            this.x = 20
            this.y = 100
            this.speedY = 0 
            this.maxSpeed = 2
            this.projectiles=[]
            this.image= document.getElementById("player")
            this.frameX=0
            this.frameY=0
            this.frameTime= 0
            this.maxFrameX=37
            this.powerUp = false
            this.powerUpLimit= 10000
            this.powerUpTime = 0

            

        
        }
        update(deltaTime){
            this.y += this.speedY
            if(game.keys.includes("ArrowDown"))   this.speedY =-this.maxSpeed
            else if(game.keys.includes("ArrowUp"))     this.speedY = this.maxSpeed
            else this.speedY = 0
            // handle projctiles
            this.projectiles.forEach(function(projctile){
                projctile.update()
            })
            this.projectiles = this.projectiles.filter(proj=>!proj.mardedForDeletion)
            //sprite animation
            if(this.frameX<this.maxFrameX) {this.frameX++
             }
            else this.frameX=0

//          adding power ups
             if(this.powerUp){
                
                if(this.powerUpTime>this.powerUpLimit) {
                    this.powerUpTime = 0
                    this.powerUp=false
                    this.frameY=0
                    console.log(this.frameY)
                    
                }else this.powerUpTime+=deltaTime
                this.frameY=1
                this.game.ammo+=0.1
             }

             





        }
        draw(context){
            context.fillStyle = "black"
            if(this.game.debug){ context.strokeRect(this.x,this.y,this.width,this.height)}
            context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height )
            this.projectiles.forEach(function(projctile){
                projctile.draw(context) })
        }


        shootTop(){
            if( this.game.ammo > 0){
          {  this.projectiles.push(new Projectile(this.game, this.x+80,this.y+30))
            this.game.ammo--}
            if (this.powerUp) this.shootBottom()
        }
        }
        shootBottom(){

            if( this.game.ammo > 0){
                {  this.projectiles.push(new Projectile(this.game, this.x+80,this.y+150))
                  this.game.ammo--}
              }
        }
        enterPowerUp(){
            this.powerUp=true
            this.powerUpTime=0
            this.frameY=1
            this.game.ammo = this.game.ammoMax
        }
    }
    class Enemy{
        constructor(game){
            this.game = game
            this.x = this.game.width
            this.speedX = Math.random()* -1.5 -0.5
            this.markForDeletion = false
            this.live = 5
            this.score = this.live
            this.frameX=0
            this.maxFrameX=37
            

        }
        update(){
            this.x+=this.speedX-this.game.speed
            if (this.x + this.game.width<0) {this.markForDeletion=true }
            if(this.frameX<this.maxFrameX)this.frameX++
            else(this.frameX=0)
            
            


            
          
        }

        draw(context){
            context.fillStyle  ="red"
            if(this.game.debug){context.strokeRect(this.x, this.y, this.width, this.height )
            context.fillText(this.live,this.x,this.y)
}
            context.drawImage(this.image,this.frameX*this.width, this.frameY*this.height, this.width,this.height,this.x,this.y,this.width,this.height)
            context.color="black"
        }


    }
    class Angler1 extends Enemy{
        constructor(game){
            super(game)
            this.width = 228
            this.height = 169
            this.y = Math.random() * (this.game.height * 0.9- this.height)
            this.image = document.getElementById("angler1")
            this.frameY= Math.floor(Math.random()*3)

            
        }
        
            
    }class Angler2 extends Enemy{
        constructor(game){
            super(game)
            this.width = 213
            this.height = 165
            this.y = Math.random() * (this.game.height * 0.9- this.height)
            this.image = document.getElementById("angler2")
            this.frameY= Math.floor(Math.random()*2)
            this.live=3
            this.score=3

            
        }
    }
    class lucky extends Enemy{
        constructor(game){
            super(game)
            this.width = 99
            this.height = 95
            this.y = Math.random() * (this.game.height * 0.9- this.height)
            this.image = document.getElementById("lucky")
            this.frameY= Math.floor(Math.random()*2)
            this.live=3
            this.score=15
            this.type="lucky"

            
        }
    } 
    class Layer{
        constructor(game,image,speedModifier){
            this.game = game    
            this.image = image
            this.speedModifier = speedModifier
            this.width= 1768
            this.height=500
            this.x = 0
            this.y = 0
        }
        update(){
            if(this.x <=-this.game.width) this.x=0
            this.x -= this.game.speed * this.speedModifier
        }
        draw(context){
            context.drawImage(this.image, this.x,this.y)
            context.drawImage(this.image, this.x+this.width,this.y)


            
        }
    }
    class Backround{
        constructor(game){
            this.game = game
            this.image1 = document.getElementById("layer1")
            this.image2 = document.getElementById("layer2")
            this.image3 = document.getElementById("layer3")
            this.image4 = document.getElementById("layer4")

            this.layer1 = new Layer(this.game,this.image1 , 0.2)
            this.layer2 = new Layer(this.game,this.image2 , 0.4)
            this.layer3 = new Layer(this.game,this.image3 , 1)
            this.layer4 = new Layer(this.game,this.image4 , 1.5)

            this.layers = [this.layer1, this.layer2,this.layer3]        


        }
        update(){
            this.layers.forEach(layer=>layer.update())
        }
        draw(context){
            this.layers.forEach(layer=>layer.draw(context))

        }

    }
    class UI{
        constructor(game){
            this.game = game
            this.color = "white"
            this.fontSize = 25
            this.fontFamily= "Bangers"
        }
        draw(context){ 
            context.save()
            context.shadowOffsetX = 2
            context.shadowOffsetY = 2
            context.shadowColor = "black"
            context.shadowBlur = 10

            //timer 
            context.font= "30px " + this.fontFamily
            context.fillText("Time: "+(game.gameTime/1000).toFixed(1),380,30)
            //ammo
            context.fillStyle = this.color
            for (let i=0; i<this.game.ammo; i++){
                context.fillRect(20 + i*5, 50 , 3, 30)
            }
            //score
            context.font="20px Bangers"
            context.fillText("Score: "+game.score, 20, 40)

            // messages
           if(game.gameOver){
            let message1
            let message2
            if(game.winningScore<=game.score){
                message1= "most wonders"
                message2= "Well Done explorer"
            }else{
                message1="Blazes"
                message2=" get my repair kit and try again "
            }
            context.font = "50px "+ this.fontFamily
            context.fillText(message1, 0.5*game.width, 0.5*game.height-40)
            context.font = "25px    "+ this.fontFamily
            context.fillText(message2, 0.5*game.width, 0.5*game.height+40)


           }
            context.restore()




        }
        
    }
    class Game{
        constructor(width,height){
            this.width = width
            this.height = height
            this.player = 
            new Player(this)
            new InputHandler(this)
            this.ui = new UI(this)
            this.backround  = new Backround(this)
            this.keys=[]
            this.enemies = []
            this.ammo = 20
            this.ammoMax = 50
            this.ammoTime = 0
            this.ammoInterval = 500
            this.enemyInterval = 1000
            this.enemyTime = 0
            this.gameOver= false
            this.score = 0
            this.winningScore=50
            this.gameTime = 0
            this.gameLimit = 1000000
            this.speed = 1
            this.debug = true
            this.particles=[]
        }
        update(deltaTime){
            this.backround.update()
            this.backround.layer4.update()
            if (!this.gameOver) this.gameTime+=deltaTime
            if (this.gameTime>this.gameLimit) this.gameOver=true
            this.player.update(deltaTime)
            this.particles.forEach(part=>part.update())
            if(this.ammoTime> this.ammoInterval){
            if (this.ammo<this.ammoMax ) { 
                this.ammo++
                this.ammoTime = 0
                }}
            else this.ammoTime+=deltaTime


            this.enemies.forEach(enemy=>
              {  enemy.update()
                
                if (this.checkCollision(this.player,enemy)) 
                    {enemy.markForDeletion=true}
                
                    this.player.projectiles.forEach(projectile=>{
                        if (this.checkCollision(projectile,enemy)){
                            this.particles.push(new Particle(this,enemy.x+enemy.width*0.5,enemy.y+enemy.height*0.5 ))
                            console.log(this.particles)
                            if (enemy.type =="lucky") this.player.enterPowerUp()
                            projectile.mardedForDeletion=true
                            enemy.live--
                            if(enemy.live<=0){
                                enemy.markForDeletion=true
                                if(!this.gameOver){this.score+= enemy.score}
                                if(this.score >= this.winningScore) this.gameOver=true
                                                                        
                            }
                           
                        }})
                    
                
                }

                
            )
            this.enemies = this.enemies.filter(enemy=>!enemy.markForDeletion)        


            if(this.enemyTime > this.enemyInterval && !this.gameOver){
                this.addEnamy()

               
                this.enemyTime = 0
            }else this.enemyTime += deltaTime
            //game boundries
            if (this.player.y >= this.height-this.player.height) this.player.y=this.height-this.player.height
            if(this.player.y<0)  this.player.y=0
        }
        draw(context){
            this.backround.draw(context)
            this.player.draw(context)
            this.backround.layer4.draw(context)
            this.ui.draw(ctx)
            this.enemies.forEach(function(enemy){
                enemy.draw(context)})
                this.particles.forEach(function(part){
                part.draw(context)
            })
            
        }
        addEnamy(){
            const randomize = Math.random()
            if (randomize>0.5) this.enemies.push(new Angler1(this))
            else if(randomize>0.3) this.enemies.push(new Angler2(this))
            else this.enemies.push(new lucky(this))
            

           
        }
        checkCollision(rect1,rect2){
            return(
                rect1.x<rect2.x + rect2.width&&
                rect1.x + rect1.width>rect2.x&&
                rect1.y<rect2.y+rect2.height&&
                rect1.y+rect1.height>rect2.height
            )
        }
    }
const game = new Game(canvas.width, canvas.height)
// animation loop function
let lastTime = 0
function animate(timeStamp){
    let deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0,0,canvas.width,canvas.height)
    game.update(deltaTime)
    game.draw(ctx)
    requestAnimationFrame(animate)
}
animate(0)
})