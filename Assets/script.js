// Time set in seconds
let currentTime = 10
let timer = null

// questions
let questions = [
    {
        questionText: 'How many fluffy bunnies are there?', 
        answers: [
            '1 Bunny', '2 Bunnies', '3 Bunnies'
        ], 
        correctAnswer: 1
    },
    {
        questionText: 'How many soft duckies are there?', 
        answers: [
            '1 Duckie', '2 Duckies', '3 Duckies'
        ], 
        correctAnswer: 0
    },
    {
        questionText: 'How many cookies should I eat?', 
        answers: [
            '1 cookie', '2 cookies', 'Never enough cookies'
        ], 
        correctAnswer: 2
    }
]



let tick = function () {
    console.log('ticking')
    currentTime--
    if (currentTime <= 0) {
        if (timer) {
             // quiz finished show high score thingie and stop counter
            clearInterval(timer);
        }
    }
    let timerBox = document.getElementById('timer-display');
    if (timerBox) {
        timerBox.textContent = currentTime;

    }
}



function startGame(event) {
    console.log('clicked')
    let question = questions[0];
    document.getElementById('questions').textContent = question.questionText;
    document.getElementById('answer1').textContent = question.answers[0];
    document.getElementById('answer2').textContent = question.answers[1];
    document.getElementById('answer3').textContent = question.answers[2];
    console.log('bunnies')
    timer = setInterval(tick, 1000);
}

function answerClick(event) {
    console.log('i clicked ' + event.target.id)
}


document.getElementById('start-btn').addEventListener("click", startGame);
let answerButtons = document.querySelectorAll('.answer-button');
for (let i=0; i<answerButtons.length; i++) {
    answerButtons[i].addEventListener("click", answerClick);
}