const buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern =[];
var gameStarted = false;
var level = 0;




function next_sequence(){
    userClickedPattern=[];
   var randnum = Math.floor(Math.random()*3);
   var randomChosenColour = buttonColor[randnum];
   gamePattern.push(randomChosenColour);
   $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour)
   level++
   $("h1").text("Level:"+level);



}
$(".btn").on("click", function(e){
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePressed(userChosenColour)
   chickAnswer(userClickedPattern.length-1);

});

function animatePressed(currentColor){
    $("#"+currentColor).addClass("pressed")
    setTimeout(function(){
    $("#"+currentColor).removeClass("pressed")
    }, 1000);
}
function playSound(color){
    var sound = new Audio("sounds/"+color+".mp3");
    sound.play();
}

$("body").on("keydown",function(){
    if (gameStarted==false){
        next_sequence();
        gameStarted = true;
        $("h1").text("Level:"+level);

        

    } 
})

function chickAnswer(currentLevel) {
if(    userClickedPattern[currentLevel]===gamePattern[currentLevel]){
if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){next_sequence()},1000);
    }} else {
    playSound("wrong");
    $("body").addClass("game-over")
    setTimeout(function(){    $("body").removeClass("game-over")
},100);
$("h1").text("Game Over, Press Any Key to Restart");
startOver();


}

}

function startOver(){
    gamePattern = [];
    userClickedPattern=[];
    level=0;
    gameStarted=false;
}