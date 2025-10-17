const questions = [
  {
    question: "What does IBM stand for?",
    answers: [
      { text: "International Business Machines", correct: true },
      { text: "Internet Based Management", correct: false },
      { text: "Integrated Business Model", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "What language is primarily used for front-end development?",
    answers: [
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
      { text: "C#", correct: false },
      { text: "Java", correct: false },
    ],
  },
  {
    question: "Which IBM product is a cloud platform?",
    answers: [
      { text: "IBM Watson", correct: false },
      { text: "IBM Cloud", correct: true },
      { text: "IBM PC", correct: false },
      { text: "IBM Blockchain", correct: false },
    ],
  },
];

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const totalQuestionsElement = document.getElementById("total-questions");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultElement.classList.add("hide");
  questionContainer.classList.remove("hide");
  nextButton.style.display = "none";
  totalQuestionsElement.textContent = questions.length;
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  if (correct) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("wrong");
  }

  Array.from(answerButtonsElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionContainer.classList.add("hide");
  resultElement.classList.remove("hide");
  scoreElement.textContent = score;
}

restartButton.addEventListener("click", startQuiz);

startQuiz();
