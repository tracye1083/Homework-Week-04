// Time set in seconds
let currentTime = 10
let timer = null

let tick = function () {
    console.log('ticking')
    currentTime--
    if (currentTime <= 0) {
        if (timer) {
             // quiz finished show high score thingie and stop counter
            clearInterval(timer);
        }
    }
    let timerBox = document.getElementById('test');
    if (timerBox) {
        timerBox.textContent = currentTime;

    }
}



function beginClick(event) {
    console.log('clicked')
    timer = setInterval(tick, 1000);
}

document.getElementById('start-btn').onclick=beginClick
