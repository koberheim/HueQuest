/**
 * HUE QUEST - Daily Color Mixing Challenge
 * Draft/Commit system with scoring tiers and session progression
 */

// ============================================
// PUZZLE CONFIGURATION
// ============================================
// To add a new puzzle, add an object to this array:
// {
//   name: "Puzzle Name",
//   difficulty: "easy" | "medium" | "hard",
//   target: [R, G, B],      // RGB values 0-255
//   sources: [[R,G,B], ...], // Array of source colors
//   mixLimit: 5              // Max mixes allowed
// }

const PUZZLES = [
    {
        name: "Forest Green", difficulty: "easy", target: [34, 139, 34],
        sources: [[0, 0, 255], [255, 255, 0], [0, 128, 0], [255, 255, 255]], mixLimit: 5
    },
    {
        name: "Coral Reef", difficulty: "easy", target: [255, 127, 80],
        sources: [[255, 0, 0], [255, 165, 0], [255, 255, 255], [255, 192, 203]], mixLimit: 5
    },
    {
        name: "Twilight", difficulty: "medium", target: [75, 0, 130],
        sources: [[0, 0, 255], [128, 0, 128], [255, 0, 255], [0, 0, 0], [255, 255, 255]], mixLimit: 5
    },
    {
        name: "Desert Sand", difficulty: "medium", target: [210, 180, 140],
        sources: [[255, 255, 0], [139, 69, 19], [255, 255, 255], [255, 200, 150], [200, 150, 100]], mixLimit: 4
    },
    {
        name: "Ocean Deep", difficulty: "hard", target: [0, 105, 148],
        sources: [[0, 0, 255], [0, 255, 255], [0, 128, 0], [0, 0, 0], [255, 255, 255]], mixLimit: 5
    },
    {
        name: "Rose Gold", difficulty: "hard", target: [183, 110, 121],
        sources: [[255, 192, 203], [255, 215, 0], [255, 255, 255], [139, 69, 19], [255, 0, 0]], mixLimit: 4
    },
    // NEW PUZZLES
    {
        name: "Mint Fresh", difficulty: "easy", target: [152, 255, 152],
        sources: [[0, 255, 0], [255, 255, 255], [0, 255, 255], [144, 238, 144]], mixLimit: 5
    },
    {
        name: "Dusty Rose", difficulty: "medium", target: [199, 144, 151],
        sources: [[255, 192, 203], [139, 69, 19], [255, 255, 255], [128, 0, 0], [255, 228, 225]], mixLimit: 5
    },
    {
        name: "Electric Violet", difficulty: "hard", target: [143, 0, 255],
        sources: [[255, 0, 255], [0, 0, 255], [128, 0, 128], [255, 255, 255], [75, 0, 130]], mixLimit: 4
    },
    {
        name: "Burnt Sienna", difficulty: "medium", target: [138, 54, 15],
        sources: [[255, 0, 0], [139, 69, 19], [255, 165, 0], [0, 0, 0], [255, 255, 255]], mixLimit: 5
    },
    {
        name: "Arctic Teal", difficulty: "hard", target: [64, 224, 208],
        sources: [[0, 255, 255], [0, 128, 128], [255, 255, 255], [0, 255, 0], [0, 0, 128]], mixLimit: 4
    },
    {
        name: "Golden Hour", difficulty: "easy", target: [255, 179, 71],
        sources: [[255, 255, 0], [255, 165, 0], [255, 255, 255], [255, 215, 0], [255, 140, 0]], mixLimit: 5
    }
];

// ============================================
// DAILY PUZZLE SYSTEM
// ============================================
const EPOCH_DATE = new Date('2024-01-01T00:00:00'); // Starting point for puzzle numbering

function getDaysSinceEpoch() {
    const now = new Date();
    const utcNow = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const utcEpoch = Date.UTC(EPOCH_DATE.getFullYear(), EPOCH_DATE.getMonth(), EPOCH_DATE.getDate());
    return Math.floor((utcNow - utcEpoch) / (1000 * 60 * 60 * 24));
}

function getDailyPuzzleIndex() {
    const days = getDaysSinceEpoch();
    return days % PUZZLES.length;
}

function getDailyPuzzleNumber() {
    return getDaysSinceEpoch() + 1; // Puzzle #1 starts on epoch date
}

function getNextPuzzleTime() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow - now;
}

