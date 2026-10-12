const field = document.getElementById("word-field");
const nameInput = document.getElementById("from-name");
const messageInput = document.getElementById("message");
const wordsInput = document.getElementById("words");
const color1Input = document.getElementById("color1");
const color2Input = document.getElementById("color2");
const densityInput = document.getElementById("density");
const speedInput = document.getElementById("speed");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const applyBtn = document.getElementById("apply-btn");
const title = document.getElementById("big-title");
const subtitle = document.getElementById("subtitle");
const count = document.getElementById("word-count");
const speedNames = ["ช้ามาก", "ช้า", "ปกติ", "เร็ว", "เร็วมาก"];
let running = true;

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return [parseInt(value.slice(0,2),16), parseInt(value.slice(2,4),16), parseInt(value.slice(4,6),16)];
}
function mixColors(a, b, amount) {
  const A = hexToRgb(a), B = hexToRgb(b);
  return "#" + A.map((v,i) => Math.round(v + (B[i]-v)*amount).toString(16).padStart(2,"0")).join("");
}
function random(min, max) { return Math.random() * (max - min) + min; }

function buildScene() {
  field.innerHTML = "";
  const words = wordsInput.value.split(/[,，\n]+/).map(w => w.trim()).filter(Boolean);
  const customName = nameInput.value.trim();
  if (customName) words.push(customName, `♥ ${customName} ♥`, `I love ${customName}`);
  if (!words.length) words.push("I love you", "รักนะ");
  title.textContent = messageInput.value.trim() || "I love you.";
  subtitle.textContent = customName ? `a little universe for ${customName}` : "in every language, in every universe";
  document.documentElement.style.setProperty("--pink", color1Input.value);
  document.documentElement.style.setProperty("--orange", color2Input.value);
  document.getElementById("color1-value").textContent = color1Input.value.toUpperCase();
  document.getElementById("color2-value").textContent = color2Input.value.toUpperCase();
  document.getElementById("density-value").textContent = densityInput.value;
  document.getElementById("speed-value").textContent = speedNames[Number(speedInput.value)-1];

  const total = Number(densityInput.value);
  const speed = Number(speedInput.value);
  const durationBase = 19 - speed * 2.6;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < total; i++) {
    const span = document.createElement("span");
    span.className = "floating-word";
    span.textContent = words[i % words.length];
    const size = random(11, 25) * (i % 11 === 0 ? 1.28 : 1);
    span.style.fontSize = `${size}px`;
    span.style.color = mixColors(color1Input.value, color2Input.value, Math.random());
    span.style.left = `${random(-5, 78)}%`;
    span.style.top = `${random(5, 94)}%`;
    span.style.setProperty("--x1", `${random(-45, 25)}px`);
    span.style.setProperty("--y1", `${random(-35, 20)}px`);
    span.style.setProperty("--x2", `${random(-20, 50)}px`);
    span.style.setProperty("--y2", `${random(-25, 35)}px`);
    span.style.setProperty("--r1", `${random(-12, 12)}deg`);
    span.style.setProperty("--r2", `${random(-18, 18)}deg`);
    span.style.setProperty("--duration", `${random(durationBase * .7, durationBase * 1.4)}s`);
    span.style.setProperty("--delay", `${random(-18, 0)}s`);
    span.style.setProperty("--opacity", `${random(.38, .9)}`);
    frag.appendChild(span);
  }
  field.appendChild(frag);
  count.textContent = `${total} WORDS IN MOTION`;
  field.classList.toggle("paused", !running);
  pauseBtn.classList.toggle("active", !running);
  pauseBtn.setAttribute("aria-pressed", String(!running));
}
function togglePause() {
  running = !running;
  field.classList.toggle("paused", !running);
  pauseBtn.classList.toggle("active", !running);
  pauseBtn.setAttribute("aria-pressed", String(!running));
  pauseBtn.textContent = running ? "Ⅱ หยุด" : "▶ เล่นต่อ";
}
startBtn.addEventListener("click", () => { running = true; buildScene(); });
pauseBtn.addEventListener("click", togglePause);
applyBtn.addEventListener("click", buildScene);
[color1Input, color2Input, densityInput, speedInput].forEach(el => el.addEventListener("input", () => {
  if (el.type === "color") {
    document.getElementById(`${el.id}-value`).textContent = el.value.toUpperCase();
  }
  if (el.id === "density") document.getElementById("density-value").textContent = el.value;
  if (el.id === "speed") document.getElementById("speed-value").textContent = speedNames[Number(el.value)-1];
}));
buildScene();
