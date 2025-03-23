const openLetterBtn = document.getElementById("open-letter");
const letterContainer = document.getElementById("letter-container");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");
const timerEl = document.getElementById("time");
const bgm = document.getElementById("bgm");

let currentQuestion = 0;
let score = 0;
let quizTimer;
let timeLeft = 30;

const quizData = [
  {
    question: "🫶🏻 명이가 가장 사랑하는 사람은?",
    choices: ["🐱 함이", "🐽 멍청이", "👱🏻‍♀️ 아이유", "👩🏻‍🦰 경리"],
    answer: [0, 1],
  },
  {
    question: "✈️ 명이랑 함이랑 앞으로 가기로 한 나라가 아닌 곳은?",
    choices: ["🇻🇳 베트남", "🇯🇵 일본", "🇨🇳 중국", "🇦🇪 두바이"],
    answer: [2],
  },
  {
    question: "💖 명이는 함이를 얼만큼 사랑할까?",
    choices: [
      "절대 헤어지고 싶지 않을만큼",
      "뗄레야 뗄 수 없게",
      "항상 생각나고 보고싶을 만큼",
      "아프면 대신 아프고 싶을 만큼",
    ],
    answer: [0, 1, 2, 3],
  },
];

openLetterBtn.addEventListener("click", () => {
  letterContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  playBGM();
  startQuizTimer();
  showQuestion();
});

function playBGM() {
  if (bgm.paused) {
    bgm.play().catch(() => {
      const resumeAudio = () => {
        bgm.play();
        document.body.removeEventListener("click", resumeAudio);
      };
      document.body.addEventListener("click", resumeAudio);
    });
  }
}

function startQuizTimer() {
  timeLeft = 30;
  timerEl.textContent = timeLeft;
  quizTimer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(quizTimer);
      resetToStart();
    }
  }, 1000);
}

function resetToStart() {
  currentQuestion = 0;
  score = 0;
  quizContainer.classList.add("hidden");
  resultContainer.classList.add("hidden");
  letterContainer.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    clearInterval(quizTimer);
    showResult();
  }
}

nextBtn.addEventListener("click", nextQuestion);

function showQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = "";
  nextBtn.disabled = true;

  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.addEventListener("click", () => handleAnswer(btn, index));
    choicesEl.appendChild(btn);
  });
}

function handleAnswer(btn, selectedIndex) {
  const correctAnswers = quizData[currentQuestion].answer;

  if (correctAnswers.includes(selectedIndex)) {
    score++;
  }

  document
    .querySelectorAll("#choices button")
    .forEach((b) => (b.disabled = true));
  btn.classList.add("choice-selected");
  nextBtn.disabled = false;
}

function showResult() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreEl.textContent = `📊 너의 점수는 ${score}/${quizData.length}점이야!`;

  let msg = "";

  if (score === quizData.length) {
    msg = "💯 축하해! 명이가 낸 문제를 다 맞췄어!! 🎉🎀";
    document.getElementById("download-link").classList.remove("hidden");
    document.getElementById("restart-button").classList.add("hidden");
  } else {
    msg = "😅 함이는 아직 나를 정말 모르는구나 💕";
    document.getElementById("download-link").classList.add("hidden");
    document.getElementById("restart-button").classList.remove("hidden");

    // ✅ 여기서 다시 이벤트 연결 (최종 보장)
    const restartBtn = document.getElementById("restart-btn");
    restartBtn.onclick = () => {
      resetToStart(); // 또는 location.reload()도 가능
    };
  }

  messageEl.textContent = msg;
  triggerConfetti();
}

function triggerConfetti() {
  const confettiContainer = document.getElementById("confetti");
  confettiContainer.innerHTML = "";

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.animationDelay = Math.random() + "s";
    confettiContainer.appendChild(confetti);
  }
}

// ✅ [수정 포인트] 처음으로 돌아가기 버튼은 DOMContentLoaded 이후 바인딩
window.addEventListener("DOMContentLoaded", () => {
  const restartBtn = document.getElementById("restart-btn");
  if (restartBtn) {
    restartBtn.addEventListener("click", resetToStart);
  }

  // 기존 Fade-in 효과도 이 안에 같이 둬도 됨
  const lines = document.querySelectorAll(".fade-line");
  lines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add("visible");
    }, index * 500);
  });
});
