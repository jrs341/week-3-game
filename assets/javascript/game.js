
var guessedLetters = [];

var hairbands = ["poison", "van halen", "aero smith", "white snake"];

var arr = hairbands[Math.floor(Math.random() * hairbands.length)];

var blank = new Array(arr.lenght);

var numGuessRem = arr.length + 6;

var wrongGuess = 0;

var continueGame = true;

var emoji = document.createElement('img');

// this for loop adds an underline to each letter of the band name or places a dash if there is a space
for (var i = 0; i < arr.length; i++) {
	if (arr[i].indexOf(' ') >= 0) {
		blank[i] = " - ";
	} 
	else {
	blank[i] = ' _ ';
	}	
}

function winCounter() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.wincount) {
            localStorage.wincount = Number(localStorage.wincount)+1;
        } else {
            localStorage.wincount = 0;
        }
        document.getElementById('wins').innerHTML = 'Wins: ' + localStorage.wincount;
    } else {
        document.getElementById("wins").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

function lossCounter() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.losscount) {
            localStorage.losscount = Number(localStorage.losscount)+1;
        } else {
            localStorage.losscount = 0;
        }
        document.getElementById('losses').innerHTML = 'Losses: ' + localStorage.losscount;
    } else {
        document.getElementById("losses").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

function emojiAppend() {
	emoji.setAttribute('style', 'position: absolute; z-index: 1; height: 100px; width: 100px; top: 38px; left: 82px;');
	document.getElementById('images').appendChild(emoji);
}
function include(arr, obj) {

		if (guessedLetters.indexOf(obj) > -1 && numGuessRem >= 1) {
			wrongGuess++;
			document.getElementById('status').innerHTML = 'You Guessed That Letter Already';
		} 
		else if (arr.indexOf(obj) === -1 && guessedLetters.indexOf(obj) === -1 && numGuessRem >= 1 && arr.split(" ").toString() != blank.join()) {
			wrongGuess++;
			document.getElementById('status').innerHTML = 'Try Again';
				if (wrongGuess === 1) {
					emoji.src = 'assets/images/flushedFace.png';
					emojiAppend();
				}
				else if (wrongGuess === 2) {
					emoji.src = 'assets/images/disappointedFace.png';
					emojiAppend();
				}
				else if (wrongGuess === 3) {
					emoji.src = 'assets/images/angryFace.png';
					emojiAppend();
				}
				else if (wrongGuess === 4) {
					emoji.src = 'assets/images/triumphFace.png';
					emojiAppend();
				}
				else if (wrongGuess === 5) {
					emoji.src = 'assets/images/cryingFace.png';
					emojiAppend();
				}
				else if (wrongGuess === 6) {
					emoji.src = 'assets/images/dizzyFace.png';
					emojiAppend();
				}
		} 
		else {
			document.getElementById('status').innerHTML = 'Good Guess';
		}
		if (obj) {
			guessedLetters.push(obj);
		}
		for(var i = 0; i < arr.length; i++) {
			if (arr.split("")[i] === obj) { 
				blank.splice(i, 1, obj);
			}
		}
}

// reference: http://stackoverflow.com/questions/30820611/javascript-arrays-cannot-equal-each-other
function arraysEqual(arr1, arr2) {

	if (arr1.split("").toString() == arr2.join()) {
		wins ++;
		emoji.src = 'assets/images/grinningFace.png';
		emojiAppend();
		document.getElementById('status').innerHTML = 'You Win';
		return continueGame = false;
	} 
	else if (wrongGuess === 6) {
		document.getElementById('status').innerHTML = 'You lost, the band is ' + arr + ' would you like to play again?';
		lossCounter();
		return continueGame = false;
	} 
}

	document.getElementById('word').innerHTML = blank.join(' ');
	document.getElementById('guessedLetters').innerHTML = guessedLetters.join(' ');
	document.getElementById('wins').innerHTML = 'Wins: ' + localStorage.wincount;
	document.getElementById('losses').innerHTML = 'Losses: ' + localStorage.losscount;

document.onkeyup = function(event) {

var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	if (event.keyCode == 13) {
		location.reload();
		continueGame = true;
	}

	else if (continueGame) {

		 if (numGuessRem > 0) {
			numGuessRem --;
			include(arr, userGuess);
			arraysEqual(arr, blank);
		} 
	}
		document.getElementById('word').innerHTML = blank.join(' ');
		document.getElementById('guessedLetters').innerHTML = guessedLetters.join(' ');				
}


