
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
    r: "You really said 'clear’ didn’t you?"
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
  }
];

function startGame() {
  score = 0;
  timeLeft = 60;
  gameActive = true;
  startBtn.classList.add("hidden");
  gameOverEl.classList.add("hidden");
  answersEl.classList.remove("hidden");
  updateScore();
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

function nextQuestion() {
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
