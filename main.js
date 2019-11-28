$(document).ready(intializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = 0;
var max_matches = 8;
var attempts = 0;
var games_played = 0;
var timer = 125;
var image1, image2;
var music = new Audio();
music.src = "./for_the_daimyo.mp3";

function intializeApp() {
  //music.play();
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
      }, 1500)

      setTimeout(function () {
        secondCardClicked.removeClass("hidden");
        secondCardClicked = null;
      }, 1500)

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
  // var modal = {
  //   "width":"40vw",
  //   "height": "20vh",
  //   "background-color":'black',
  //   "background-size":"cover",
  //   "position":"absolute",
  //   "display":"inline-block",
  //   "margin":"auto",
  //   "z-index":"2",
  //   "text-align":"center",
  //   "font-size":"3rem",
  //   "padding":"20vh",
  //   "border":"5px solid red",
  //   "color": "yellow"
  // }
  var myModal = $("<div>").css(modal).text("Congratulations!You Won!");
  var button = $("<button>").css("font-size","2rem").text("Play Again?");
  myModal.addClass("modalClass");
  button.addClass("myButton");
  button.appendTo(myModal);
  $("body").append(myModal);
  ++games_played;
  $(".myButton").on("click",function() {
    $(".modalClass").hide();
  })
  resetStats();
}