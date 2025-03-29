document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded, waiting for user interaction...");

  // Quiz Data
  const questions = [
    {
      question: "What is the brain of the computer?",
      options: ["RAM", "Motherboard", "CPU", "Hard Drive"],
      answer: "CPU",
    },
    {
      question: "Which component stores long-term data?",
      options: ["RAM", "Hard Drive", "GPU", "Power Supply"],
      answer: "Hard Drive",
    },
    {
      question: "Which part connects all components together?",
      options: ["RAM", "Motherboard", "Power Supply", "GPU"],
      answer: "Motherboard",
    },
    {
      question: "Which memory is volatile?",
      options: ["SSD", "Hard Drive", "RAM", "USB Flash Drive"],
      answer: "RAM",
    },
    {
      question: "What component is responsible for graphics processing?",
      options: ["CPU", "Power Supply", "GPU", "Motherboard"],
      answer: "GPU",
    },
  ];

  // DOM Elements
  const startScreen = document.getElementById("start-screen");
  const startButton = document.getElementById("start-quiz");
  const quizContainer = document.getElementById("quiz-container");
  const questionTitle = document.getElementById("question-title");
  const optionsContainer = document.getElementById("options");
  const submitButton = document.getElementById("submit-answer");
  const timerElement = document.getElementById("timer");
  const scoreElement = document.getElementById("score");

  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 120; // 2 minutes

  // Ensure elements exist before adding event listeners
  if (startButton) {
    startButton.addEventListener("click", function () {
      console.log("Start Quiz clicked!");
      startScreen.classList.add("d-none"); // Hide start screen
      quizContainer.classList.remove("d-none"); // Show quiz
      startTimer();
      loadQuestion();
    });
  }

  // Load Question
  function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
      endQuiz();
      return;
    }

    let currentQuestion = questions[currentQuestionIndex];
    questionTitle.innerText = `Question ${currentQuestionIndex + 1}: ${
      currentQuestion.question
    }`;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option) => {
      let optionElement = document.createElement("div");
      optionElement.classList.add("form-check", "option");

      optionElement.innerHTML = `
                <input class="form-check-input" type="radio" name="quiz-option" value="${option}" id="${option}">
                <label class="form-check-label" for="${option}">${option}</label>
            `;

      optionsContainer.appendChild(optionElement);
    });
  }

  // Timer
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timerElement.innerText = `Timer: ${formatTime(timeLeft)}`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        endQuiz();
      }
    }, 1000);
  }

  // Format Time
  function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  }

  // Submit Answer
  if (submitButton) {
    submitButton.addEventListener("click", function () {
      let selectedOption = document.querySelector(
        'input[name="quiz-option"]:checked'
      );

      if (selectedOption) {
        let userAnswer = selectedOption.value;
        if (userAnswer === questions[currentQuestionIndex].answer) {
          score++;
        }
      } else {
        alert("Please select an answer.");
        return;
      }

      currentQuestionIndex++;
      scoreElement.innerText = `Score: ${score}`;
      loadQuestion();
    });
  }

  // End Quiz
  function endQuiz() {
    clearInterval(timer);
    quizContainer.innerHTML = `
            <h2>Quiz Over!</h2>
            <p>Your Score: ${score} / ${questions.length}</p>
            <button onclick="location.reload()" class="btn btn-primary mt-3">Restart Quiz</button>
        `;
    localStorage.setItem("quizScore", score);
  }
});
