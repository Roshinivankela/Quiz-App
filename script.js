const questions = [
  {
    question: "What does HTML stand for?",
    options: ["HyperText Machine Language", "HighText Markup Language", "HyperText Markup Language", "None"],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which CSS property is used to change text color?",
    options: ["font-color", "text-color", "color", "style"],
    answer: "color"
  },
  {
    question: "What does JS stand for?",
    options: ["JavaSyntax", "JavaStructure", "JavaScript", "JustScript"],
    answer: "JavaScript"
  },
  {
    question: "Which keyword declares a variable in JS?",
    options: ["var", "let", "const", "All of them"],
    answer: "All of them"
  },
  {
    question: "Which tag defines a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<nav>"],
    answer: "<a>"
  },
  {
    question: "Which method is used to add element in JS array?",
    options: ["add()", "append()", "push()", "insert()"],
    answer: "push()"
  },
  {
    question: "Which symbol is used for single-line comments in JS?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "//"
  },
  {
    question: "How do you call a function in JS?",
    options: ["call.function()", "functionName()", "run.function", "None"],
    answer: "functionName()"
  },
  {
    question: "Which HTML element is used for line break?",
    options: ["<br>", "<lb>", "<break>", "<nl>"],
    answer: "<br>"
  },
  {
    question: "Which method fetches data from APIs?",
    options: ["fetch()", "get()", "call()", "load()"],
    answer: "fetch()"
  }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");
const finalScoreEl = document.getElementById("finalScore");
const reactionEl = document.getElementById("reaction");

function loadQuestion() {
  const q = questions[currentIndex];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(btn, q.answer);
    optionsEl.appendChild(btn);
  });

  progressEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  progressBar.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
}

function checkAnswer(btn, correctAnswer) {
  const allButtons = document.querySelectorAll("#options button");
  allButtons.forEach(b => b.disabled = true);

  if (btn.textContent === correctAnswer) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    allButtons.forEach(b => {
      if (b.textContent === correctAnswer) {
        b.classList.add("correct");
      }
    });
  }

  setTimeout(() => nextQuestion(), 1000);
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizBox.style.display = "none";
  resultBox.style.display = "block";
  finalScoreEl.textContent = `You scored ${score} out of ${questions.length}`;

  // Reaction emoji
  if (score === questions.length) {
    reactionEl.textContent = "🌟 Perfect! You’re a genius!";
  } else if (score >= 7) {
    reactionEl.textContent = "🔥 Great job!";
  } else if (score >= 4) {
    reactionEl.textContent = "🙂 Good attempt!";
  } else {
    reactionEl.textContent = "😅 Keep practicing!";
  }
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  resultBox.style.display = "none";
  quizBox.style.display = "block";
  loadQuestion();
}

loadQuestion();