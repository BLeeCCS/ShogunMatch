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
var colors = ["red","green","yellow","pink", "purple", "blue", "orange","violet","aqua"];

timerMusic.src = "./sounds/for_the_daimyo.mp3";
victoryMusic.src = "./sounds/Victory.mp3";
defeatMusic.src = "./sounds/Defeat.mp3";

function intializeApp() {
  timerMusic.play();
  clock();
  shuffle();
  $(".lfz-card").on("click", handleCardClick);
}

function shuffle() {
  let randomImage = null;
  let image = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]

  for (let card = 1; card <= 16; card++) {
    randomImage = Math.floor(Math.random(image.length) * image.length);
    $("#card"+ card + ">.background" ).css("background-image","url("+"./images/Samurai_"+image[randomImage]+".png");
    image.splice(randomImage,1);
  }
}

function clock() {
  $("span").text(timer);
  if (timer == 125) {
    clearInterval(currentTimer);
    var currentTimer = setInterval(()=>{
      timer -= 1;
      $("span").text(timer);
      
      if(matches === max_matches || timer == 0) 
        clearInterval(currentTimer);
        if (timer == 0) {
          youLose();
        }
    },1000);
  };
}

function calculateAccuracy(){
  var accuracy = (matches / attempts) * 100;

  if (isNaN(accuracy)){
    return 0;
  }
  return accuracy.toFixed(0);
}

function displayStats(){
  $("aside > div:nth-child(2)").text(games_played);
  $("aside > div:nth-child(4)").text(attempts);
  $("aside > div:nth-child(6)").text(calculateAccuracy() + "%");
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
  victoryMusic.load();
  victoryMusic.play();
  $("#modal").css({"background-image":"url(./images/Winning.jpg)","visibility":"visible"}).text("VICTORY IS YOURS!!!");

  var changefontColor = setInterval(()=>{
    $("#modal").css("color",randomColor());
  },50);

  var button = $("<button>").attr("id","modalButton").text("Play Again?");
  button.appendTo($("#modal"));
  ++games_played;
  $("#modalButton").on("click",() => {  $("#modal").css("visibility","hidden"); 
                                        clearInterval(changefontColor); 
                                        victoryMusic.pause();
                                        resetStats();} );
};

function youLose() {
  timerMusic.pause();
  defeatMusic.load();
  defeatMusic.play();
  $("#modal").css({"background-image":"url(./images/Losing.jpg)","visibility":"visible"}).text("YOU ARE DEFEATED!!!");

  var changefontColor = setInterval(()=>{
    $("#modal").css("color",randomColor());
  },50);

  var button = $("<button>").attr("id","modalButton").text("Play Again?");
  button.appendTo($("#modal"));
  ++games_played;
  $("#modalButton").on("click",() => {  $("#modal").css("visibility","hidden"); 
                                        clearInterval(changefontColor); 
                                        defeatMusic.pause();
                                        resetStats();} );
};

function resetStats(){
  timerMusic.load();
  matches = attempts = 0;
  $(".lfz-card").removeClass("hidden");
  timer = 125;
  clock();
  timerMusic.play();
}

function randomColor() {
  return colors[Math.floor(Math.random(colors.length) * 9)];
}