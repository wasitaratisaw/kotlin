const startBtn = document.getElementById("start-btn");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const answerBtns = document.querySelectorAll(".answer");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const feedbackEl = document.getElementById("feedback");
const gameOverEl = document.getElementById("game-over");
const finalScoreEl = document.getElementById("final-score");
const leaderboardList = document.getElementById("leaderboard-list");
const replayBtn = document.getElementById("replay-btn");

let currentQuestion = {};
let score = 0;
let timeLeft = 60;
let timer;
let gameActive = false;
let questionsAnswered = 0;
let availableQuestions = [];

const maxLeaderboardEntries = 5;

const questions = [
  {
    q: "What's heavier: 1kg of steel or 1kg of feathers?",
    a: ["Steel", "Feathers", "Same", "Can't tell"],
    c: 2,
    r: "Physics just left the chat."
  },
  {
    q: "What color is a mirror?",
    a: ["Silver", "Clear", "White", "It depends"],
    c: 3,
    r: "You really said 'clear' didn’t you?"
  },
  {
    q: "Solve: 10 + (2 × 3)",
    a: ["36", "16", "20", "26"],
    c: 1,
    r: "PEMDAS died for this."
  },
  {
    q: "Which is not a fruit?",
    a: ["Tomato", "Apple", "Carrot", "Banana"],
    c: 2,
    r: "Google is crying."
  },
  {
    q: "Which comes first: Chicken or egg?",
    a: ["Egg", "Chicken", "Neither", "Omelette"],
    c: 0,
    r: "Existential crisis incoming."
  },
  {
    q: "If a plane crashes on the border of two countries, where do you bury the survivors?",
    a: ["Country A", "Country B", "Nowhere", "Depends on the plane"],
    c: 2,
    r: "Survivors aren’t buried!"
  },
  {
    q: "How many months have 28 days?",
    a: ["1", "12", "6", "Depends on the year"],
    c: 1,
    r: "All months have at least 28 days."
  },
  {
    q: "What can travel around the world while staying in the same spot?",
    a: ["A plane", "A stamp", "A shadow", "Time"],
    c: 1,
    r: "It’s a stamp, silly!"
  },
  {
    q: "Which word is spelled incorrectly in every dictionary?",
    a: ["Incorrectly", "Wrong", "Misspelled", "None"],
    c: 0,
    r: "Trick question! It’s the word 'Incorrectly.'"
  },
  {
    q: "If you have me, you want to share me. If you share me, you don't have me. What am I?",
    a: ["Secret", "Love", "Money", "Friendship"],
    c: 0,
    r: "Secrets don’t like the spotlight."
  },
  {
    q: "Before Mt. Everest was discovered, what was the highest mountain?",
    a: ["K2", "Everest", "Kangchenjunga", "Lhotse"],
    c: 1,
    r: "Everest was still the highest, even undiscovered."
  },
  {
    q: "What comes once in a minute, twice in a moment, but never in a thousand years?",
    a: ["The letter M", "Time", "The moon", "The sun"],
    c: 0,
    r: "It’s the letter M. Classic!"
  },
  {
    q: "If you’re running a race and pass the person in 2nd place, what place are you in?",
    a: ["1st", "2nd", "3rd", "Depends"],
    c: 1,
    r: "Passing 2nd means you’re now 2nd."
  },
  {
    q: "How many letters are in the English alphabet?",
    a: ["24", "25", "26", "27"],
    c: 2,
    r: "There are 26 letters."
  },
  {
    q: "Which weighs more, a pound of gold or a pound of feathers?",
    a: ["Gold", "Feathers", "Same", "Neither"],
    c: 2,
    r: "They weigh the same — a pound is a pound!"
  },
  // New additions in the same style & tone:
  {
    q: "If a rooster lays an egg on a rooftop, which side will it roll down?",
    a: ["Left", "Right", "It won’t roll", "Roosters don’t lay eggs"],
    c: 3,
    r: "Roosters don’t lay eggs!"
  },
  {
    q: "Can you name three consecutive days without using the words Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, or Sunday?",
    a: ["Yesterday, Today, Tomorrow", "Friday, Saturday, Sunday", "First, Second, Third", "No"],
    c: 0,
    r: "You got it!"
  },
  {
    q: "What has many teeth but can’t bite?",
    a: ["Comb", "Zipper", "Saw", "Shark"],
    c: 0,
    r: "A comb, of course!"
  },
  {
    q: "If two’s company and three’s a crowd, what are four and five?",
    a: ["Nine", "A party", "Too many", "Numbers"],
    c: 0,
    r: "Four plus five is nine!"
  },
  {
    q: "What has hands but can’t clap?",
    a: ["Clock", "Robot", "Ghost", "Statue"],
    c: 0,
    r: "A clock!"
  },
  {
    q: "How far can a dog run into the woods?",
    a: ["Halfway", "All the way", "Forever", "10 miles"],
    c: 0,
    r: "Halfway, then it’s running out!"
  },
  {
    q: "What is always coming but never arrives?",
    a: ["Tomorrow", "Next week", "The bus", "Never"],
    c: 0,
    r: "Tomorrow!"
  },
  {
    q: "If you throw a red stone into the blue sea what will it become?",
    a: ["Wet", "Red", "Blue", "Stone"],
    c: 0,
    r: "Wet, obviously."
  },
  {
    q: "What has one eye but can’t see?",
    a: ["Needle", "Cyclops", "Storm", "Hurricane"],
    c: 0,
    r: "A needle!"
  },
  {
    q: "Which word becomes shorter when you add two letters to it?",
    a: ["Short", "Smaller", "Little", "Tiny"],
    c: 0,
    r: "Short!"
  }
];

