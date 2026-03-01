const sequence = [
    { text: "JunglePod 🪴", anim: "a-center" },
    { text: "Indie",        anim: "a-tlbr" },
    { text: "Software",     anim: "a-trbl" },
    { text: "Creator",      anim: "a-bc" }
];

const textEl = document.getElementById('text-display');
const finalEl = document.getElementById('final-display');
const music = document.getElementById('bg-music');
const overlay = document.getElementById('start-overlay');
const storyPopup = document.getElementById('story-popup');
const closeThanksBtn = document.getElementById('close-thanks');

music.volume = 0.4;

async function startExperience() {
    try { await music.play(); } catch(e) {}
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        setTimeout(() => run(0), 500);
    }, 1000);
}

function run(i) {
    if (i >= sequence.length) { final(); return; }
    const { text, anim } = sequence[i];

    textEl.style.transition = 'none';
    textEl.className = 'dynamic-text ' + anim;
    textEl.textContent = text;
    void textEl.offsetWidth;
    textEl.style.transition = '';

    setTimeout(() => textEl.classList.add('s'), 20);

    const stay = Math.random() * 1500 + 2500;
    let hideDuration = (anim === 'a-center' || anim === 'a-bc') ? 2500 : 2000;

    setTimeout(() => {
        textEl.classList.remove('s');
        textEl.classList.add('h');
        setTimeout(() => run(i + 1), hideDuration);
    }, stay);
}

function final() {
    textEl.style.display = 'none';
    finalEl.classList.add('show');
    setTimeout(() => {
        closeThanksBtn.classList.add('show');
    }, 500);
    setTimeout(() => {
        storyPopup.classList.add('show');
    }, 2000);
}

function closePopup() {
    storyPopup.classList.remove('show');
}

function closeAndReset() {
    closeThanksBtn.classList.remove('show');
    finalEl.classList.remove('show');
    music.pause();
    music.currentTime = 0;
    storyPopup.classList.remove('show');
    overlay.style.display = 'flex';
    overlay.style.opacity = '1';
    textEl.style.display = 'block';
    textEl.className = 'dynamic-text';
    textEl.style.transition = 'none';
}

window.startExperience = startExperience;
window.closePopup = closePopup;
window.closeAndReset = closeAndReset;
window.startExperience = startExperience;
window.closePopup = closePopup;
window.closeAndReset = closeAndReset;