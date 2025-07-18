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
const roundEl = document.getElementById("round");

let currentQuestion = {};
let score = 0;
let timeLeft = 60;
let timer;
let gameActive = false;
let round = 1;
let roundIndex = 0;

const correctQuotes = [
  "Frankly, my dear, you nailed it.",
  "You're gonna need a bigger brain.",
  "I feel the need... the need for trivia!",
  "You're the king of the quiz world!",
  "May the score be with you."
];

const incorrectQuotes = [
  "You can't handle the truth!",
  "Here's looking at you, wrong answer.",
  "I'm gonna make you regret that guess.",
  "Houston, we have a problem.",
  "Life is like a box of wrong answers."
];

const easyQuestions = [
  {
    q: "What's heavier: 1kg of steel or 1kg of feathers?",
    a: ["Steel", "Feathers", "Same", "Can't tell"],
    c: 2
  },
  {
    q: "What color is a mirror?",
    a: ["Silver", "Clear", "White", "It depends"],
    c: 3
  },
  {
    q: "Solve: 10 + (2 × 3)",
    a: ["36", "16", "20", "26"],
    c: 1
  },
  {
    q: "Which is not a fruit?",
    a: ["Tomato", "Apple", "Carrot", "Banana"],
    c: 2
  },
  {
    q: "Which comes first: Chicken or egg?",
    a: ["Egg", "Chicken", "Neither", "Omelette"],
    c: 0
  }
];

const mediumQuestions = [
  {
    q: "What’s the capital of Canada?",
    a: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
    c: 1
  },
  {
    q: "In what year did World War II end?",
    a: ["1944", "1945", "1939", "1946"],
    c: 1
  },
  {
    q: "Which planet has the most moons?",
    a: ["Jupiter", "Saturn", "Mars", "Neptune"],
    c: 1
  },
  {
    q: "What’s the longest bone in the human body?",
    a: ["Femur", "Humerus", "Tibia", "Skull"],
    c: 0
  },
  {
    q: "What is the chemical symbol for gold?",
    a: ["Gd", "Go", "Au", "Ag"],
    c: 2
  }
];

const hardQuestions = [
  {
    q: "Who directed the film 'Parasite'?",
    a: ["Park Chan-wook", "Bong Joon-ho", "Ang Lee", "Hirokazu Kore-eda"],
    c: 1
  },
  {
    q: "What is Schrödinger’s cat thought experiment about?",
    a: ["Teleportation", "Parallel universes", "Quantum superposition", "Time travel"],
    c: 2
  },
  {
    q: "Which mathematician invented the integral sign ∫?",
    a: ["Leibniz", "Newton", "Euler", "Gauss"],
    c: 0
  },
  {
    q: "What’s the 7th digit of Pi after the decimal?",
    a: ["9", "3", "5", "2"],
    c: 0
  },
  {
    q: "What is the hardest natural material on Earth?",
    a: ["Graphite", "Quartz", "Diamond", "Obsidian"],
    c: 2
  }
];

const rounds = [
  { name: "Round 1: Easy", questions: easyQuestions, points: 1 },
  { name: "Round 2: Medium", questions: mediumQuestions, points: 2 },
  { name: "Round 3: Hard", questions: hardQuestions, points: 3 }
];

let usedQuestions = [];

function startGame() {
  score = 0;
  timeLeft = 60;
  roundIndex = 0;
  gameActive = true;
  usedQuestions = [];
  startBtn.classList.add("hidden");
  gameOverEl.classList.add("hidden");
  answersEl.classList.remove("hidden");
  updateScore();
  updateRoundDisplay();
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

function updateRoundDisplay() {
  roundEl.textContent = rounds[roundIndex].name;
}

function nextQuestion() {
  const currentRound = rounds[roundIndex];

  if (usedQuestions.length === currentRound.questions.length) {
    // Go to next round if possible
    roundIndex++;
    if (roundIndex >= rounds.length) {
      endGame();
      return;
    }
    usedQuestions = [];
    updateRoundDisplay();
  }

  let q;
  do {
    q = rounds[roundIndex].questions[Math.floor(Math.random() * rounds[roundIndex].questions.length)];
  } while (usedQuestions.includes(q));
  usedQuestions.push(q);

  currentQuestion = q;
  questionEl.textContent = q.q;
  answerBtns.forEach((btn, index) => {
    btn.textContent = q.a[index];
    btn.onclick = () => checkAnswer(index);
  });
}

function getRandomQuote(type) {
  const quotes = type === "correct" ? correctQuotes : incorrectQuotes;
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function checkAnswer(index) {
  if (!gameActive) return;

  const points = rounds[roundIndex].points;
  if (index === currentQuestion.c) {
    feedbackEl.textContent = getRandomQuote("correct");
    score += points;
    updateScore();
  } else {
    feedbackEl.textContent = getRandomQuote("incorrect");
  }

  setTimeout(() => {
    feedbackEl.textContent = "";
    nextQuestion();
  }, 1500);
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
