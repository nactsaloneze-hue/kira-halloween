/* 公式LINE URLが確認できたら、次の空文字を実際のURLに差し替えてください。 */
const LINE_URL = "https://lin.ee/n8yGH42";

const styleResults = {
  glam: {
    title: "華やかな私を解禁",
    description: "少し大胆な色や光を味方に。いつもより華やかな表情で、鏡を見る時間まで楽しくなるスタイルです。"
  },
  soft: {
    title: "やわらかな私に出会う",
    description: "やさしい色と軽やかな仕上がりで、自然体の魅力をふんわり引き立てるスタイルです。"
  },
  elegant: {
    title: "上品な私をアップデート",
    description: "肌を整え、色と質感を丁寧に重ねて。今のあなたにしっくりくる、洗練されたスタイルです。"
  },
  fresh: {
    title: "新しい私にときめく",
    description: "いつものメイクに小さな冒険を。明るさや目元の印象を楽しみながら、新鮮な表情を見つけるスタイルです。"
  }
};

const styleWeights = {
  glam: { glam: 3, fresh: 1 },
  soft: { soft: 3, elegant: 1 },
  elegant: { elegant: 3, soft: 1 },
  bright: { fresh: 2, soft: 1 },
  eyes: { glam: 2, elegant: 1 },
  adventure: { fresh: 3, glam: 1 },
  refresh: { elegant: 2, fresh: 1 }
};

const quiz = document.getElementById("style-quiz");
const quizResult = document.getElementById("quiz-result");
const quizError = document.getElementById("quiz-error");

quiz.addEventListener("submit", (event) => {
  event.preventDefault();
  const selected = [...quiz.querySelectorAll('input[name="style"]:checked')].map((input) => input.value);

  if (selected.length === 0) {
    quizError.hidden = false;
    quizResult.hidden = true;
    quiz.querySelector('input[name="style"]').focus();
    return;
  }

  quizError.hidden = true;
  const scores = { glam: 0, soft: 0, elegant: 0, fresh: 0 };
  selected.forEach((answer) => {
    Object.entries(styleWeights[answer]).forEach(([style, points]) => { scores[style] += points; });
  });
  const winner = Object.keys(scores).reduce((best, style) => scores[style] > scores[best] ? style : best);
  document.getElementById("result-title").textContent = styleResults[winner].title;
  document.getElementById("result-description").textContent = styleResults[winner].description;
  quizResult.hidden = false;
  quizResult.focus({ preventScroll: true });
  quizResult.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "nearest" });
});

quiz.addEventListener("change", () => { quizError.hidden = true; });

const lineButton = document.getElementById("line-button");
const lineNote = document.getElementById("line-note");
if (LINE_URL) {
  lineButton.addEventListener("click", () => { window.location.href = LINE_URL; });
  lineNote.hidden = true;
} else {
  lineButton.addEventListener("click", () => {
    lineNote.focus?.();
    lineNote.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}
