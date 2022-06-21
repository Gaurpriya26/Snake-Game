import kaboom from "kaboom"

document.title= 'SNAKE GAME'
// initialize context
kaboom({
    background: [ 210, 210, 155, ],
    font: "sink",
  
})

// load assets
loadSprite("snake", "sprites/snake.png")
loadSprite("apple", "sprites/apple.png")
loadSprite("cactus", "sprites/cactus.png")

// load sound
loadSound("score", "sounds/score.mp3")

//variables
let SPEED=560
let score=0
let BSPEED=1
let g=true

//ADD PLAYER
const player = add([
    sprite("snake"),
    pos(100, 200),
    area(),
    scale(0.04),
  ])

//events
onKeyDown("left", () => {
    player.move(-SPEED, 0)
})
onKeyDown("right", () => {
    player.move(SPEED, 0)
})
onKeyDown("up", () => {
    player.move(0, -SPEED)
})
onKeyDown("down", () => {
    player.move(0, SPEED)
})

//ADD APPLE

loop(4, () => {
  loop(4, () => {
    if(g){
     let x= rand(0, width())
     let y= height()
    let b = add([
       sprite("cactus"),   
       pos(x,y),   
       area(),
       scale(0.13), 
       "cactus"
    ])
    
    
    b.onUpdate(()=>{
      b.moveTo(b.pos.x, b.pos.y - BSPEED)
    })
   }
})

    if(g){
  let x= rand(0, width())
  let y= height()
  let c = add([
       sprite("apple"),   
       pos(x,y),   
       area(),
       scale(0.03), 
       "apple"
    ])
   c.onUpdate(()=>{
    c.moveTo(c.pos.x, c.pos.y - BSPEED)
  })
   if(BSPEED<10){
     BSPEED++;
  }
}
})



//collision with apple
player.onCollide( "apple", (apple) => {
    destroy(apple)
    play("score")
    score.value += 10
    score.text = "Score:" + score.value
})

//collision with cactus
player.onCollide("cactus",(cactus)=> {
  destroy(player)
  addKaboom(player.pos)
  score.text = "Score:" + score.value
   add([
    text("GAME OVER"),
    scale(10),
    pos(450,300),
    g=false
  ])
})
// score display
    score = add([
    text("Score: "+score),
    scale(3),
    pos(24, 24),
    { value: 0 },
])
