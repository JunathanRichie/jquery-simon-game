let buttonColours=["red","blue","green","yellow"];
let gamePattern=[];
let userClickedPattern=[];
let started=0;
let level=0;
function nextSequence(){
    let randomNumber=Math.floor(Math.random()*4)
    let randomChosenColour=buttonColours[randomNumber];
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#level-title").text("LEVEL "+level);
}
$(".btn").on("click",function(e){
    let id_btn=e.target.id;
    playSound(id_btn);
    userClickedPattern.push(id_btn);
    animatePress(e.target.id);
    if(userClickedPattern[userClickedPattern.length-1]!=gamePattern[userClickedPattern.length-1]){
        let gameOverAudio=new Audio("sounds/wrong.mp3");
        gameOverAudio.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }else{
        if(userClickedPattern.length==level+1){
            userClickedPattern=[];
            level++;
            nextSequence();
        }
    }
})
function playSound(name){
    let audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}
function startOver(){
    started=0;
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    $(document).on("keydown",function(){
        if(!started){
            nextSequence();
            started=1;
        }
    })
}
$(document).on("keydown",function(e){
    if((e.key=='a'||e.key=='A')&&(!started)){
        started=1;
        nextSequence()
    }
})