function formatCountdown(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function getTodayKey() {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

// ============================================
// ANALYTICS SYSTEM
// ============================================
const analytics = {
    events: [],

    track(category, action, label = null, value = null) {
        const event = {
            timestamp: new Date().toISOString(),
            category,
            action,
            label,
            value
        };
        this.events.push(event);

        // Log to console for debugging
        console.log(`[Analytics] ${action}:`, { category, label, value });

        // Push to dataLayer for external analytics (GA4, etc.)
        if (typeof window.dataLayer !== 'undefined') {
            window.dataLayer.push({
                event: action,
                event_category: category,
                event_label: label,
                event_value: value
            });
        }
    },

    getEvents() {
        return [...this.events];
    }
};

// Initialize dataLayer if not exists
window.dataLayer = window.dataLayer || [];

// ============================================
// SHARE FUNCTIONALITY
// ============================================
function generateShareText(puzzleNumber, pct, tier, mixCount, mixLimit) {
    // Generate emoji blocks based on accuracy tiers
    let blocks = '';
    if (pct >= 95) blocks = '🟩🟩🟩';
    else if (pct >= 90) blocks = '🟩🟩🟨';
    else if (pct >= 80) blocks = '🟩🟨🟨';
    else if (pct >= 70) blocks = '🟨🟨🟨';
    else if (pct >= 50) blocks = '🟨🟥🟥';
    else blocks = '🟥🟥🟥';

    const efficiency = mixCount < mixLimit ? ' ⚡' : '';

    return `HueQuest #${puzzleNumber} 🎨
${blocks} ${pct}%
${mixCount}/${mixLimit} mixes${efficiency}

Play at: huequest.game`;
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return true;
        } catch (e) {
            document.body.removeChild(textarea);
            return false;
        }
    }
}

async function shareResults() {
    if (!officialResult) return;

    const puzzleNumber = getDailyPuzzleNumber();
    const puzzle = PUZZLES[currentPuzzleIndex];
    const shareText = generateShareText(
        puzzleNumber,
        officialResult.pct,
        officialResult.tier,
        officialResult.mixCount,
        puzzle.mixLimit
    );

    analytics.track('engagement', 'share_click', 'share_button');

    // Try native share API first (mobile)
    if (navigator.share) {
        try {
            await navigator.share({
                title: `HueQuest #${puzzleNumber}`,
                text: shareText
            });
            analytics.track('engagement', 'share_complete', 'native_share');
            return true;
        } catch (err) {
            if (err.name !== 'AbortError') {
                // Fall through to clipboard
            }
        }
    }

    // Fallback to clipboard
    const success = await copyToClipboard(shareText);
    if (success) {
        analytics.track('engagement', 'share_complete', 'clipboard');
    }
    return success;
}

// ============================================
// SCORING THRESHOLDS (easy to tweak)
// ============================================
const TIERS = {
    perfect: { min: 95, name: "Perfect Match", icon: "✨", class: "perfect" },
    professional: { min: 90, name: "Professional Eye", icon: "🎨", class: "professional" },
    good: { min: 80, name: "Good Eye", icon: "👍", class: "good" },
    training: { min: 0, name: "Keep Training", icon: "💪", class: "training" }
};

// Session title thresholds
const SESSION_TITLES = [
    { perfectCount: 5, title: "Color Sniper 🎯" },
    { perfectCount: 3, title: "True Colorist 🎨" },
    { perfectCount: 1, title: "Color Explorer 🔍" },
    { perfectCount: 0, title: "Warm-up Artist 🌅" }
];

// ============================================
// GAME STATE
// ============================================
let currentPuzzleIndex = 0;
let currentColor = [255, 255, 255];
let mixHistory = [];
let colorHistory = [[255, 255, 255]];
let mixCount = 0;
let soundEnabled = true;

// Draft/Commit state
let isCommitted = false;
let isSandboxMode = false;
let officialResult = null;

// Session stats (persisted to localStorage if available)
let sessionStats = { perfectCount: 0, bestTier: null, puzzlesPlayed: 0 };

// Streak & Personal Bests (NEW)
let streakData = { count: 0, lastPlayDate: null };
let personalBests = {}; // { puzzleIndex: bestScore }

// Daily puzzle state
let dailyCompleted = {}; // { "YYYY-M-D": true }
let countdownInterval = null;
let tutorialComplete = false;

// ============================================
// DOM ELEMENTS
// ============================================
const $ = id => document.getElementById(id);
const puzzleLabel = $('puzzleLabel');
const difficultyBadge = $('difficultyBadge');
const soundToggle = $('soundToggle');
const resetBtn = $('resetBtn');
const sessionBanner = $('sessionBanner');
const sessionTitle = $('sessionTitle');
const sessionStatsEl = $('sessionStats');
const phaseTag = $('phaseTag');
const targetSwatch = $('targetSwatch');
const differenceRing = $('differenceRing');
const mixSwatch = $('mixSwatch');
const swirlEffect = $('swirlEffect');
const matchValue = $('matchValue');
const historyStrip = $('historyStrip');
const startSquare = $('startSquare');
const mixCounter = $('mixCounter');
const sourceColors = $('sourceColors');
const undoBtn = $('undoBtn');
const commitBtn = $('commitBtn');
const prevBtn = $('prevBtn');
const nextBtn = $('nextBtn');
const randomBtn = $('randomBtn');
const officialResultEl = $('officialResult');
const officialTier = $('officialTier');
const officialScore = $('officialScore');
const officialEfficiency = $('officialEfficiency');
const sandboxNotice = $('sandboxNotice');
const resultsOverlay = $('resultsOverlay');
const resultCelebration = $('resultCelebration');
const resultTierDisplay = $('resultTierDisplay');
const resultPercent = $('resultPercent');
const resultYourMix = $('resultYourMix');
const resultTargetColor = $('resultTargetColor');
const resultEfficiencyDisplay = $('resultEfficiencyDisplay');
const resultEfficiencyText = $('resultEfficiencyText');
const resultHistory = $('resultHistory');
const sandboxBtn = $('sandboxBtn');
const nextPuzzleBtn = $('nextPuzzleBtn');

