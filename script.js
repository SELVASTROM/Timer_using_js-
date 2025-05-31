
    let startTime, interval, running = false;
    let elapsedTime = 0;

    function updateDisplay() {
      const now = performance.now();
      const diff = running ? now - startTime + elapsedTime : elapsedTime;
      const ms = Math.floor(diff % 1000).toString().padStart(3, '0');
      const s = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
      const m = Math.floor((diff / 60000) % 60).toString().padStart(2, '0');
      document.getElementById('display').innerText = `${m}:${s}:${ms}`;
    }

    function startStop() {
      if (!running) {
        startTime = performance.now();
        interval = setInterval(updateDisplay, 10);
        running = true;
      } else {
        clearInterval(interval);
        elapsedTime += performance.now() - startTime;
        running = false;
      }
    }

    function reset() {
      clearInterval(interval);
      elapsedTime = 0;
      running = false;
      document.getElementById('display').innerText = "00:00:00.000";
      document.getElementById('laps').innerHTML = "<h3>Laps:</h3>";
    }

    function lap() {
      if (!running) return;
      const lapTime = document.getElementById('display').innerText;
      const lapDiv = document.createElement("div");
      lapDiv.innerText = `Lap: ${lapTime}`;
      document.getElementById("laps").appendChild(lapDiv);
    }

    function saveTime() {
      const recordTime = document.getElementById('display').innerText;
      const recDiv = document.createElement("div");
      recDiv.innerText = `Saved: ${recordTime}`;
      document.getElementById("records").appendChild(recDiv);
    }

    function startCountdown() {
      let min = parseInt(document.getElementById("countdownMin").value || 0);
      let sec = parseInt(document.getElementById("countdownSec").value || 0);
      let totalMS = (min * 60 + sec) * 1000;
      reset();

      interval = setInterval(() => {
        if (totalMS <= 0) {
          clearInterval(interval);
          document.getElementById('display').innerText = "00:00:00.000";
          alert("⏰ Countdown Finished!");
          return;
        }
        totalMS -= 10;
        const ms = Math.floor(totalMS % 1000).toString().padStart(3, '0');
        const s = Math.floor((totalMS / 1000) % 60).toString().padStart(2, '0');
        const m = Math.floor((totalMS / 60000)).toString().padStart(2, '0');
        document.getElementById('display').innerText = `${m}:${s}:${ms}`;
      }, 10);
    }