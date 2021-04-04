// Time set in seconds
let currentTime = 30
let timer = null
let currentQuestionIndex = null
let playerScore = 0

// questions
let questions = [{
        questionText: 'Which of these is not a way to save a variable?',
        answers: [
            'var', 'vet', 'let', 'const'
        ],
        correctAnswer: 1
    },
    {
        questionText: 'Which of the following is not considered a JavaScript operator?',
        answers: [
            'this', 'new', 'typeof', 'delete'
        ],
        correctAnswer: 0
    },
    {
        questionText: '_______ is the process of finding errors and fixing them within a program.',
        answers: [
            'Compiling', 'Executing', 'Debugging', 'Scanning'
        ],
        correctAnswer: 2
    },
    {
        questionText: 'Which is NOT a commonly used data type?',
        answers: [
            'Boolean', 'Float', 'String', 'Number'
        ],
        correctAnswer: 1
    },
    {
        questionText: 'Using a(n) ___ statement is how you test for a specific condition.',
        answers: [
            'Select', 'For', 'While', 'If'
        ],
        correctAnswer: 3
    }
]

// timer function

let tick = function() {
    currentTime--
    if (currentTime <= 0) {
        // quiz finished, show high score thingie and stop counter
        endGame();
    }
    let timerBox = document.getElementById('timer-display');
    if (timerBox) {
        timerBox.textContent = currentTime;
    }
}

// starting game function

function startGame(event) {
    console.log('clicked Start')
    document.getElementById('start-btn').style.display = "none";
    document.getElementById('instructions').style.display = "none";
    currentQuestionIndex = 0;
    renderCurrentQuestion();
    document.getElementById('questions').style.display = "block";
    document.getElementById('answers').style.display = "block";
    timer = setInterval(tick, 1000);
}

// answering questions function

function answerClick(event) {
    let answerId = event.target.id;
    console.log('i clicked ' + answerId);
    // provide feedback on answer, increase score for correct, decrease timer for incorrect
    let answerIndex = parseInt(answerId.substring(6)) - 1;
    console.log(answerIndex)
    let correctAnswerIndex = questions[currentQuestionIndex].correctAnswer;
    if (answerIndex === correctAnswerIndex) {
        document.getElementById('feedback').textContent = "Correct answer!";
        playerScore = playerScore + 1;
    } else {
        document.getElementById('feedback').textContent = "Wrong answer! -5 seconds from timer";
        currentTime = currentTime - 5;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        // we are at the end of the quiz
        endGame();
    } else {
        // show the next question
        renderCurrentQuestion();
    }
}

// populates next question
function renderCurrentQuestion() {
    let question = questions[currentQuestionIndex];
    document.getElementById('questions').textContent = question.questionText;
    document.getElementById('answer1').textContent = question.answers[0];
    document.getElementById('answer2').textContent = question.answers[1];
    document.getElementById('answer3').textContent = question.answers[2];
    document.getElementById('answer4').textContent = question.answers[3];
}

function endGame() {
    console.log('endGame called')
    if (timer) {
        clearInterval(timer);
    }
    // hides questions and answers display 
    document.getElementById('questions').style.display = "none";
    document.getElementById('answers').style.display = "none";
    document.getElementById('feedback').style.display = "none";
    // shows input to enter player initials and player scores
    document.getElementById('initials').style.display = "block";
}

function submitYourScore() {
    // get user submitted initials to submit to local storage 
    let name = document.getElementById("myText").value;
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    console.log(scores)
    scores.push({
        name: name,
        score: playerScore
    })
    console.log(scores)
    localStorage.setItem("scores", JSON.stringify(scores));
    renderHighScores(scores);
}

// printed list of player scores
function renderHighScores(scoresToRender) {
    console.log('render high scores called')

    let playerDiv = document.createElement('div')
    playerDiv.textContent = 'Player Scores'

    let listWrapper = document.createElement('ol')
    for (let i = 0; i < scoresToRender.length; i++) {
        let thisScore = scoresToRender[i]
        let listElement = document.createElement('li')
        listElement.textContent = `${thisScore.name} --- ${thisScore.score}`
        listWrapper.appendChild(listElement)
    }

    document.getElementById("scores").textContent = ""
    document.getElementById("scores").appendChild(playerDiv)
    document.getElementById("scores").appendChild(listWrapper);

    document.getElementById('timer-display').style.display = "none";
}


document.getElementById('start-btn').addEventListener("click", startGame);
let answerButtons = document.querySelectorAll('.answer-button');
for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].addEventListener("click", answerClick);
}

document.getElementById('submitScore').addEventListener("click", submitYourScore);