var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
// Function handler btn dibawah gabakal berfungsi klo ditaruh
// dibawah function
// nextSequence

$(document).keypress(function(){
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
})

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // using jquery to select the button with the same id as the randomChosenColour
  //
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}



function checkAnswer(currentLevel) {
  // KALO IF NYA KEBALIK BAKALAN GAGAL
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence()},1000);
      userClickedPattern.splice(0,userClickedPattern.length);
    }


  }
  else {
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    level = 0;
  }
}
