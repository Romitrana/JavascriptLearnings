const rangeE1 = document.getElementById("timerrange");
const displayRange = document.getElementById("rangevalue");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const h = document.getElementById("hour");
const m = document.getElementById("min");
const s = document.getElementById("sec");
const message = document.getElementById("message");

let totalHour = Number(rangeE1.value);
let setTime = totalHour * 60 * 60 * 1000; //milliseconds

displayRange.textContent = totalHour;

rangeE1.addEventListener("change", () => {
  totalHour = Number(rangeE1.value);
  setTime = totalHour * 60 * 60 * 1000;
  displayRange.textContent = totalHour;
});

let stoptimerID;
btn1.addEventListener("click", () => {
  if (btn1.disabled == false) {
    btn1.disabled = true;
    console.log("timerstarted");
    message.textContent = "Timer is now running! Stay focused!";
    message.style.color = "rgb(53, 194, 25)";
    btn1.textContent = "Start";
    btn1.style.background = "rgb(53, 194, 25)";
    btn1.style.color = "#fff";
  } else {
    btn1.disabled = false;
    console.log("timerstoped");
    message.textContent = "Paused! Click 'Resume' to continue your timer.";
    message.style.color = "yellow";
  }

  stoptimerID = setInterval(() => {
    setTime -= 1000;
    const hours = Math.floor(setTime / (60 * 60 * 1000));
    const minutes = Math.floor((setTime % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((setTime % (60 * 1000)) / 1000);
    h.textContent = hours;
    m.textContent = minutes;
    s.textContent = seconds;
    h.textContent = String(hours).padStart(2, "0");
    m.textContent = String(minutes).padStart(2, "0");
    s.textContent = String(seconds).padStart(2, "0");
    console.log("=======");
    if (setTime <= 0) {
      clearInterval(stoptimerID);
      h.textContent = "00";
      m.textContent = "00";
      s.textContent = "00";
      message.textContent = "Time's up! Great job!";
      message.style.color = "#fff";
      message.style.backgroundColor = "rgb(23, 176, 176)";
      message.style.animation = "none";
    }
  }, 1000);
});
btn2.addEventListener("click", () => {
  console.log("stop timer");
  clearInterval(stoptimerID);
  btn1.disabled = false;
  btn1.textContent = "Resume";
  btn1.style.background = "yellow";
  btn1.style.color = "black";
  message.textContent = "Paused! Click 'Resume' to continue your timer.";
  message.style.color = "yellow";
});