// NEW: Streak, PB, Hints, Confetti elements
const streakBadge = $('streakBadge');
const streakCount = $('streakCount');
const pbBadge = $('pbBadge');
const hintBadge = $('hintBadge');
const confettiCanvas = $('confettiCanvas');
const confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;

// NEW: Daily puzzle, share, and tutorial elements
const countdownBadge = $('countdownBadge');
const shareBtn = $('shareBtn');
const copyBtn = $('copyBtn');
const dailyCompleteBanner = $('dailyCompleteBanner');
const nextPuzzleTime = $('nextPuzzleTime');
const tutorialOverlay = $('tutorialOverlay');
const tutorialNextBtn = $('tutorialNextBtn');
const tutorialSkipBtn = $('tutorialSkipBtn');

let draggedElement = null, draggedColor = null, ghostElement = null;
let audioContext = null;
let confettiParticles = [];

// ============================================
// AUDIO
// ============================================
function initAudio() { if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)(); }

function playSound(type) {
    if (!soundEnabled) return;
    try {
        initAudio();
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain); gain.connect(audioContext.destination);

        if (type === 'plop') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, audioContext.currentTime);
            osc.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.15);
            gain.gain.setValueAtTime(0.12, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            osc.start(); osc.stop(audioContext.currentTime + 0.2);
        } else if (type === 'chime') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523, audioContext.currentTime);
            osc.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
            osc.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
            gain.gain.setValueAtTime(0.1, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            osc.start(); osc.stop(audioContext.currentTime + 0.5);
        } else if (type === 'commit') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, audioContext.currentTime);
            osc.frequency.setValueAtTime(554, audioContext.currentTime + 0.1);
            osc.frequency.setValueAtTime(659, audioContext.currentTime + 0.2);
            gain.gain.setValueAtTime(0.15, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            osc.start(); osc.stop(audioContext.currentTime + 0.4);
        }
    } catch (e) { }
}

// ============================================
// COLOR UTILITIES
// ============================================
const rgb = c => `rgb(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])})`;
const blend = (c1, c2, w = 0.5) => [c1[0] * (1 - w) + c2[0] * w, c1[1] * (1 - w) + c2[1] * w, c1[2] * (1 - w) + c2[2] * w];
const dist = (c1, c2) => Math.sqrt((c1[0] - c2[0]) ** 2 + (c1[1] - c2[1]) ** 2 + (c1[2] - c2[2]) ** 2);
const matchPct = (c1, c2) => Math.round(Math.max(0, 100 - dist(c1, c2) / Math.sqrt(255 ** 2 * 3) * 100));

function getTier(pct) {
    if (pct >= TIERS.perfect.min) return TIERS.perfect;
    if (pct >= TIERS.professional.min) return TIERS.professional;
    if (pct >= TIERS.good.min) return TIERS.good;
    return TIERS.training;
}

function getSessionTitle() {
    for (const t of SESSION_TITLES) if (sessionStats.perfectCount >= t.perfectCount) return t.title;
    return SESSION_TITLES[SESSION_TITLES.length - 1].title;
}

// ============================================
// SESSION PERSISTENCE
// ============================================
function loadSession() {
    try {
        const saved = localStorage.getItem('huequest-session');
        if (saved) sessionStats = JSON.parse(saved);
    } catch (e) { }
}

function saveSession() {
    try { localStorage.setItem('huequest-session', JSON.stringify(sessionStats)); } catch (e) { }
}

function updateSessionBanner() {
    sessionTitle.textContent = getSessionTitle();
    sessionStatsEl.textContent = `${sessionStats.perfectCount} Perfect Match${sessionStats.perfectCount !== 1 ? 'es' : ''}`;
}

// ============================================
// STREAK SYSTEM (NEW)
// ============================================
function loadStreak() {
    try {
        const saved = localStorage.getItem('huequest-streak');
        if (saved) streakData = JSON.parse(saved);
    } catch (e) { }
}

function saveStreak() {
    try { localStorage.setItem('huequest-streak', JSON.stringify(streakData)); } catch (e) { }
}

function updateStreak() {
    const today = new Date().toDateString();
    if (streakData.lastPlayDate === today) {
        // Already played today, no change
    } else {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (streakData.lastPlayDate === yesterday) {
            // Consecutive day!
            streakData.count++;
        } else if (streakData.lastPlayDate !== null) {
            // Streak broken
            streakData.count = 1;
        } else {
            // First ever play
            streakData.count = 1;
        }
        streakData.lastPlayDate = today;
        saveStreak();
    }
    updateStreakDisplay();
}

function updateStreakDisplay() {
    if (streakCount) streakCount.textContent = streakData.count;
    if (streakBadge) {
        streakBadge.classList.toggle('inactive', streakData.count === 0);
    }
}

// ============================================
// PERSONAL BESTS (NEW)
// ============================================
function loadPersonalBests() {
    try {
        const saved = localStorage.getItem('huequest-pbs');
        if (saved) personalBests = JSON.parse(saved);
    } catch (e) { }
}

function savePersonalBests() {
    try { localStorage.setItem('huequest-pbs', JSON.stringify(personalBests)); } catch (e) { }
}

