var currentLevel = 0;
var clickCount = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

$(document).on("keydown", function () {
    if (currentLevel === 0){
        currentLevel++;
        $("h1").text("Level " + currentLevel);
        $("body").removeClass("game-over");
        nextSequence();
    }
})

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    var sound = new Audio("sounds/" + randomChosenColor + ".mp3");
    sound.play();
}

$(".btn").on("click", function(){
    buttonAnimation(this.id);
    userClickedPattern.push(this.id);
    clicked();
})

function clicked(){
    clickCount++;
    if (checkAnswer(clickCount-1)){
        if (clickCount >= currentLevel){
            setTimeout(nextSequence, 1000);
            currentLevel++;
            $("h1").text("Level " + currentLevel);
            clickCount = 0;
            userClickedPattern = [];
        }
    }else {
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over! Press Any Key to Restart");
        clickCount = 0;
        currentLevel = 0;
        gamePattern = [];
        userClickedPattern = [];
    }
}

function buttonAnimation(key){
    var activeButton = $("#"+key);
    activeButton.addClass("pressed");
    setTimeout(function() {
        activeButton.removeClass("pressed");
    }, 100);
    var sound = new Audio("sounds/" + key + ".mp3");
    sound.play();
}

function checkAnswer(i) {
    if (userClickedPattern[i] === gamePattern[i]) {
        return true;
    }
    return false;
}