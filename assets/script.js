var startButton = document.getElementById("startButton");
startButton.addEventListener("click", beginQuiz);
var answerButton = document.getElementsByClassName("answerChoice");
var correctAnswer = 0;
var wrongAnswer = 0;
var viewHighScoresLink = document.getElementById("viewHighScores");
viewHighScoresLink.addEventListener("click", playAgain);
    
for (var i = 0; i < answerButton.length; i++) {
  answerButton[i].addEventListener("click", checkAnswer);
}

document.getElementById("answerOptions");
answerOptions.style.display = "none";

var timeEl = document.getElementById("countdown");
var secondsLeft = 60;
var currentQuestionIndex = 0;

var questions = [
  {
    question: "What do you call an element nested within another element?",
    options: ["Parent", "Extra", "Auxiliary", "Child"],
    correctIndex: 3,
    correctAnswer: "Child",
  },

  {
    question: "What does CSS stand for?",
    options: [
      "Cows slay seals",
      "Computers showing syle ",
      "Cascading style sheet",
      "Corrpution surf style",
    ],
    correctIndex: 2,
    correctAnswer: "Cascading style sheet",
  },

  {
    question: "Which of the following is not a coding laguage?",
    options: [
      "JavaScript",
      "HTML",
      "Biology",
      "CSS",
    ],
    correctIndex: 2,
    correctAnswer: "Biology",
  },
];

function showAnswerButtons() {
  var answerOptions = document.getElementById("answerOptions");
  answerOptions.style.display = "block";
}

function setTime() {
  var timeInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft <= 0) {
      clearInterval(timeInterval);
      timeEl.textContent = "0";
      displayScore();
    }
  }, 1000);
}

function displayQuestion() {
  var questionText = document.getElementById("questionText");
  var answerOptions = document.getElementById("answerOptions");
  
  var currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  
  var answerChoice = answerOptions.getElementsByClassName("answerChoice");
  for (var i = 0; i < currentQuestion.options.length; i++) {
    answerChoice[i].textContent = currentQuestion.options[i];
  }
}

function beginQuiz() {
  setTime();
  displayQuestion();
  showAnswerButtons();
}

function checkAnswer(event) {
  var selectedAnswer = event.target.textContent;
  var currentQuestion = questions[currentQuestionIndex];

  if (
    selectedAnswer === currentQuestion.options[currentQuestion.correctIndex]
  ) {
    correctAnswer++;
  } else {
    wrongAnswer++;
    secondsLeft -= 5;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    displayScore();
  }
}

function displayScore() {
  var scoreEl = document.getElementById("score");
  scoreEl.textContent =
    "Answered correctly: " +
    correctAnswer +
    " Answered incorrectly: " +
    wrongAnswer;

  var nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("placeholder", "Enter your initials");

  var submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", playAgain);
  
  scoreEl.appendChild(nameInput);
  scoreEl.appendChild(submitButton);
  nameInput.style.display = "flex";
  nameInput.style.display = "column";

  submitButton.addEventListener("click", function () {
    var initials = nameInput.value.trim();
    if (initials) {
      localStorage.setItem("userInitials", initials);
    }
  });
}


function playAgain() {
  currentQuestionIndex = 0;
  correctAnswer = 0; 
  wrongAnswer = 0; 
  secondsLeft = 60;

  var scoreEl = document.getElementById("score");
  scoreEl.textContent = "Score submitted";

  var nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text"); 
  nameInput.setAttribute("placeholder", "Enter your initials"); 

  var savedInitials = localStorage.getItem("userInitials");
  if (savedInitials) {
    var initialsDisplay = document.createElement("p");
    initialsDisplay.textContent = "Your initials: " + savedInitials;
    scoreEl.appendChild(initialsDisplay);
  }

  var resetButton = document.createElement("button");
  resetButton.textContent = "Clear scores";
  resetButton.addEventListener("click", resetQuiz);
  resetButton.style.display = "flex";
  resetButton.style.display = "column";

  var backButton = document.createElement("button");
  backButton.textContent = "Play again";
  backButton.addEventListener("click", startOver);
  backButton.style.display = "flex";
  backButton.style.display = "column";

  scoreEl.appendChild(resetButton);
  resetButton.style.display = "block";
  scoreEl.appendChild(backButton);
  
  function resetQuiz() {
    localStorage.removeItem("userInitials");
    window.location.reload(); 
  }
  
  function startOver() {
    window.location.reload(); 
  }
}