// Shuffle function
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function startGame() {
  score = 0;
  timeLeft = 60;
  questionsAnswered = 0;
  gameActive = true;
  startBtn.classList.add("hidden");
  gameOverEl.classList.add("hidden");
  answersEl.classList.remove("hidden");
  updateScore();
  updateProgress();

  availableQuestions = shuffle([...questions]); // fresh shuffled copy

  nextQuestion();
  timer = setInterval(updateTimer, 1000);
  clearLeaderboardDisplay();
  feedbackEl.textContent = "";
}

function updateTimer() {
  timeLeft--;
  timerEl.textContent = timeLeft;
  if (timeLeft <= 0) endGame();
}

function updateScore() {
  scoreEl.textContent = `Score: ${score}`;
}

function updateProgress() {
  const maxQuestions = 20;
  let percent = Math.min((questionsAnswered / maxQuestions) * 100, 100);
  document.getElementById("progress-bar").style.width = percent + "%";
}

function nextQuestion() {
  if (!gameActive) return;

  if (availableQuestions.length === 0) {
    endGame();
    return;
  }

  questionsAnswered++;
  updateProgress();

  questionEl.classList.add("fade-out");

  setTimeout(() => {
    currentQuestion = availableQuestions.pop();
    questionEl.textContent = currentQuestion.q;
    answerBtns.forEach((btn, index) => {
      btn.textContent = currentQuestion.a[index];
      btn.onclick = () => checkAnswer(index);
    });
    questionEl.classList.remove("fade-out");
  }, 400);
}

function checkAnswer(index) {
  if (!gameActive) return;
  if (index === currentQuestion.c) {
    feedbackEl.textContent = "Correct! 🧠";
    score++;
    updateScore();
  } else {
    feedbackEl.textContent = currentQuestion.r;
  }
  setTimeout(() => {
    feedbackEl.textContent = "";
    nextQuestion();
  }, 1000);
}

function endGame() {
  gameActive = false;
  clearInterval(timer);
  questionEl.textContent = "";
  answersEl.classList.add("hidden");
  gameOverEl.classList.remove("hidden");
  finalScoreEl.textContent = `You scored ${score} point${score === 1 ? "" : "s"}.`;
  startBtn.classList.remove("hidden");

  askNameAndSaveScore();
  displayLeaderboard();
}

function askNameAndSaveScore() {
  let name = prompt("Game over! Enter your name for the leaderboard:", "Player");
  if (!name || name.trim() === "") name = "Player";

  const leaderboard = getLeaderboard();
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  if (leaderboard.length > maxLeaderboardEntries) {
    leaderboard.length = maxLeaderboardEntries;
  }
  localStorage.setItem("joesBarrelLeaderboard", JSON.stringify(leaderboard));
}

function getLeaderboard() {
  const saved = localStorage.getItem("joesBarrelLeaderboard");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
}

function displayLeaderboard() {
  const leaderboard = getLeaderboard();
  leaderboardList.innerHTML = "";
  if (leaderboard.length === 0) {
    leaderboardList.innerHTML = "<li>No scores yet. Be the first!</li>";
    return;
  }
  leaderboard.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name}: ${entry.score}`;
    leaderboardList.appendChild(li);
  });
}

function clearLeaderboardDisplay() {
  leaderboardList.innerHTML = "";
}

startBtn.onclick = startGame;
replayBtn.onclick = startGame;

window.onload = displayLeaderboard;
