const form = document.getElementById("quiz-form");
const summaryBox = document.getElementById("summary");

function setFeedback(id, correct, message) {
  const el = document.getElementById(id);
  el.textContent = message;
  el.classList.remove("correct", "incorrect");
  el.classList.add(correct ? "correct" : "incorrect");
}

function clearFeedback() {
  ["q1", "q2", "q3", "q4", "q5"].forEach((q) => {
    const el = document.getElementById(q + "-feedback");
    if (el) {
      el.textContent = "";
      el.classList.remove("correct", "incorrect");
    }
  });
  summaryBox.style.display = "none";
  summaryBox.textContent = "";
  summaryBox.classList.remove("pass", "fail");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearFeedback();

  let score = 0;
  const total = 5;

  const q1 = document.getElementById("q1").value.trim().toLowerCase();
  if (q1 === "hypertext markup language" || q1 === "hyper text markup language") {
    score++;
    setFeedback("q1-feedback", true, "Correct! HTML = HyperText Markup Language.");
  } else {
    setFeedback("q1-feedback", false, "Incorrect. The correct answer is HyperText Markup Language.");
  }

  const q2 = document.querySelector('input[name="q2"]:checked');
  if (q2 && q2.value === "5") {
    score++;
    setFeedback("q2-feedback", true, "Correct – HTML5 added built-in multimedia support.");
  } else {
    setFeedback("q2-feedback", false, "Incorrect. The correct answer is HTML5.");
  }

  const q3 = document.querySelector('input[name="q3"]:checked');
  if (q3 && q3.value === "whatwg") {
    score++;
    setFeedback("q3-feedback", true, "Correct – WHATWG maintains the living standard.");
  } else {
    setFeedback("q3-feedback", false, "Incorrect. The correct answer is WHATWG.");
  }

  const q4 = document.querySelector('input[name="q4"]:checked');
  if (q4 && q4.value === "style") {
    score++;
    setFeedback("q4-feedback", true, "Correct – CSS controls layout and appearance.");
  } else {
    setFeedback("q4-feedback", false, "Incorrect. CSS is mainly for styling.");
  }

  const selected = Array.from(document.querySelectorAll('input[name="q5"]:checked')).map(v => v.value);
  const correctSet = ["multimedia", "mobile", "offline"];

  const isCorrect =
    selected.length === correctSet.length &&
    correctSet.every(v => selected.includes(v));

  if (isCorrect) {
    score++;
    setFeedback("q5-feedback", true, "Correct – HTML5 improved multimedia, mobile layouts, and APIs.");
  } else {
    setFeedback("q5-feedback", false, "Incorrect. Correct answers: multimedia, mobile layouts, offline/APIs.");
  }

  const percent = Math.round((score / total) * 100);
  const pass = score >= 4;

  summaryBox.style.display = "block";
  summaryBox.classList.add(pass ? "pass" : "fail");
  summaryBox.textContent = `${pass ? "Pass 🎉" : "Fail 💡"}  You scored ${score}/${total} (${percent}%).`;
});

document.getElementById("reset-btn").addEventListener("click", function () {
  form.reset();
  clearFeedback();
});

