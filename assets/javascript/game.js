// GLOBAL VARIABLES
//*******************************************************************************************/

//Arrays and variables for holding data
var wordList = ["luggage", "colorado", "bahamas", "disneyland", "airplane", "camera",
    "airport", "tourist", "paris", "jamaica"];
var wordToGuess = "";
var lettersGuessed = [];
var numberGuessesRemaining = 0; //number of letters not guessed
var emptyAndFilled = []; //e_ _ _ f _ _ _
var incorrectLetters = [];

//Game counters
var winsCount = 0;
var lossesCount = 0;
var guessesLeft = 9;

// Functions 
//*******************************************************************************************/

//Function start game
function startGame() {
    //Picks random word from wordList
    wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];
    //Splits letters from wordList
    lettersGuessed = wordToGuess.split("");
    //Identifies how many letters there are in the lettersGuessed
    numberGuessesRemaining = lettersGuessed.length;

    //Reset
    guessesLeft = 9;
    incorrectLetters = [];
    emptyAndFilled = [];

    //Generate blanks and filled
    for (var i = 0; i < numberGuessesRemaining; i++) {
        emptyAndFilled.push("_");
    }

    document.getElementById("wordToGuess1").innerHTML = emptyAndFilled.join(" ");
    document.getElementById("numberofGuessesRemaining1").innerHTML = guessesLeft;
    document.getElementById("wins1").innerHTML = winsCount;
    document.getElementById("losses1").innerHTML = lossesCount;
}

function checkLetters(letter) {
    //Check if letter exists in code
    var lettersGuessed = false;

    for (var i = 0; i < numberGuessesRemaining; i++) {
        if (wordToGuess[i] == letter) {
            lettersGuessed = true;
        }
    }

    //Check the position in word letter exists and generate emptyAndFilled
    if (lettersGuessed) {
        for (var i = 0; i < numberGuessesRemaining; i++) {
            if (wordToGuess[i] == letter) {
                emptyAndFilled[i] = letter;
            }
        }
    }
    //Letter does not exist
    else {
        incorrectLetters.push(letter);
        guessesLeft--;
    }
}

function roundDone() {
    document.getElementById("numberofGuessesRemaining1").innerHTML = guessesLeft;
    document.getElementById("wordToGuess1").innerHTML = emptyAndFilled.join(" ");
    document.getElementById("wrongGuesses1").innerHTML = incorrectLetters.join(" ");

    //Check if user won
    if (lettersGuessed.toString() == emptyAndFilled.toString()) {
        winsCount++
        alert("You won!");

        //Update wins in HTML
        document.getElementById("wins1").innerHTML = winsCount;

        startGame();
    }

    //Check if user lost
    else if (guessesLeft == 0) {
        lossesCount++;
        alert("You lost!")

        //Update loss in HTML
        document.getElementById("losses1").innerHTML = lossesCount;

        startGame();
    }
}

// Main 
//*******************************************************************************************/
startGame();

//Listen for letters entered by user
document.onkeyup = function (event) {
    var lettersGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(lettersGuessed);
    roundDone();
}