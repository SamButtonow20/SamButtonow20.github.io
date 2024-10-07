let playerChoice = null;
let computerChoice = null;
let wins = 0, losses = 0, ties = 0;

const choices = ["rock", "paper", "scissors"];
const computerDisplay = document.getElementById("computer-choice");
const resultDisplay = document.getElementById("result");
const playerImages = document.querySelectorAll(".choice");

function highlightPlayerChoice(choice) {
    playerImages.forEach(img => img.classList.remove("selected"));
    document.getElementById(choice).classList.add("selected");
}

function computerThinking() {
    let index = 0;
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            computerDisplay.src = `images/${choices[index]}.png`;
            index = (index + 1) % 3;
        }, 500);

        setTimeout(() => {
            clearInterval(interval);
            const randomChoice = choices[Math.floor(Math.random() * 3)];
            computerChoice = randomChoice;
            computerDisplay.src = `images/${computerChoice}.png`;
            resolve();
        }, 3000);
    });
}

function determineWinner() {
    if (playerChoice === computerChoice) {
        ties++;
        resultDisplay.textContent = "It's a Tie!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        wins++;
        resultDisplay.textContent = "You Win!";
    } else {
        losses++;
        resultDisplay.textContent = "You Lose!";
    }

}
function determineWinner() {
    if (playerChoice === computerChoice) {
        ties++;
        resultDisplay.textContent = "It's a Tie!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        wins++;
        resultDisplay.textContent = "You Win!";
    } else {
        losses++;
        resultDisplay.textContent = "You Lose!";
    }

    document.getElementById("wins").textContent = wins;
    document.getElementById("losses").textContent = losses;
    document.getElementById("ties").textContent = ties;
}

playerImages.forEach(img => {
    img.addEventListener("click", async () => {
        playerChoice = img.id;
        highlightPlayerChoice(playerChoice);
        await computerThinking();
        determineWinner();
    });
});


document.getElementById("reset").addEventListener("click", () => {
    wins = losses = ties = 0;
    document.getElementById("wins").textContent = 0;
    document.getElementById("losses").textContent = 0;
    document.getElementById("ties").textContent = 0;
    resultDisplay.textContent = "Make a move to start!";
    computerDisplay.src = "images/question-mark.png";
});