function getPersonalBest(puzzleIndex) {
    return personalBests[puzzleIndex] || null;
}

function updatePersonalBest(puzzleIndex, score) {
    const current = getPersonalBest(puzzleIndex);
    const isNewPB = current === null || score > current;
    if (isNewPB) {
        personalBests[puzzleIndex] = score;
        savePersonalBests();
    }
    return isNewPB;
}

function updatePBDisplay(puzzleIndex, newPB = false) {
    if (!pbBadge) return;
    const pb = getPersonalBest(puzzleIndex);
    if (pb !== null) {
        pbBadge.textContent = `🏆 ${pb}%`;
        pbBadge.classList.toggle('new-pb', newPB);
    } else {
        pbBadge.textContent = '🏆 --';
        pbBadge.classList.remove('new-pb');
    }
}

// ============================================
// DAILY COMPLETION TRACKING
// ============================================
function loadDailyCompleted() {
    try {
        const saved = localStorage.getItem('huequest-daily-completed');
        if (saved) dailyCompleted = JSON.parse(saved);
    } catch (e) { }
}

function saveDailyCompleted() {
    try { localStorage.setItem('huequest-daily-completed', JSON.stringify(dailyCompleted)); } catch (e) { }
}

function isDailyCompleted() {
    return dailyCompleted[getTodayKey()] === true;
}

function markDailyCompleted() {
    dailyCompleted[getTodayKey()] = true;
    saveDailyCompleted();
}

function updateCountdown() {
    const ms = getNextPuzzleTime();
    if (countdownBadge) {
        countdownBadge.textContent = `⏰ ${formatCountdown(ms)}`;
    }
    if (nextPuzzleTime) {
        nextPuzzleTime.textContent = formatCountdown(ms);
    }
}

function startCountdownTimer() {
    if (countdownInterval) clearInterval(countdownInterval);
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function showDailyCompleteBanner() {
    if (dailyCompleteBanner) {
        dailyCompleteBanner.classList.add('show');
        startCountdownTimer();
    }
}

function hideDailyCompleteBanner() {
    if (dailyCompleteBanner) {
        dailyCompleteBanner.classList.remove('show');
    }
}

// ============================================
// ONBOARDING TUTORIAL SYSTEM
// ============================================
let currentTutorialStep = 0;
const TUTORIAL_STEPS = [
    {
        title: "Welcome to HueQuest! 🎨",
        text: "Match the target color by mixing source colors. Each day brings a new puzzle!",
        highlight: null
    },
    {
        title: "Drag to Mix",
        text: "Drag any color blob onto your mix swatch to blend colors together.",
        highlight: "sourceColors"
    },
    {
        title: "Limited Mixes ⚡",
        text: "You have a limited number of mixes per puzzle. Use them wisely to get the best match!",
        highlight: "mixCounter"
    },
    {
        title: "Made a Mistake?",
        text: "No worries! Use the Undo button to go back and try a different color.",
        highlight: "undoBtn"
    },
    {
        title: "Beat Your Best 🏆",
        text: "Your personal best is tracked for each puzzle. Can you improve your score?",
        highlight: "pbBadge"
    },
    {
        title: "Commit Your Result",
        text: "When you're happy with your mix, commit it to lock in your score. You can keep experimenting in sandbox mode!",
        highlight: "commitBtn"
    }
];

function loadTutorialState() {
    try {
        tutorialComplete = localStorage.getItem('huequest-tutorial') === 'true';
    } catch (e) { }
}

function saveTutorialComplete() {
    try { localStorage.setItem('huequest-tutorial', 'true'); } catch (e) { }
    tutorialComplete = true;
}

function showTutorial() {
    if (tutorialComplete || !tutorialOverlay) return;
    currentTutorialStep = 0;
    updateTutorialStep();
    tutorialOverlay.classList.add('show');
    analytics.track('onboarding', 'tutorial_start');
}

function updateTutorialStep() {
    const step = TUTORIAL_STEPS[currentTutorialStep];
    const stepEl = tutorialOverlay?.querySelector('.tutorial-content');
    if (stepEl) {
        stepEl.innerHTML = `
            <h3 class="tutorial-title">${step.title}</h3>
            <p class="tutorial-text">${step.text}</p>
        `;
    }

    // Update progress dots
    const dots = tutorialOverlay?.querySelectorAll('.tutorial-dot');
    dots?.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentTutorialStep);
    });

    // Update button text
    if (tutorialNextBtn) {
        tutorialNextBtn.textContent = currentTutorialStep === TUTORIAL_STEPS.length - 1 ? "Let's Play!" : "Next";
    }

    // Highlight element if specified
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
    if (step.highlight) {
        const highlightEl = document.getElementById(step.highlight);
        if (highlightEl) highlightEl.classList.add('tutorial-highlight');
    }
}

function nextTutorialStep() {
    currentTutorialStep++;
    if (currentTutorialStep >= TUTORIAL_STEPS.length) {
        completeTutorial();
    } else {
        updateTutorialStep();
    }
}

function completeTutorial() {
    if (tutorialOverlay) {
        tutorialOverlay.classList.remove('show');
    }
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
    saveTutorialComplete();
    analytics.track('onboarding', 'tutorial_complete', null, currentTutorialStep + 1);
}

