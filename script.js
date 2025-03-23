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
let timer;
let timeLeft = 10;

const quizData = [
  {
    question: "친구가 제일 좋아하는 색깔은?",
    choices: ["파랑", "노랑", "분홍", "초록"],
    answer: 2,
  },
  {
    question: "친구가 가장 좋아하는 음식은?",
    choices: ["떡볶이", "피자", "초밥", "치킨"],
    answer: 0,
  },
  {
    question: "친구의 생일은 언제일까?",
    choices: ["3월 1일", "4월 10일", "5월 5일", "12월 25일"],
    answer: 1,
  },
];

openLetterBtn.addEventListener("click", () => {
  letterContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  playBGM();
  showQuestion();
});

function playBGM() {
  if (bgm.paused) {
    bgm.play().catch((e) => {
      console.log("BGM 재생 실패:", e);
      const resumeAudio = () => {
        bgm.play();
        document.body.removeEventListener("click", resumeAudio);
      };
      document.body.addEventListener("click", resumeAudio);
    });
  }
}

nextBtn.addEventListener("click", () => {
  clearInterval(timer);
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = "";
  nextBtn.disabled = true;
  timeLeft = 10;
  timerEl.textContent = timeLeft;

  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.addEventListener("click", () => handleAnswer(btn, index));
    choicesEl.appendChild(btn);
  });

  startTimer();
}

function handleAnswer(btn, selectedIndex) {
  if (selectedIndex === quizData[currentQuestion].answer) {
    score++;
  }

  document
    .querySelectorAll("#choices button")
    .forEach((b) => (b.disabled = true));
  btn.classList.add("choice-selected");

  nextBtn.disabled = false;
  clearInterval(timer);
}

function showResult() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreEl.textContent = `당신의 점수는 ${score}/${quizData.length}입니다!`;

  let msg = "";
  if (score === quizData.length) msg = "완벽해! 진짜 찐친이야 🎉";
  else if (score >= 2) msg = "잘했어! 꽤 가까운 친구야 😊";
  else msg = "ㅋㅋ 조금 더 알아가보자~ 그래도 진심은 전달됐어 💕";

  messageEl.textContent = msg;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextBtn.disabled = false;
      document
        .querySelectorAll("#choices button")
        .forEach((b) => (b.disabled = true));
    }
  }, 1000);
}
