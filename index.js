document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById("start");
    const stopButton = document.getElementById("stop");
    const resetButton = document.getElementById("reset");
    const shortBreakButton = document.getElementById("short-break");
    const longBreakButton = document.getElementById("long-break");
    const timerDisplay = document.getElementById("timer");
    const sandClock = document.getElementById("sand-clock");
    const progressBar = document.getElementById("progress-bar");

    let timeLeft = 1500; // 25 minutes in seconds
    let intervalId;
    let totalTime = timeLeft;

    function updateTimer() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        progressBar.style.width = ((totalTime - timeLeft) / totalTime) * 100 + '%';
    }

    function startTimer(duration) {
        if (!intervalId) {
            sandClock.style.display = 'block';
            totalTime = duration;
            timeLeft = duration;
            updateTimer();
            intervalId = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimer();
                } else {
                    clearInterval(intervalId);
                    intervalId = null;
                    sandClock.style.display = 'none';
                    alert("Time's up!");
                }
            }, 1000);
        }
    }

    function stopTimer() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            sandClock.style.display = 'none';
        }
    }

    function resetTimer() {
        stopTimer();
        timeLeft = 1500;
        updateTimer();
    }

    function startWorkSession() {
        startTimer(1500); // 25 minutes
    }

    function startShortBreak() {
        startTimer(300); // 5 minutes
    }

    function startLongBreak() {
        startTimer(900); // 15 minutes
    }

    startButton.addEventListener("click", startWorkSession);
    stopButton.addEventListener("click", stopTimer);
    resetButton.addEventListener("click", resetTimer);
    shortBreakButton.addEventListener("click", startShortBreak);
    longBreakButton.addEventListener("click", startLongBreak);

    updateTimer(); // Initialize timer display
});