function skipTutorial() {
    completeTutorial();
    analytics.track('onboarding', 'tutorial_skip', null, currentTutorialStep);
}

// ============================================
// COLOR HINTS (NEW)
// ============================================
function getColorHint(current, target) {
    const rDiff = target[0] - current[0];
    const gDiff = target[1] - current[1];
    const bDiff = target[2] - current[2];

    const totalDiff = Math.abs(rDiff) + Math.abs(gDiff) + Math.abs(bDiff);
    if (totalDiff < 50) return { text: "Almost there! 🎯", type: "neutral" };

    // Determine dominant need
    const absR = Math.abs(rDiff);
    const absG = Math.abs(gDiff);
    const absB = Math.abs(bDiff);

    if (absR > absG && absR > absB) {
        return rDiff > 0
            ? { text: "Needs warmth ☀️", type: "warm" }
            : { text: "Too red, cool it down 🧊", type: "cool" };
    } else if (absG > absR && absG > absB) {
        return gDiff > 0
            ? { text: "Needs nature 🌿", type: "neutral" }
            : { text: "Less green 🍂", type: "warm" };
    } else {
        return bDiff > 0
            ? { text: "Needs depth 🌊", type: "cool" }
            : { text: "Less blue, more earth 🏜️", type: "warm" };
    }
}

function updateHintDisplay() {
    if (!hintBadge) return;
    const puzzle = PUZZLES[currentPuzzleIndex];
    const pct = matchPct(currentColor, puzzle.target);

    // Show hint after 1+ mixes AND if match < 60%
    if (mixCount >= 1 && pct < 60 && !isCommitted) {
        const hint = getColorHint(currentColor, puzzle.target);
        hintBadge.textContent = hint.text;
        hintBadge.className = `hint-badge show ${hint.type}`;
    } else {
        hintBadge.className = 'hint-badge';
    }
}

// ============================================
// CONFETTI CELEBRATION (NEW)
// ============================================
function resizeConfettiCanvas() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

function createConfetti() {
    confettiParticles = [];
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#1dd1a1', '#5f27cd', '#00d2d3'];
    for (let i = 0; i < 150; i++) {
        confettiParticles.push({
            x: Math.random() * window.innerWidth,
            y: -20 - Math.random() * 200,
            size: 6 + Math.random() * 8,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: 3 + Math.random() * 4,
            speedX: -2 + Math.random() * 4,
            rotation: Math.random() * 360,
            rotationSpeed: -5 + Math.random() * 10
        });
    }
}

function animateConfetti() {
    if (!confettiCtx || confettiParticles.length === 0) return;

    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    let active = false;
    confettiParticles.forEach(p => {
        if (p.y < window.innerHeight + 50) {
            active = true;
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;
            p.speedY += 0.1; // gravity

            confettiCtx.save();
            confettiCtx.translate(p.x, p.y);
            confettiCtx.rotate(p.rotation * Math.PI / 180);
            confettiCtx.fillStyle = p.color;
            confettiCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            confettiCtx.restore();
        }
    });

    if (active) {
        requestAnimationFrame(animateConfetti);
    } else {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiParticles = [];
    }
}

function triggerCelebration() {
    // Flash effect
    document.querySelector('.game-container')?.classList.add('celebration-flash');
    setTimeout(() => {
        document.querySelector('.game-container')?.classList.remove('celebration-flash');
    }, 500);

    // Confetti burst
    resizeConfettiCanvas();
    createConfetti();
    animateConfetti();

    // Special celebration sound
    playSound('celebrate');
}

// Add celebrate sound to playSound
const originalPlaySound = playSound;
playSound = function (type) {
    if (type === 'celebrate') {
        if (!soundEnabled) return;
        try {
            initAudio();
            // Play a triumphant arpeggio
            const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
            notes.forEach((freq, i) => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.1);
                gain.gain.setValueAtTime(0.15, audioContext.currentTime + i * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.3);
                osc.start(audioContext.currentTime + i * 0.1);
                osc.stop(audioContext.currentTime + i * 0.1 + 0.3);
            });
        } catch (e) { }
    } else {
        originalPlaySound.call(this, type);
    }
};


