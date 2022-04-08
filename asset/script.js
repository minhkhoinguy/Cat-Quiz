
var introPage = document.querySelector("#intro")
var quizPage = document.querySelector("#quiz-content")
var scorePage = document.querySelector("#score-page")

var playBtn = document.querySelector("#play")
var answerBtns = document.querySelector(".answers")
var submitBtn = document.querySelector("#submitBtn")
var restartBtn = document.querySelector("#restart")
var clearBtn = document.querySelector("#clear")

var scoresText = document.querySelector("#scoresText")
var scoreForm = document.querySelector("#scoreForm")
var scoreboard = document.querySelector("#scoreboard")
var highscoresList = document.querySelector("#highscores")
var showScore = document.querySelector("#final-score")
var inInput = document.querySelector("#name")

var questionText = document.querySelector("#questions")
var answerABtn = document.querySelector("#answerA")
var answerBBtn = document.querySelector("#answerB")
var answerCBtn = document.querySelector("#answerC")
var answerDBtn = document.querySelector("#answerD")
var answerComp = false;
var indexQ = 0
var finalScore = 0;

var timer = document.querySelector("#timer")
var timeLeft = 30;
var timeInterval;
var highscoreList = []


var quizQuestions = [
    {question: "Which breed of house cat is the largest?",
    answers: {
        A: "Ragamuffin",
        B: "Maine coon",
        C: "Savannah",
        D: "Bengal",
    },
    correctAnswer: "Savannah",
    },
    {question: "How many teeth does an adult cat have?",
    answers: {
        A: "26",
        B: "30",
        C: "28",
        D: "34"
    },
    correctAnswer: "30",
    },
    {question: "What kind of cat has characteristic folded ears?",
    answers: {
        A: "British",
        B: "Persian",
        C: "Ragdoll",
        D: "Scottish",
    },
    correctAnswer: "Scottish",
    },
    {question: "How high can a cat jump?",
    answers: {
        A:"3 times their height",
        B:"5 times their height",
        C:"7 times their height",
        D:"9 times their height",
    },
    correctAnswer: "5 times their height",
    }
]

init();

function setTimer() {
    timeLeft = 30;
    timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft --;}
        timer.textContent = timeLeft + " seconds";

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            hideElement(quizPage);
            showElement(scoreForm);
        }
    },1000);
}

function startQuiz(){
    setTimer();
    hideElement(introPage);
    showElement(quizPage);
    showQuestion(indexQ);
}


function showQuestion(indexQ){
    questionText.textContent = quizQuestions[indexQ].question;
    answerABtn.textContent = quizQuestions[indexQ].answers.A;
    answerBBtn.textContent = quizQuestions[indexQ].answers.B;
    answerCBtn.textContent = quizQuestions[indexQ].answers.C;
    answerDBtn.textContent = quizQuestions[indexQ].answers.D;
}

function answerCheck(clickedElement){
    if (clickedElement.textContent === quizQuestions[indexQ].correctAnswer && indexQ<(quizQuestions.length-1)) {
        answerComp = true;
        indexQ++;
        showQuestion(indexQ); 
    } else if (clickedElement.textContent === quizQuestions[indexQ].correctAnswer && indexQ===(quizQuestions.length-1)) {
        finalScore = timeLeft;
        indexQ=0;
        timeLeft=0;
        endQuiz();} 
}


function endQuiz() {
    hideAllElements();
    showElement(scoreForm);
    showScore.textContent = finalScore; 
}

function saveInfo() {
    highscoreList.push([inInput.value,finalScore]);
    if (highscoreList !== null) {
        for (let i = 0; i < highscoreList.length; i++) {
            var scoresLi = document.createElement("li")
            highscoresList.appendChild(scoresLi)
            scoresLi.textContent = highscoreList[i].join("   -   ");
        }
    } else scoresText.textContent = "Reload the page if your name doesn't appear yet";

    localStorage.setItem('highscore-list', JSON.stringify(highscoreList));

    inInput.textContent = '';
}

function init() {
    var lastScore = JSON.parse(localStorage.getItem('highscore-list'));
    if (lastScore !== null) {
        for (let i = 0; i < lastScore.length; i++) {
            var scoresLi = document.createElement("li")
            highscoresList.appendChild(scoresLi)
            scoresLi.textContent = lastScore[i].join("   -   ");
        }
    } else scoresText.textContent = "Reload the page if your name doesn't appear yet."
}


function showElement (element) {
    element.setAttribute("style", "display:block");
}

function hideElement (element) {
    element.setAttribute("style","display:none")
}

function hideAllElements(){
        introPage.setAttribute("style","display:none");
        quizPage.setAttribute("style","display:none");
        scoreboard.setAttribute("style","display:none");
        scoreForm.setAttribute("style","display:none");
}



playBtn.addEventListener("click",startQuiz)

quizPage.addEventListener("click", function(event){
    var clickedElement = event.path[0];
    answerCheck(clickedElement);
})

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    saveInfo();
    hideAllElements();
    showElement(scoreboard);
})

scorePage.addEventListener("click", function(){
    hideAllElements();
    showElement(scoreboard)})

restartBtn.addEventListener("click",function(){
    hideAllElements();
    showElement(introPage);
})

clearBtn.addEventListener("click",function(){
    localStorage.removeItem('highscore-list')
    scoresText.textContent = "Reload the page if your name doesn't appear yet"
})