const startBtn = document.getElementById("start-btn");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const answerBtns = document.querySelectorAll(".answer");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const feedbackEl = document.getElementById("feedback");
const gameOverEl = document.getElementById("game-over");
const finalScoreEl = document.getElementById("final-score");
const replayBtn = document.getElementById("replay-btn");

let currentQuestion = {};
let score = 0;
let timeLeft = 60;
let timer;
let gameActive = false;
let questionsAnswered = 0;

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
  }
];

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
  nextQuestion();
  timer = setInterval(updateTimer, 1000);
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
  const maxQuestions = 20; // max bar fill for 20 questions answered
  let percent = Math.min((questionsAnswered / maxQuestions) * 100, 100);
  document.getElementById("progress-bar").style.width = percent + "%";
}

function nextQuestion() {
  if (!gameActive) return;
  questionsAnswered++;
  updateProgress();
  const q = questions[Math.floor(Math.random() * questions.length)];
  currentQuestion = q;
  questionEl.textContent = q.q;
  answerBtns.forEach((btn, index) => {
    btn.textContent = q.a[index];
    btn.onclick = () => checkAnswer(index);
  });
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
}

startBtn.onclick = startGame;
replayBtn.onclick = startGame;