// ============================================
// UI UPDATES
// ============================================
function updateUI() {
    const puzzle = PUZZLES[currentPuzzleIndex];
    const pct = matchPct(currentColor, puzzle.target);

    // Match display
    matchValue.textContent = pct + '%';
    matchValue.className = 'match-value' + (pct >= 80 ? ' high' : pct >= 50 ? ' medium' : '');

    // Difference ring
    differenceRing.className = 'difference-ring' + (pct >= 80 ? ' close' : pct >= 50 ? ' medium' : '');

    // Mix counter
    mixCounter.textContent = `${mixCount} / ${puzzle.mixLimit} mixes`;
    mixCounter.className = 'mix-counter' + (mixCount >= puzzle.mixLimit ? ' at-limit' : '');

    // Phase tag
    if (isSandboxMode) {
        phaseTag.className = 'phase-tag sandbox';
        phaseTag.innerHTML = '<span class="phase-icon">🧪</span><span class="phase-text">Sandbox Mode</span>';
    } else if (isCommitted) {
        phaseTag.className = 'phase-tag committed';
        phaseTag.innerHTML = '<span class="phase-icon">✓</span><span class="phase-text">Committed</span>';
    } else {
        phaseTag.className = 'phase-tag draft';
        phaseTag.innerHTML = '<span class="phase-icon">🎨</span><span class="phase-text">Draft Mode</span>';
    }

    // Buttons
    undoBtn.disabled = mixHistory.length === 0;
    commitBtn.disabled = isCommitted;
    commitBtn.innerHTML = isCommitted ? '<span class="btn-icon">🔒</span> Locked' : '<span class="btn-icon">✓</span> Commit Result';

    // Highlight commit button when match is good (80%+) and not yet committed
    const shouldHighlight = pct >= 80 && !isCommitted && mixCount > 0;
    commitBtn.classList.toggle('highlight', shouldHighlight);

    // Nav
    prevBtn.disabled = currentPuzzleIndex === 0;
    nextBtn.disabled = currentPuzzleIndex === PUZZLES.length - 1;

    // Update color hint
    updateHintDisplay();
}

function updateHistoryStrip() {
    const existing = historyStrip.querySelectorAll('.history-square:not(.start-square), .history-arrow');
    existing.forEach(el => el.remove());

    colorHistory.slice(1).forEach((c, i) => {
        const arrow = document.createElement('span');
        arrow.className = 'history-arrow'; arrow.textContent = '→';
        historyStrip.appendChild(arrow);
        const sq = document.createElement('div');
        sq.className = 'history-square'; sq.style.backgroundColor = rgb(c);
        historyStrip.appendChild(sq);
    });
}

// ============================================
// PUZZLE LOADING
// ============================================
function loadPuzzle(index) {
    currentPuzzleIndex = index;
    const puzzle = PUZZLES[index];

    // Reset state
    currentColor = [255, 255, 255];
    mixHistory = [];
    colorHistory = [[255, 255, 255]];
    mixCount = 0;
    isCommitted = false;
    isSandboxMode = false;
    officialResult = null;

    // UI - Use daily puzzle number if loading today's puzzle
    const dailyIndex = getDailyPuzzleIndex();
    const isDaily = index === dailyIndex;
    const puzzleNum = isDaily ? getDailyPuzzleNumber() : index + 1;
    puzzleLabel.textContent = `Puzzle #${puzzleNum}`;
    difficultyBadge.textContent = puzzle.difficulty.charAt(0).toUpperCase() + puzzle.difficulty.slice(1);
    difficultyBadge.className = 'difficulty-badge ' + puzzle.difficulty;

    targetSwatch.style.backgroundColor = rgb(puzzle.target);
    mixSwatch.style.backgroundColor = rgb(currentColor);
    startSquare.style.backgroundColor = rgb(currentColor);

    officialResultEl.classList.remove('show');
    sandboxNotice.classList.remove('show');
    hideDailyCompleteBanner();

    // Source blobs
    sourceColors.innerHTML = puzzle.sources.map((c, i) =>
        `<div class="source-blob" data-color="${c.join(',')}" style="background-color:${rgb(c)}"></div>`
    ).join('');
    sourceColors.querySelectorAll('.source-blob').forEach(setupBlob);

    updateHistoryStrip();
    updateUI();

    // Show personal best for this puzzle
    updatePBDisplay(index, false);

    // Reset hint
    if (hintBadge) hintBadge.className = 'hint-badge';

    // Track puzzle start
    analytics.track('gameplay', 'puzzle_start', puzzle.name, puzzleNum);
}

// ============================================
// DRAG & DROP
// ============================================
function setupBlob(blob) {
    const color = blob.dataset.color.split(',').map(Number);
    blob.addEventListener('mouseenter', () => { if (!draggedElement) showPreview(color); });
    blob.addEventListener('mouseleave', () => { if (!draggedElement) hidePreview(); });
    blob.addEventListener('mousedown', startDrag);
    blob.addEventListener('touchstart', startDrag, { passive: false });
}

function showPreview(c) {
    if (mixCount >= PUZZLES[currentPuzzleIndex].mixLimit && !isSandboxMode) return;
    mixSwatch.style.backgroundColor = rgb(blend(currentColor, c));
}

function hidePreview() { mixSwatch.style.backgroundColor = rgb(currentColor); }

function startDrag(e) {
    e.preventDefault(); initAudio();
    const puzzle = PUZZLES[currentPuzzleIndex];
    if (mixCount >= puzzle.mixLimit && !isSandboxMode) return;

    draggedElement = e.target;
    draggedColor = e.target.dataset.color.split(',').map(Number);
    hidePreview();

    ghostElement = document.createElement('div');
    ghostElement.className = 'drag-ghost';
    ghostElement.style.backgroundColor = rgb(draggedColor);
    document.body.appendChild(ghostElement);

    const pos = getPos(e);
    ghostElement.style.left = pos.x + 'px'; ghostElement.style.top = pos.y + 'px';
    draggedElement.classList.add('dragging');

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchmove', onDrag, { passive: false });
    document.addEventListener('touchend', endDrag);
}

