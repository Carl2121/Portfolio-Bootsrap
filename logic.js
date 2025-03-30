document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded, waiting for user interaction...");

  // Quiz Data
  const questions = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyperlink and Text Markup Language",
        "Home Tool Markup Language",
      ],
      answer: "Hyper Text Markup Language",
    },
    {
      question: "What is the purpose of CSS?",
      options: [
        "To structure the webpage",
        "To add styles to HTML",
        "To program backend logic",
        "To create database connections",
      ],
      answer: "To add styles to HTML",
    },
    {
      question: "Which HTML tag is used for the largest heading?",
      options: ["h1", "h6", "head", "header"],
      answer: "h1",
    },
    {
      question: "Which CSS property is used to change the text color?",
      options: ["color", "font-style", "text-color", "background-color"],
      answer: "color",
    },
    {
      question: "Which HTML attribute is used to define inline styles?",
      options: ["class", "id", "style", "font"],
      answer: "style",
    },
    {
      question: "What does JavaScript allow you to do?",
      options: [
        "Style HTML",
        "Store data in a database",
        "Add interactivity to webpages",
        "Create server side applications only",
      ],
      answer: "Add interactivity to webpages",
    },
    {
      question: "Which HTML element is used to insert a line break?",
      options: ["br", "lb", "break", "hr"],
      answer: "br",
    },
    {
      question: "Which CSS property controls the spacing between lines of text?",
      options: ["letter-spacing", "line-height", "word-spacing", "text-indent"],
      answer: "line-height",
    },
    {
      question: "What is the correct JavaScript syntax to write 'Hello World' in an alert box?",
      options: [
        "msgBox('Hello World');",
        "alertBox('Hello World');",
        "msg('Hello World');",
        "alert('Hello World');",
      ],
      answer: "alert('Hello World');",
    },
    {
      question: "Which symbol is used for single-line comments in JavaScript?",
      options: [
        "/* comment */",
        "// comment",
        "<!-- comment -->",
        "# comment",
      ],
      answer: "// comment",
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
    questionTitle.innerText = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question
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
