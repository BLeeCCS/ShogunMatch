$(document).ready(intializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = 0;
var max_matches = 8;
var attempts = 0;
var games_played = 0;
var timer = 125;
var image1, image2;
var timerMusic = new Audio();
var victoryMusic = new Audio();
var defeatMusic = new Audio();

timerMusic.src = "./sounds/for_the_daimyo.mp3";
victoryMusic.src = "./sounds/Victory.mp3";
defeatMusic.src = "./sounds/Defeat.mp3";

function intializeApp() {
  //timerMusic.play();
  //clock();
  $(".lfz-card").on("click", handleCardClick);
  $("button").on("click",playSound);
}

function shuffle() {

}

function clock() {
  $("span").text(timer);
  var currentTimer = setInterval(()=>{
    timer -= 1;
    $("span").text(timer);
    
    if(timer == 0) 
      clearInterval(currentTimer);
  },1000);
}

function playSound(){
  music.pause();
}

function calculateAccuracy(){
  var accuracy = matches / attempts;
  accuracy = accuracy.toFixed(2) * 100;
  if (isNaN(accuracy)){
    return 0;
  }
  return accuracy;
}

function displayStats(){
  $("aside > div:nth-child(2)").text(games_played);
  $("aside > div:nth-child(4)").text(attempts);
  $("aside > div:nth-child(6)").text(calculateAccuracy() + "%");
}

function resetStats(){
  matches = attempts = 0;
  $(".lfz-card").removeClass("hidden");
}

function handleCardClick(event) {
  $(event.currentTarget).addClass("hidden");
  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
    image1 = firstCardClicked.siblings().css("background-image");
  } else {
    secondCardClicked = $(event.currentTarget);
    image2 = secondCardClicked.siblings().css("background-image");

    ++attempts;
    $(".lfz-card").off("click", handleCardClick);

    if (image1 !== image2) {
      setTimeout(function () {
        firstCardClicked.removeClass("hidden");
        firstCardClicked = null;
        $(".lfz-card").on("click", handleCardClick);
      }, 1500);

      setTimeout(function () {
        secondCardClicked.removeClass("hidden");
        secondCardClicked = null;
      }, 1500);

    } else {
      firstCardClicked = null;
      secondCardClicked = null;
      ++matches;
      $(".lfz-card").on("click", handleCardClick);
      console.log(matches,max_matches);
      if (matches === max_matches) {
        youWin();
      }
    }
  }
  displayStats();
}

function youWin() {
  timerMusic.pause();
  victoryMusic.play();
  $("#modal").css({"background-image":"url(./images/Winning.jpg)","visibility":"visible"}).text("Victory Is Yours!!!");
  var colors = ["red","green","yellow","pink", "purple", "blue", "orange","violet","aqua"];

  function randomColor() {
    return colors[Math.floor(Math.random(colors.length) * 9)];
  }

  setInterval(()=>{
    $("#modal").css("color",randomColor());
  },50);
  
  $("<#modalButton>").appendTo("$modal");
  ++games_played;
  $("#modalButton").on("click",() => { $("#modal").css("visibility","hidden"); });
  resetStats();
}