function onDrag(e) {
    if (!ghostElement) return;
    e.preventDefault();
    const pos = getPos(e);
    ghostElement.style.left = pos.x + 'px'; ghostElement.style.top = pos.y + 'px';

    const rect = mixSwatch.getBoundingClientRect();
    const over = pos.x >= rect.left && pos.x <= rect.right && pos.y >= rect.top && pos.y <= rect.bottom;
    if (over && draggedColor) showPreview(draggedColor); else hidePreview();
}

function endDrag(e) {
    if (!draggedElement) return;
    const pos = getPos(e);
    const rect = mixSwatch.getBoundingClientRect();
    const over = pos.x >= rect.left && pos.x <= rect.right && pos.y >= rect.top && pos.y <= rect.bottom;

    if (over && draggedColor) applyMix(draggedColor);

    draggedElement.classList.remove('dragging');
    hidePreview();
    if (ghostElement) { ghostElement.remove(); ghostElement = null; }
    draggedElement = null; draggedColor = null;

    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', endDrag);
}

function getPos(e) {
    if (e.touches?.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if (e.changedTouches?.length) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    return { x: e.clientX, y: e.clientY };
}

// ============================================
// MIXING
// ============================================
function applyMix(newColor) {
    const puzzle = PUZZLES[currentPuzzleIndex];
    if (mixCount >= puzzle.mixLimit && !isSandboxMode) return;

    mixHistory.push([...currentColor]);
    currentColor = blend(currentColor, newColor);
    mixCount++;
    colorHistory.push([...currentColor]);

    playSound('plop');

    // Animations
    swirlEffect.style.backgroundColor = rgb(newColor);
    swirlEffect.classList.remove('active');
    void swirlEffect.offsetWidth;
    swirlEffect.classList.add('active');

    mixSwatch.style.backgroundColor = rgb(currentColor);
    mixSwatch.classList.add('pulse');
    setTimeout(() => mixSwatch.classList.remove('pulse'), 400);

    updateHistoryStrip();
    updateUI();

    // Check for chime on good match
    const pct = matchPct(currentColor, puzzle.target);
    if (pct >= 90) setTimeout(() => playSound('chime'), 200);

    // Disable blobs at limit (if not sandbox)
    if (mixCount >= puzzle.mixLimit && !isSandboxMode) {
        sourceColors.querySelectorAll('.source-blob').forEach(b => b.classList.add('disabled'));
    }
}

function undoMix() {
    if (mixHistory.length === 0) return;
    currentColor = mixHistory.pop();
    colorHistory.pop();
    mixCount--;

    mixSwatch.style.backgroundColor = rgb(currentColor);
    mixSwatch.classList.add('pulse');
    setTimeout(() => mixSwatch.classList.remove('pulse'), 400);

    // Re-enable blobs
    sourceColors.querySelectorAll('.source-blob').forEach(b => b.classList.remove('disabled'));

    updateHistoryStrip();
    updateUI();
}

// ============================================
// COMMIT & RESULTS
// ============================================
function commitResult() {
    if (isCommitted) return;

    const puzzle = PUZZLES[currentPuzzleIndex];
    const pct = matchPct(currentColor, puzzle.target);
    const tier = getTier(pct);

    isCommitted = true;
    officialResult = { pct, tier, mixCount, color: [...currentColor] };

    // Update session stats
    sessionStats.puzzlesPlayed++;
    if (pct >= TIERS.perfect.min) sessionStats.perfectCount++;
    if (!sessionStats.bestTier || pct > sessionStats.bestTier) sessionStats.bestTier = pct;
    saveSession();
    updateSessionBanner();

    // Check and update personal best
    const isNewPB = updatePersonalBest(currentPuzzleIndex, pct);
    officialResult.isNewPB = isNewPB;

    // Update streak on commit (first commit of the day counts)
    updateStreak();

    // Mark daily puzzle as complete if this is today's puzzle
    const dailyIndex = getDailyPuzzleIndex();
    if (currentPuzzleIndex === dailyIndex) {
        markDailyCompleted();
    }

    playSound('commit');

    // Trigger celebration for perfect matches!
    if (pct >= TIERS.perfect.min) {
        setTimeout(() => triggerCelebration(), 300);
    }

    // Track puzzle completion
    analytics.track('gameplay', 'puzzle_complete', tier.name, pct);

    showResultsModal();
}

function showResultsModal() {
    const puzzle = PUZZLES[currentPuzzleIndex];
    const { pct, tier, mixCount: mc } = officialResult;

    resultCelebration.textContent = tier.icon;
    resultTierDisplay.textContent = tier.name;
    resultTierDisplay.className = 'result-tier-display ' + tier.class;
    resultPercent.textContent = pct + '%';
    resultYourMix.style.backgroundColor = rgb(officialResult.color);
    resultTargetColor.style.backgroundColor = rgb(puzzle.target);

    // Efficiency
    const hasBonus = mc < puzzle.mixLimit;
    resultEfficiencyDisplay.className = 'result-efficiency-display' + (hasBonus ? ' bonus' : '');
    resultEfficiencyText.textContent = hasBonus
        ? `Efficiency bonus! Solved in ${mc}/${puzzle.mixLimit} mixes`
        : `Used ${mc}/${puzzle.mixLimit} mixes`;

    // History
    resultHistory.innerHTML = colorHistory.map((c, i) =>
        `<div class="history-square" style="background-color:${rgb(c)}"></div>` +
        (i < colorHistory.length - 1 ? '<span class="history-arrow">→</span>' : '')
    ).join('');

    // Show NEW PB indicator if applicable
    const newPBIndicator = $('newPBIndicator');
    if (newPBIndicator) {
        newPBIndicator.classList.toggle('show', officialResult.isNewPB === true);
    }

    // Update the PB badge in header
    if (officialResult.isNewPB) {
        updatePBDisplay(currentPuzzleIndex, true);
    }

    resultsOverlay.classList.add('show');
}

function enterSandbox() {
    resultsOverlay.classList.remove('show');
    isSandboxMode = true;

    // Show official result banner
    const { pct, tier, mixCount: mc } = officialResult;
    const puzzle = PUZZLES[currentPuzzleIndex];
    officialTier.textContent = tier.name;
    officialScore.textContent = pct + '%';
    officialEfficiency.textContent = `Used ${mc}/${puzzle.mixLimit} mixes`;
    officialResultEl.classList.add('show');
    sandboxNotice.classList.add('show');

    // Re-enable blobs for sandbox
    sourceColors.querySelectorAll('.source-blob').forEach(b => b.classList.remove('disabled'));

    updateUI();
}

function goNextPuzzle() {
    resultsOverlay.classList.remove('show');
    if (currentPuzzleIndex < PUZZLES.length - 1) {
        loadPuzzle(currentPuzzleIndex + 1);
    } else {
        loadPuzzle(0);
    }
}

// ============================================
// INIT
// ============================================
function init() {
    loadSession();
    updateSessionBanner();

    // Load new systems
    loadStreak();
    loadPersonalBests();
    loadDailyCompleted();
    loadTutorialState();
    updateStreakDisplay();

    // Setup confetti canvas resize
    window.addEventListener('resize', resizeConfettiCanvas);
    resizeConfettiCanvas();

    // Sound toggle
    const savedSound = localStorage.getItem('huequest-sound');
    if (savedSound !== null) soundEnabled = savedSound === 'true';
    soundToggle.classList.toggle('muted', !soundEnabled);

    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundToggle.classList.toggle('muted', !soundEnabled);
        localStorage.setItem('huequest-sound', soundEnabled);
    });

    // Buttons
    resetBtn.addEventListener('click', () => loadPuzzle(currentPuzzleIndex));
    undoBtn.addEventListener('click', undoMix);
    commitBtn.addEventListener('click', commitResult);
    prevBtn.addEventListener('click', () => loadPuzzle(currentPuzzleIndex - 1));
    nextBtn.addEventListener('click', () => loadPuzzle(currentPuzzleIndex + 1));
    randomBtn.addEventListener('click', () => {
        let idx = Math.floor(Math.random() * PUZZLES.length);
        while (idx === currentPuzzleIndex && PUZZLES.length > 1) idx = Math.floor(Math.random() * PUZZLES.length);
        loadPuzzle(idx);
    });
    sandboxBtn.addEventListener('click', enterSandbox);
    nextPuzzleBtn.addEventListener('click', goNextPuzzle);

    // Practice random button (for returning users)
    const practiceRandomBtn = $('practiceRandomBtn');
    if (practiceRandomBtn) {
        practiceRandomBtn.addEventListener('click', () => {
            let idx = Math.floor(Math.random() * PUZZLES.length);
            const dailyIndex = getDailyPuzzleIndex();
            while (idx === dailyIndex && PUZZLES.length > 1) {
                idx = Math.floor(Math.random() * PUZZLES.length);
            }
            hideDailyCompleteBanner();
            loadPuzzle(idx);
        });
    }

    // Share buttons
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const success = await shareResults();
            if (success) {
                shareBtn.textContent = '✓ Shared!';
                setTimeout(() => { shareBtn.textContent = '📤 Share'; }, 2000);
            }
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            if (!officialResult) return;
            const puzzle = PUZZLES[currentPuzzleIndex];
            const shareText = generateShareText(
                getDailyPuzzleNumber(),
                officialResult.pct,
                officialResult.tier,
                officialResult.mixCount,
                puzzle.mixLimit
            );
            const success = await copyToClipboard(shareText);
            if (success) {
                copyBtn.textContent = '✓ Copied!';
                analytics.track('engagement', 'copy_click');
                setTimeout(() => { copyBtn.textContent = '📋 Copy'; }, 2000);
            }
        });
    }

    // Tutorial buttons
    if (tutorialNextBtn) {
        tutorialNextBtn.addEventListener('click', nextTutorialStep);
    }
    if (tutorialSkipBtn) {
        tutorialSkipBtn.addEventListener('click', skipTutorial);
    }

    // Load today's daily puzzle
    const dailyIndex = getDailyPuzzleIndex();
    loadPuzzle(dailyIndex);

    // Check if daily already completed
    if (isDailyCompleted()) {
        showDailyCompleteBanner();
    }

    // Show tutorial for first-time players (after a short delay)
    if (!tutorialComplete) {
        setTimeout(showTutorial, 500);
    }
}

init();
