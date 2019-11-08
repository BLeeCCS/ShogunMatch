$(document).ready(intializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = 0;
var max_matches = 8;
var attempts = 0;
var games_played = 0;
var image1, image2;

function intializeApp() {
  var title = $("<div>").attr("id","title");
  var decor = $("<div>").attr("id", "decor");
  var aside = $("<aside>");
  var main = $("<main>").append($("<div>").addClass("container"));

  for (var i = 1; i <= 6; i++) {
    aside.append($("<div>"));
  }

  $("body").append(title,decor,aside,main);

  $("aside > div:nth-child(1)").text("Games Played");
  $("aside > div:nth-child(2)").attr("id", "gamesPlayed").text("0");
  $("aside > div:nth-child(3)").text("Attemps");
  $("aside > div:nth-child(4)").attr("id", "attemps").text("0");
  $("aside > div:nth-child(5)").text("Accuracy");
  $("aside > div:nth-child(6)").attr("id", "accuracy").text("0%");

  for (var j = 1; j <= 16; j++) {
    var firstDiv = $("<div>").addClass("lfz-card");
    var secondDiv = $("<div>").addClass("background");
    var divContainer = $("<div>").append(firstDiv,secondDiv);
    $(".container").append(divContainer);
  }

  $(".lfz-card").on("click", handleCardClick);
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
        var modal = {
          "width":"40vw",
          "height": "20vh",
          "background-color":'black',
          "background-size":"cover",
          "position":"absolute",
          "display":"inline-block",
          "margin":"auto",
          "z-index":"2",
          "text-align":"center",
          "font-size":"3rem",
          "padding":"20vh",
          "border":"5px solid red",
          "color": "yellow"
        }
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
    }
  }
  displayStats();
}
