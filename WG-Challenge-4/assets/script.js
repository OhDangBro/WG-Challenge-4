var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question:
      "Variables can be emptied by setting the value to ____.",
    choices: ["null", "0", "clear", "object"],
    answer: "null",
  },
  {
    question:
      "What is the name of a value associated with an object?",
    choices: ["method", "object2", "property", "object value"],
    answer: "property",
  },
  {
    question:
      "What caps is used when using the function keyword?",
    choices: ["any", "lowercase", "uppercase", "both lower and upper"],
    answer: "lowercase",
  },
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");

var startQuizPanel = document.querySelector("#start");
var startQuizButton = document.querySelector("#startButton");
var submitScorePanel = document.querySelector("#submitScore");
var quizContainer = document.querySelector("#quizContainer");

var questionIndex = 0;
var correctCount = 0;

// add variables to hold the time and intervaliD for the timer
var time = 20;
var intervalId;

function endQuiz() {
  clearInterval(intervalId);
  var body = document.body;
  time = 20;
}

function updateTime() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {
  // check if time is 0 and if so end game
  if (time == 0) {
    updateTime();
    return;
  }


  if (questionIndex < 5) {

    questionEl.textContent = questions[questionIndex].question;

    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";

    var choices = questions[questionIndex].choices;
    var choicesLenth = choices.length;

    for (var i = 0; i < choicesLenth; i++) {
      var questionListItem = document.createElement("li");
      questionListItem.textContent = choices[i];
      optionListEl.append(questionListItem);
    }

  } else {
    time = 20;
    submitScorePanel.style.display = "block";
    quizContainer.style.display = "none";
    questionIndex = 0;

  }



}

function nextQuestion() {
  // for (i = 0; i < 1; i++) {
  //   questionIndex++;
  // }
  questionIndex++


  // when all question are asked end quiz
  renderQuestion();
}

function checkAnswer(event) {
  // pause timer
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount++;
      alert("Correct!")
    } else {
      questionResultEl.textContent = "Incorrect";
      time = time - 2;
      timerEl.textContent = time;
      alert("Incorrect!");
    }
  }
  setTimeout(nextQuestion, 1000);
}



// renderQuestion();
optionListEl.addEventListener("click", checkAnswer);


// Loads/Hides  Panel //

function hidePanel() {
  submitScorePanel.style.display = "none";
};

function addLi() {
  var li = document.createElement("li");
  var submittedInitials = document.getElementById("textValue").value;
  var textNode = document.createTextNode(submittedInitials + " scored " + correctCount + " points");
  li.appendChild(textNode);
  document.getElementById("list").appendChild(li);

  // var latestInitial = document.getElementById("list").appendChild("submitInitials")

  // ("textValue" + "submitInitials")
}

function startOver() {
  renderQuestion();
  quizContainer.style.display = "block";
  submitScorePanel.style.display = "none"

}









// Click to start quiz //

startQuizButton.addEventListener("click", function () {
  startQuizPanel.remove()

  renderQuestion();

  intervalId = setInterval(updateTime, 1000);

});

