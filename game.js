let randomChosenColor, randomNumber;
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false, level = 0;


$("body").on('keypress',()=>{
    if(!started){
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    playSound(userChosenColor);
    animatePress(userChosenColor);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(()=>{
                nextSequence();
            },1000)
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $( "body" ).addClass("game-over");
        setTimeout(() => {
            $( "body" ).removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


let nextSequence = () => {
    userClickedPattern = [];
    $("#level-title").text(`level ${level}`);
    level ++;
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
    
    playSound(randomChosenColor);
}; 

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(()=>{
    $("#"+currentColor).removeClass("pressed");
    },100)
}

function playSound(name){
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}


function startOver(){
    started = false;
    gamePattern = [];
    level = 0;
}