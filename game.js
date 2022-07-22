
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameOn = false;



function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {


        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameOn = false;
    $("#level-title").text("Press A Key to Start");
}

$(document).keypress(function () {
    if (!gameOn) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameOn = true;
    }

});


function nextSequence() {

    userClickedPattern = [];

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    // console.log(gamePattern);
    level++;

}

$(".btn").click(function () {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

    animatePress(this);
    playSound(userChosenColour);

});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $(currentColour).addClass("pressed");
    setTimeout(function () {
        $(currentColour).removeClass("pressed");
    }, 100);
}






