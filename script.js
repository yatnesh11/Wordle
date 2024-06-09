const wordList = [
    "apple", "space", "python", "romeo", "guitar", "china", 
    "piano", "japan", "swift", "drums", "korea", "grape", 
    "india", "mango", "peach", "cello", "cherry", "flute", 
    "italy"
];

// Selecting a random word from the list
var random = Math.floor(Math.random() * wordList.length);
var ans = wordList[random].toUpperCase();

let currentRow = 0;
let currentBox = 0;
let guessedWord = "";

// Function to handle key press
function handleKeyPress(c) {
    let currentRowBoxes = document.querySelectorAll(`.column:nth-child(${currentRow + 1}) .box`);

    if (c === "ENTER") {
        if (guessedWord.length === 5) {
            changecss(currentRow, guessedWord);
            if (guessedWord === ans) {
                document.getElementById("result").innerHTML = "You Win";
                return;
            } else if (currentRow < 5) {
                currentRow++;
                currentBox = 0;
                guessedWord = "";
            }
        }
    } else if (c === "BACKSPACE") {
        if (guessedWord.length > 0) {
            guessedWord = guessedWord.slice(0, -1);
            currentBox--;
            currentRowBoxes[currentBox].innerHTML = "";
        }
    } else {
        if (guessedWord.length < 5) {
            guessedWord += c;
            currentRowBoxes[currentBox].innerHTML = c;
            currentBox++;
        }
    }
}

// Function to change CSS based on guessed word
function changecss(row, guessedWord) {
    let currentRowBoxes = document.querySelectorAll(`.column:nth-child(${row + 1}) .box`);
    
    for (let i = 0; i < 5; i++) {
        if (ans[i] === guessedWord[i]) {
            currentRowBoxes[i].style.backgroundColor = "green";
        } else if (ans.includes(guessedWord[i])) {
            currentRowBoxes[i].style.backgroundColor = "yellow";
        } else {
            currentRowBoxes[i].style.backgroundColor = "gray";
        }
    }
}

// Add event listeners to the keys
document.querySelectorAll(".key").forEach(key => {
    key.addEventListener('click', function () {
        const keyValue = this.innerHTML;
        if (keyValue === 'ENTER' || keyValue === 'BACKSPACE') {
            handleKeyPress(keyValue);
        } else {
            handleKeyPress(keyValue.toUpperCase());
        }
    });
});
