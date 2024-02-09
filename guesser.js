let userNum;
let n = 10; 
let attempt = 3;
let score = 0;
let highScore = 0;
let randomNumber = Math.floor(Math.random() * n) + 1;

function generateRandomNumber() {
    userNum = parseInt(document.getElementById("input-box").value);
    if (isNaN(userNum)) {
        alert("Please enter a number to start");
        return;
    }
    if (attempt > 0) {
        if (randomNumber < userNum) {
            outputText.textContent = "Enter a number lower than " + userNum;
            attempt--;
        } else if (randomNumber > userNum) {
            outputText.textContent = "Enter a number higher than " + userNum;
            attempt--;
        } else if (randomNumber === userNum) {
            score += (3 - attempt) * n; // Calculate score based on total attempts
            attempt = 3; // Reset attempts to 3
            outputText.textContent = "Congratulations, you have successfully guessed the number";
            n = n * 2;
            randomNumber = Math.floor(Math.random() * n) + 1;
            document.getElementById("nValue").textContent = n;
            document.getElementById("score").textContent = score;
            highScore == score;
                document.getElementById("highScore").textContent = highScore;
            return;
        }
    } else {
        outputText.textContent = "You have run out of attempts. The number was " + randomNumber;
    }
}
function reset() {
    attempt = 3;
    score = 0;
    n = 10;
    randomNumber = Math.floor(Math.random() * n) + 1;
    document.getElementById("nValue").textContent = n;
    outputText.textContent = "Guess a random number between 1 and " + n;
    document.getElementById("score").textContent = 0;
}
generateRandomNumber();
