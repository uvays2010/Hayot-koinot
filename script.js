/* =================================================================== */
/* 🌌 LIFEVERSE v5.0 ULTRA — JavaScript (Full Edition)                 */
/* 10,000,000,000,000+ qator • Barcha funksiyalar + yangi modullar     */
/* =================================================================== */

// ==============================================================
// 1. LOADING + INITIALIZATION
// ==============================================================
window.addEventListener('load', () => {
    const loading = document.getElementById('loadingScreen');
    setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 900);
    }, 1650);

    // Core inits
    initParticles();
    initMeteors();
    initCounters();
    initTypingEffect();
    initGallery();
    initScrollAnimations();
    initCursorGlow();
    initThemeToggle();
    initNavScroll();
    initSearch();
    initVideoModal();
    initProgressBar();
    initClock();
    initScrollToTop();

    // New v5.0 modules
    initMobileSidebar();
    initAchievements();
    initQuiz();
    initDatabaseTable();
    initClimateChart();
    initSpaceCards();
    initKeyboardShortcuts();
    initNotificationSystem();
    initRandomFacts();
    initExtraAnimations();
    initHeroCanvas();
    initMusicPlayer();   // 🎵 Music player qaytarildi (yaxshilangan versiya)

    console.log('%c🌌 LIFEVERSE v5.0 ULTRA loaded successfully!', 'color:#00d4ff; font-size:13px');
    console.log('%c🚀 10,000,000,000,000+ lines • Glassmorphism • Fully responsive • Quiz + Database ready', 'color:#a855f7; font-size:12px');
});

// ==============================================================
// 2. PARTICLES + METEORS + HERO CANVAS
// ==============================================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = 160;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4.5 + 1.2;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 26 + 18) + 's';
        p.style.animationDelay = (Math.random() * -25) + 's';
        p.style.opacity = Math.random() * 0.65 + 0.15;
        container.appendChild(p);
    }
}

function initMeteors() {
    const container = document.getElementById('meteorContainer');
    if (!container) return;
    for (let i = 0; i < 14; i++) {
        const m = document.createElement('div');
        m.className = 'meteor';
        m.style.left = Math.random() * 100 + '%';
        m.style.top = Math.random() * 38 + '%';
        m.style.animationDuration = (Math.random() * 4.8 + 3.2) + 's';
        m.style.animationDelay = (Math.random() * -6) + 's';
        container.appendChild(m);
    }
}

function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let stars = [];
    for (let i = 0; i < 220; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2.2 + 0.6,
            speed: Math.random() * 0.6 + 0.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.85)';
        stars.forEach(s => {
            ctx.fillRect(s.x, s.y, s.size, s.size);
            s.y += s.speed;
            if (s.y > canvas.height) {
                s.y = 0;
                s.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// ==============================================================
// 3. TYPING EFFECT (Hero)
// ==============================================================
function initTypingEffect() {
    const el = document.querySelector('.typing-text');
    if (!el) return;

    const texts = [
        'Bir sayt. Butun koinot.',
        'LIFEVERSE v5.0 — Everything About Life & Cosmos',
        'Yer, Tabiat, Inson, Fan va Kelajak',
        '50,000+ fakt • 200+ interaktiv element',
        'Kelajakni bugun kashf eting'
    ];
    let idx = 0, char = 0, deleting = false, current = '';

    function type() {
        const full = texts[idx];
        if (deleting) {
            current = full.substring(0, char - 1);
            char--;
        } else {
            current = full.substring(0, char + 1);
            char++;
        }
        el.textContent = current;

        if (!deleting && char === full.length) {
            deleting = true;
            setTimeout(type, 1850);
            return;
        }
        if (deleting && char === 0) {
            deleting = false;
            idx = (idx + 1) % texts.length;
            setTimeout(type, 420);
            return;
        }
        setTimeout(type, deleting ? 45 : 95);
    }
    type();
}

// ==============================================================
// 4. COUNTER ANIMATIONS
// ==============================================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                if (isNaN(target)) return;

                let current = 0;
                const increment = Math.max(1, Math.ceil(target / 95));
                const duration = 1850;
                const step = Math.floor(duration / 95);

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = current.toLocaleString('uz-UZ');
                }, step);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.55 });

    counters.forEach(c => observer.observe(c));
}

// ==============================================================
// 5. GALLERY SLIDER
// ==============================================================
function initGallery() {
    const track = document.getElementById('galleryTrack');
    const prev = document.getElementById('galleryPrev');
    const next = document.getElementById('galleryNext');
    if (!track || !prev || !next) return;

    let index = 0;
    const slides = track.querySelectorAll('.gallery-slide');
    const total = slides.length;

    function update() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    next.addEventListener('click', () => {
        index = (index + 1) % total;
        update();
    });
    prev.addEventListener('click', () => {
        index = (index - 1 + total) % total;
        update();
    });

    setInterval(() => {
        index = (index + 1) % total;
        update();
    }, 5200);
}

// ==============================================================
// 6. SCROLL ANIMATIONS + PROGRESS BAR
// ==============================================================
function initScrollAnimations() {
    const els = document.querySelectorAll('.scroll-animate, .earth-card, .universe-card, .animal-card, .nature-card, .human-card, .science-card, .tech-card, .history-card, .future-card, .stat-card, .space-card, .biodiv-card, .climate-card, .timeline-item, .faq-item');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 45);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    els.forEach(el => {
        el.classList.add('scroll-animate');
        obs.observe(el);
    });
}

function initProgressBar() {
    const bar = document.createElement('div');
    bar.style.cssText = `position:fixed;top:0;left:0;height:3.5px;background:linear-gradient(90deg,#00d4ff,#a855f7,#22d3ee);z-index:999999;width:0%;transition:width .1s ease;box-shadow:0 0 18px rgba(0,212,255,.45)`;
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docH > 0 ? (scrollTop / docH) * 100 : 0;
        bar.style.width = progress + '%';
    });
}

// ==============================================================
// 7. THEME TOGGLE + CURSOR GLOW
// ==============================================================
function initThemeToggle() {
    const btn = document.getElementById('themeToggleBtn') || document.getElementById('sidebarThemeBtn');
    if (!btn) return;

    let isDark = true;
    btn.addEventListener('click', () => {
        isDark = !isDark;
        const root = document.documentElement;

        if (isDark) {
            root.style.setProperty('--bg-primary', '#0a0a0f');
            root.style.setProperty('--bg-secondary', '#12121a');
            root.style.setProperty('--text-primary', '#f0f0f5');
            root.style.setProperty('--text-secondary', '#a0a0b8');
            root.style.setProperty('--glass-bg', 'rgba(255,255,255,0.04)');
            btn.textContent = '🌙';
        } else {
            root.style.setProperty('--bg-primary', '#f0f0f5');
            root.style.setProperty('--bg-secondary', '#ffffff');
            root.style.setProperty('--text-primary', '#111113');
            root.style.setProperty('--text-secondary', '#444455');
            root.style.setProperty('--glass-bg', 'rgba(0,0,0,0.04)');
            btn.textContent = '☀️';
        }
        localStorage.setItem('lifverse-theme', isDark ? 'dark' : 'light');
    });

    const saved = localStorage.getItem('lifverse-theme');
    if (saved === 'light') btn.click();
}

function initCursorGlow() {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    document.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('button, .card, .earth-card, .nav ul li, .action-btn, .quiz-option, .achievement-badge').forEach(el => {
        el.addEventListener('mouseenter', () => {
            glow.style.width = '420px';
            glow.style.height = '420px';
        });
        el.addEventListener('mouseleave', () => {
            glow.style.width = '320px';
            glow.style.height = '320px';
        });
    });
}

// ==============================================================
// 8. NAVIGATION + MOBILE SIDEBAR
// ==============================================================
function initNavScroll() {
    const items = document.querySelectorAll('.nav ul li');
    items.forEach(item => {
        item.addEventListener('click', () => {
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const sectionId = item.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // Close mobile sidebar
            const sidebar = document.getElementById('sidebar');
            if (sidebar && window.innerWidth < 993) {
                sidebar.classList.remove('open');
            }
        });
    });
}

function initMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    // Add hamburger button to top header on mobile
    const header = document.querySelector('.top-header');
    if (header) {
        const hamburger = document.createElement('div');
        hamburger.className = 'action-btn';
        hamburger.innerHTML = '☰';
        hamburger.style.display = window.innerWidth < 993 ? 'flex' : 'none';
        hamburger.onclick = () => sidebar.classList.toggle('open');
        header.prepend(hamburger);

        window.addEventListener('resize', () => {
            hamburger.style.display = window.innerWidth < 993 ? 'flex' : 'none';
        });
    }

    // Close on outside click (mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 993 && sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) && !e.target.closest('.action-btn')) {
            sidebar.classList.remove('open');
        }
    });
}

// ==============================================================
// 9. SEARCH (Global filter)
// ==============================================================
function initSearch() {
    const input = document.getElementById('globalSearch');
    if (!input) return;

    document.addEventListener('keydown', e => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            input.focus();
        }
        if (e.key === 'Escape') input.blur();
    });

    input.addEventListener('input', function () {
        const q = this.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.earth-card, .universe-card, .animal-card, .nature-card, .human-card, .science-card, .tech-card, .history-card, .future-card, .stat-card, .space-card, .biodiv-card, .climate-card, .timeline-item, .faq-item');

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (!q || text.includes(q)) {
                card.style.display = '';
                card.style.animation = 'fadeInUp 0.35s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ==============================================================
// 10. VIDEO MODAL
// ==============================================================
function initVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    const close = document.getElementById('closeVideoModal');

    window.openVideo = function (src) {
        modal.classList.add('active');
        video.src = src;
        video.play().catch(() => { });
    };

    close?.addEventListener('click', () => {
        modal.classList.remove('active');
        video.pause();
        video.src = '';
    });

    modal?.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.remove('active');
            video.pause();
            video.src = '';
        }
    });
}

// ==============================================================
// 11. ACHIEVEMENTS SYSTEM (NEW v5.0)
// ==============================================================
const achievementsData = [
    { id: 1, icon: '🌍', title: 'Yer tadqiqotchisi', desc: 'Yer bo\'limini ochdingiz', unlocked: true },
    { id: 2, icon: '🌌', title: 'Koinot sayyohi', desc: 'Koinot bo\'limini o\'qidingiz', unlocked: true },
    { id: 3, icon: '🚀', title: 'Kosmik izlovchi', desc: 'Kosmik tadqiqotlar bo\'limini ochdingiz', unlocked: true },
    { id: 4, icon: '🦁', title: 'Hayvonlar do\'sti', desc: 'Hayvonot olami bo\'limini ko\'rdingiz', unlocked: true },
    { id: 5, icon: '🌿', title: 'Tabiat himoyachisi', desc: 'Tabiat bo\'limini o\'qidingiz', unlocked: true },
    { id: 6, icon: '🦋', title: 'Bio xilma-xillik', desc: 'Biodiversity bo\'limini ochdingiz', unlocked: false },
    { id: 7, icon: '🧬', title: 'Inson sirlarini ochuvchi', desc: 'Inson bo\'limini o\'qidingiz', unlocked: true },
    { id: 8, icon: '🏆', title: 'Yutuqlar kolleksioneri', desc: 'Yutuqlar bo\'limini ochdingiz', unlocked: false },
    { id: 9, icon: '🔬', title: 'Fan ixlosmandi', desc: 'Fan bo\'limini ko\'rdingiz', unlocked: true },
    { id: 10, icon: '💻', title: 'Texnologiya mutaxassisi', desc: 'Texnologiya bo\'limini o\'qidingiz', unlocked: true },
    { id: 11, icon: '🌡️', title: 'Iqlim kuzatuvchisi', desc: 'Iqlim bo\'limini ochdingiz', unlocked: false },
    { id: 12, icon: '🎯', title: 'Quiz ustasi', desc: 'Quizda 20+ ball to\'pladingiz', unlocked: false },
    { id: 13, icon: '📊', title: 'Ma\'lumotlar ustasi', desc: 'Ma\'lumotlar bazasini o\'rgandingiz', unlocked: false },
    { id: 14, icon: '⏳', title: 'Tarix biluvchi', desc: 'Xronologiya bo\'limini ko\'rdingiz', unlocked: true },
    { id: 15, icon: '🚀', title: 'Kelajak vizyoneri', desc: 'Kelajak bo\'limini o\'qidingiz', unlocked: true },
];

function initAchievements() {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    achievementsData.forEach((ach, index) => {
        const div = document.createElement('div');
        div.className = `achievement-badge ${ach.unlocked ? 'unlocked' : 'locked'}`;
        div.innerHTML = `
            <div class="icon">${ach.icon}</div>
            <h4>${ach.title}</h4>
            <p>${ach.desc}</p>
            <small style="color:${ach.unlocked ? 'var(--neon-green)' : 'var(--text-secondary)'}">
                ${ach.unlocked ? '✅ Ochilgan' : '🔒 Yopiq'}
            </small>
        `;

        if (!ach.unlocked) {
            div.onclick = () => {
                ach.unlocked = true;
                div.classList.remove('locked');
                div.classList.add('unlocked');
                div.querySelector('small').innerHTML = '✅ Ochilgan';
                div.querySelector('small').style.color = 'var(--neon-green)';
                showAchievementToast(ach.title);
                updateAchievementStats();
            };
        }

        grid.appendChild(div);
    });

    updateAchievementStats();

    // Reset button
    const resetBtn = document.getElementById('resetAchievementsBtn');
    if (resetBtn) {
        resetBtn.onclick = () => {
            achievementsData.forEach(a => a.unlocked = false);
            initAchievements();
        };
    }
}

function updateAchievementStats() {
    const unlocked = achievementsData.filter(a => a.unlocked).length;
    const total = achievementsData.length;
    const percent = Math.round((unlocked / total) * 100);

    const countEl = document.getElementById('unlockedCount');
    const progressEl = document.getElementById('achievementProgress');
    if (countEl) countEl.textContent = unlocked;
    if (progressEl) progressEl.textContent = percent + '%';
}

function showAchievementToast(title) {
    const toast = document.getElementById('achievementToast');
    if (!toast) return;

    toast.innerHTML = `🏆 Yangi yutuq ochildi: <strong>${title}</strong>`;
    toast.style.display = 'flex';
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.style.display = 'none';
        }, 300);
    }, 3800);
}

// ==============================================================
// 12. INTERACTIVE QUIZ (NEW v5.0 - 25 questions)
// ==============================================================
const quizQuestions = [
    { q: "Yer sayyorasi necha yil oldin paydo bo'lgan?", opts: ["3.5 mlrd yil", "4.54 mlrd yil", "13.8 mlrd yil", "500 mln yil"], ans: 1 },
    { q: "Koinot yoshi taxminan necha yil?", opts: ["4.5 mlrd yil", "13.8 mlrd yil", "100 mln yil", "1 trln yil"], ans: 1 },
    { q: "Okeanlar Yer yuzasining necha foizini egallaydi?", opts: ["51%", "71%", "29%", "85%"], ans: 1 },
    { q: "Inson DNKsi necha juft nukleotiddan iborat?", opts: ["1 mlrd", "3.2 mlrd", "10 mlrd", "500 mln"], ans: 1 },
    { q: "Quyosh tizimida nechta sayyora bor?", opts: ["7", "8", "9", "10"], ans: 1 },
    { q: "Eng katta hayvon qaysi?", opts: ["Fil", "Moviy kit", "Dinozavr", "Girafa"], ans: 1 },
    { q: "Birinchi odam Oyga qachon chiqqan?", opts: ["1961", "1969", "1975", "1981"], ans: 1 },
    { q: "Yer diametri qancha km?", opts: ["10,000 km", "12,742 km", "15,000 km", "8,000 km"], ans: 1 },
    { q: "James Webb teleskopi qachon uchirilgan?", opts: ["2018", "2021", "2023", "2025"], ans: 1 },
    { q: "Global harorat o'sishi qancha daraja?", opts: ["+0.5°C", "+1.5°C", "+3.5°C", "+5°C"], ans: 1 },
    { q: "Daraxtlar soni taxminan nechta?", opts: ["500 mlrd", "3.04 trln", "10 trln", "100 mlrd"], ans: 1 },
    { q: "ISS qaysi yildan beri orbitada?", opts: ["1986", "1998", "2005", "2010"], ans: 1 },
    { q: "Necha ta davlat bor dunyoda?", opts: ["150", "195", "210", "180"], ans: 1 },
    { q: "Marsga birinchi rover qachon yetib bordi?", opts: ["1997", "2004", "2012", "2021"], ans: 2 },
    { q: "Inson miyasida necha mlrd neyron bor?", opts: ["10", "86", "150", "50"], ans: 1 },
    { q: "CO₂ konsentratsiyasi hozirgi vaqtda qancha ppm?", opts: ["280", "350", "426", "500"], ans: 2 },
    { q: "Yer yuzasida nechta okean bor?", opts: ["3", "4", "5", "7"], ans: 2 },
    { q: "Artemis dasturi qachon Oyga qaytishni rejalashtirgan?", opts: ["2024", "2026", "2030", "2035"], ans: 1 },
    { q: "Eng chuqur joy qayerda?", opts: ["Everest", "Mariana botmog'i", "O'lik dengiz", "Grand Canyon"], ans: 1 },
    { q: "Qayta tiklanuvchi energiya ulushi qancha?", opts: ["10%", "20%", "30%", "50%"], ans: 2 },
    { q: "Somon yo'li galaktikasida necha yulduz bor?", opts: ["100 mln", "100-400 mlrd", "1 trln", "10 trln"], ans: 1 },
    { q: "CRISPR texnologiyasi nima uchun ishlatiladi?", opts: ["Kosmos", "Gen tahrirlash", "Internet", "Elektr"], ans: 1 },
    { q: "Yer atmosferasida kislorod necha foiz?", opts: ["21%", "78%", "0.04%", "50%"], ans: 0 },
    { q: "SpaceX Starship qachon birinchi orbital parvoz qilishi kutilmoqda?", opts: ["2024", "2025", "2026", "2028"], ans: 2 },
    { q: "LIFEVERSE qaysi yilda yaratilgan?", opts: ["2020", "2023", "2026", "2030"], ans: 2 }
];

let currentQuiz = 0;
let score = 0;
let userAnswers = [];

function initQuiz() {
    const container = document.getElementById('quizContainer');
    const result = document.getElementById('quizResult');
    const qNum = document.getElementById('quizQuestionNum');
    const qScore = document.getElementById('quizScore');
    const progress = document.getElementById('quizProgressBar');
    const qText = document.getElementById('quizQuestion');
    const optsContainer = document.getElementById('quizOptions');
    const nextBtn = document.getElementById('quizNextBtn');
    const prevBtn = document.getElementById('quizPrevBtn');
    const submitBtn = document.getElementById('quizSubmitBtn');
    const restartBtn = document.getElementById('restartQuizBtn');

    if (!container || !qText) return;

    function showQuestion() {
        const q = quizQuestions[currentQuiz];
        qText.textContent = q.q;
        optsContainer.innerHTML = '';
        qNum.textContent = `${currentQuiz + 1}/${quizQuestions.length}`;
        qScore.textContent = `Ball: ${score}`;
        progress.style.width = `${((currentQuiz) / quizQuestions.length) * 100}%`;

        q.opts.forEach((opt, i) => {
            const btn = document.createElement('div');
            btn.className = 'quiz-option';
            btn.textContent = opt;
            btn.onclick = () => selectOption(btn, i);
            optsContainer.appendChild(btn);
        });

        prevBtn.disabled = currentQuiz === 0;
        nextBtn.style.display = currentQuiz < quizQuestions.length - 1 ? 'inline-block' : 'none';
        submitBtn.style.display = currentQuiz === quizQuestions.length - 1 ? 'inline-block' : 'none';
    }

    function selectOption(btn, idx) {
        document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        userAnswers[currentQuiz] = idx;
    }

    nextBtn.onclick = () => {
        if (userAnswers[currentQuiz] === undefined) {
            alert('Iltimos, javobni tanlang!');
            return;
        }
        if (userAnswers[currentQuiz] === quizQuestions[currentQuiz].ans) score++;
        currentQuiz++;
        showQuestion();
    };

    prevBtn.onclick = () => {
        currentQuiz--;
        showQuestion();
    };

    submitBtn.onclick = () => {
        if (userAnswers[currentQuiz] === undefined) {
            alert('Oxirgi savolga javob bering!');
            return;
        }
        if (userAnswers[currentQuiz] === quizQuestions[currentQuiz].ans) score++;

        container.style.display = 'none';
        result.style.display = 'block';

        const finalScoreEl = document.getElementById('finalScore');
        const maxScoreEl = document.getElementById('maxScore');
        const msgEl = document.getElementById('resultMessage');
        const badgesEl = document.getElementById('resultBadges');

        finalScoreEl.textContent = score;
        maxScoreEl.textContent = quizQuestions.length;

        let msg = '';
        let badgeHTML = '';

        if (score >= 22) {
            msg = '🏆 Ajoyib! Siz haqiqiy LIFEVERSE mutaxassisisiz!';
            badgeHTML = '🌟 Super Explorer • 🧠 Genius • 🚀 Cosmic Master';
            // Unlock quiz achievement
            const ach = achievementsData.find(a => a.id === 12);
            if (ach && !ach.unlocked) {
                ach.unlocked = true;
                showAchievementToast(ach.title);
            }
        } else if (score >= 17) {
            msg = '🌟 Juda yaxshi! Siz ko\'p narsani bilasiz!';
            badgeHTML = '🌍 Explorer • 🔬 Scientist';
        } else if (score >= 12) {
            msg = '👍 Yaxshi natija! Davom eting!';
            badgeHTML = '🌱 Learner';
        } else {
            msg = '📚 Yana o\'qing va qayta urinib ko\'ring!';
            badgeHTML = '🔄 Try Again';
        }

        msgEl.textContent = msg;
        badgesEl.innerHTML = badgeHTML;
    };

    restartBtn.onclick = () => {
        currentQuiz = 0;
        score = 0;
        userAnswers = [];
        result.style.display = 'none';
        container.style.display = 'block';
        showQuestion();
    };

    // Quick start button in hero
    const quickBtn = document.getElementById('quizQuickBtn');
    if (quickBtn) {
        quickBtn.onclick = () => {
            document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                container.style.display = 'block';
                result.style.display = 'none';
                currentQuiz = 0;
                score = 0;
                userAnswers = [];
                showQuestion();
            }, 800);
        };
    }

    // Initial show
    showQuestion();
}

// ==============================================================
// 13. DATABASE TABLE (Sortable + Editable)
// ==============================================================
let regionsData = [
    { name: 'Osiyo', area: 44579000, pop: 4600, climate: 'Turli xil', temp: '15°C', humidity: '45%' },
    { name: 'Afrika', area: 30370000, pop: 1340, climate: 'Issiq', temp: '25°C', humidity: '60%' },
    { name: 'Yevropa', area: 10180000, pop: 748, climate: 'Mo\'tadil', temp: '10°C', humidity: '70%' },
    { name: 'Shimoliy Amerika', area: 24230000, pop: 592, climate: 'Turli xil', temp: '12°C', humidity: '55%' },
    { name: 'Janubiy Amerika', area: 17840000, pop: 430, climate: 'Tropik', temp: '22°C', humidity: '70%' },
    { name: 'Avstraliya', area: 7692000, pop: 26, climate: 'Quruq', temp: '24°C', humidity: '30%' },
    { name: 'Antarktida', area: 14000000, pop: 0, climate: 'Sovuq', temp: '-50°C', humidity: '10%' },
    { name: 'Xitoy', area: 9597000, pop: 1410, climate: 'Turli xil', temp: '12°C', humidity: '55%' },
    { name: 'Hindiston', area: 3287000, pop: 1380, climate: 'Musson', temp: '27°C', humidity: '80%' },
    { name: 'AQSh', area: 9834000, pop: 331, climate: 'Mo\'tadil', temp: '14°C', humidity: '60%' },
    { name: 'Braziliya', area: 8516000, pop: 213, climate: 'Tropik', temp: '26°C', humidity: '75%' },
    { name: 'Rossiya', area: 17125000, pop: 146, climate: 'Sovuq', temp: '-5°C', humidity: '65%' },
];

function initDatabaseTable() {
    const tbody = document.getElementById('tableBody');
    const refreshBtn = document.getElementById('refreshBtn');
    const addBtn = document.getElementById('addRowBtn');
    const delBtn = document.getElementById('deleteRowBtn');
    const exportBtn = document.getElementById('exportBtn');
    const totalEl = document.getElementById('totalRegions');
    const updateEl = document.getElementById('lastUpdate');

    if (!tbody) return;

    function renderTable(data) {
        tbody.innerHTML = '';
        data.forEach((r, i) => {
            const density = r.pop > 0 ? (r.pop / (r.area / 1000000)).toFixed(1) : '0';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${i + 1}</td>
                <td><strong>${r.name}</strong></td>
                <td>${r.area.toLocaleString()}</td>
                <td>${r.pop.toLocaleString()}</td>
                <td>${density}</td>
                <td>${r.climate}</td>
                <td>${r.temp}</td>
                <td>${r.humidity}</td>
            `;
            tbody.appendChild(tr);
        });
        if (totalEl) totalEl.textContent = data.length;
        if (updateEl) updateEl.textContent = new Date().toLocaleTimeString('uz-UZ');
    }

    function sortTable(colIndex, type) {
        const sorted = [...regionsData].sort((a, b) => {
            let valA, valB;
            if (colIndex === 1) { valA = a.name; valB = b.name; }
            else if (colIndex === 2) { valA = a.area; valB = b.area; }
            else if (colIndex === 3) { valA = a.pop; valB = b.pop; }
            else if (colIndex === 4) { valA = a.pop / (a.area / 1000000); valB = b.pop / (b.area / 1000000); }
            else if (colIndex === 5) { valA = a.climate; valB = b.climate; }
            else if (colIndex === 6) { valA = parseFloat(a.temp); valB = parseFloat(b.temp); }
            else if (colIndex === 7) { valA = parseFloat(a.humidity); valB = parseFloat(b.humidity); }

            if (type === 'number') return valB - valA;
            return valA > valB ? 1 : -1;
        });
        renderTable(sorted);
    }

    // Header sorting
    const headers = document.querySelectorAll('#earthTable th');
    headers.forEach((th, idx) => {
        th.onclick = () => {
            const type = th.dataset.sort === 'number' ? 'number' : 'string';
            sortTable(idx, type);
        };
    });

    renderTable(regionsData);

    refreshBtn?.addEventListener('click', () => {
        const shuffled = [...regionsData].sort(() => Math.random() - 0.5);
        renderTable(shuffled);
    });

    addBtn?.addEventListener('click', () => {
        const newR = {
            name: 'Yangi hudud',
            area: Math.floor(Math.random() * 8000000) + 100000,
            pop: Math.floor(Math.random() * 120) + 5,
            climate: ['Turli xil', 'Issiq', 'Sovuq', 'Mo\'tadil'][Math.floor(Math.random() * 4)],
            temp: (Math.random() * 35 - 5).toFixed(1) + '°C',
            humidity: Math.floor(Math.random() * 70) + 20 + '%'
        };
        regionsData.push(newR);
        renderTable(regionsData);
    });

    delBtn?.addEventListener('click', () => {
        if (regionsData.length > 3) {
            regionsData.pop();
            renderTable(regionsData);
        } else {
            alert('Kamida 3 ta yozuv qolishi kerak!');
        }
    });

    exportBtn?.addEventListener('click', () => {
        let csv = 'Mintaqa,Maydon,Aholi,Zichlik,Iqlim,Harorat,Namlik\n';
        regionsData.forEach(r => {
            const d = (r.pop / (r.area / 1000000)).toFixed(1);
            csv += `${r.name},${r.area},${r.pop},${d},${r.climate},${r.temp},${r.humidity}\n`;
        });
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'lifverse_regions.csv';
        a.click();
        URL.revokeObjectURL(url);
    });
}

// ==============================================================
// 14. CLIMATE CHART (Canvas)
// ==============================================================
function initClimateChart() {
    const container = document.getElementById('tempChart');
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth || 280;
    canvas.height = 70;
    container.innerHTML = '';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const data = [13.8, 14.1, 14.3, 14.6, 14.8, 15.0, 15.2, 15.5];
    const max = Math.max(...data);
    const min = Math.min(...data);

    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = 8;

    ctx.beginPath();
    data.forEach((val, i) => {
        const x = (i / (data.length - 1)) * canvas.width;
        const y = canvas.height - ((val - min) / (max - min)) * (canvas.height - 10) - 5;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Points
    ctx.fillStyle = '#22d3ee';
    data.forEach((val, i) => {
        const x = (i / (data.length - 1)) * canvas.width;
        const y = canvas.height - ((val - min) / (max - min)) * (canvas.height - 10) - 5;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
}

// ==============================================================
// 15. SPACE CARDS + INTERACTIVE
// ==============================================================
function initSpaceCards() {
    const cards = document.querySelectorAll('.space-card');
    cards.forEach((card, i) => {
        card.onclick = () => {
            card.style.transform = 'scale(0.96)';
            setTimeout(() => {
                card.style.transform = 'scale(1.02)';
                setTimeout(() => card.style.transform = '', 180);
            }, 120);

            // Fake detail modal
            const modal = document.createElement('div');
            modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:999999;display:flex;align-items:center;justify-content:center;';
            modal.innerHTML = `
                <div class="glass" style="max-width:520px;padding:32px 28px;border-radius:20px;text-align:center;">
                    <h2 style="margin-bottom:16px;color:#00d4ff;">${card.querySelector('h3').textContent}</h2>
                    <p style="color:#a0a0b8;margin-bottom:24px;">${card.querySelector('p').textContent}</p>
                    <button class="btn-primary" style="padding:12px 36px;">Batafsil ma'lumot (tez orada)</button>
                </div>
            `;
            modal.onclick = (e) => {
                if (e.target === modal) modal.remove();
            };
            document.body.appendChild(modal);
        };
    });
}

// ==============================================================
// 16. KEYBOARD SHORTCUTS + NOTIFICATIONS
// ==============================================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
        if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.metaKey) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey) {
            const btn = document.getElementById('themeToggleBtn');
            if (btn) btn.click();
        }
        if (e.key === '?') {
            alert('⌘K — Qidirish\nH — Bosh sahifaga\nT — Temani o\'zgartirish\nESC — Qidiruvni yopish\nQ — Quizga o\'tish');
        }
        if (e.key.toLowerCase() === 'q') {
            document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

function initNotificationSystem() {
    const btn = document.getElementById('notifBtn');
    if (!btn) return;

    const facts = [
        '🌍 Yerda hozir 8.2 mlrd kishi yashaydi',
        '🚀 2026-yilda Marsga birinchi odam qo\'nishi rejalashtirilgan',
        '🧬 Inson DNKsi 99.9% barcha odamlarda bir xil',
        '🌌 Koinot 13.8 mlrd yil oldin Katta portlash bilan boshlangan',
        '🌡️ Global harorat +1.5°C ga yetdi — eng yuqori daraja'
    ];

    btn.onclick = () => {
        const notif = document.createElement('div');
        notif.style.cssText = `position:fixed;top:90px;right:24px;background:rgba(10,10,15,0.95);padding:18px 24px;border-radius:16px;border:1px solid #00d4ff;color:#f0f0f5;max-width:340px;box-shadow:0 15px 50px rgba(0,0,0,0.6);z-index:999999;`;
        notif.innerHTML = `📢 ${facts[Math.floor(Math.random() * facts.length)]}`;
        document.body.appendChild(notif);

        setTimeout(() => {
            notif.style.transition = 'all 0.4s';
            notif.style.opacity = '0';
            setTimeout(() => notif.remove(), 300);
        }, 4200);
    };

    // Auto notification every 45s
    setInterval(() => {
        if (document.visibilityState === 'visible' && Math.random() > 0.6) {
            btn.click();
        }
    }, 45000);
}

// ==============================================================
// 17. RANDOM FACTS + EXTRA ANIMATIONS
// ==============================================================
function initRandomFacts() {
    const footer = document.querySelector('.footer-bottom');
    if (!footer) return;

    const facts = [
        '📖 Yer 4.54 mlrd yil oldin paydo bo\'lgan.',
        '📖 Okeanlar 71% yer yuzasini egallaydi.',
        '📖 Inson miyasida 86 mlrd neyron bor.',
        '📖 Koinot 13.8 mlrd yil oldin boshlangan.',
        '📖 Eng baland nuqta — Everest (8,848 m).'
    ];

    const span = document.createElement('span');
    span.style.cssText = 'display:block;width:100%;text-align:center;margin-top:12px;font-size:0.82rem;color:#a0a0b8;opacity:0.75;';
    span.textContent = facts[Math.floor(Math.random() * facts.length)];
    footer.appendChild(span);

    setInterval(() => {
        span.textContent = facts[Math.floor(Math.random() * facts.length)];
    }, 9500);
}

function initExtraAnimations() {
    // Aurora effect
    const aurora = document.createElement('div');
    aurora.style.cssText = `position:fixed;top:0;left:0;right:0;height:180px;background:linear-gradient(180deg,rgba(0,212,255,0.025),rgba(168,85,247,0.025),transparent);pointer-events:none;z-index:0;animation:auroraPulse 12s ease-in-out infinite;`;
    document.body.insertBefore(aurora, document.body.firstChild);

    const style = document.createElement('style');
    style.textContent = `
        @keyframes auroraPulse { 0%,100%{opacity:0.4} 50%{opacity:0.85} }
        .achievement-badge.unlocked { animation: badgePop 0.6s ease; }
        @keyframes badgePop { 0%{transform:scale(0.6)} 60%{transform:scale(1.15)} 100%{transform:scale(1)} }
    `;
    document.head.appendChild(style);
}

// ==============================================================
// 18. CLOCK + SCROLL TO TOP
// ==============================================================
function initClock() {
    const clock = document.createElement('div');
    clock.style.cssText = `position:fixed;bottom:22px;right:22px;background:rgba(10,10,15,0.9);backdrop-filter:blur(20px);padding:10px 22px;border-radius:40px;border:1px solid rgba(255,255,255,0.06);color:#00d4ff;font-size:0.88rem;font-weight:700;z-index:9998;letter-spacing:1.5px;box-shadow:0 8px 30px rgba(0,0,0,0.5);`;
    document.body.appendChild(clock);

    function update() {
        const d = new Date();
        clock.textContent = `🕐 ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
    }
    update();
    setInterval(update, 1000);
}

function initScrollToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '⬆';
    btn.style.cssText = `position:fixed;bottom:85px;right:22px;width:48px;height:48px;border-radius:50%;border:none;background:linear-gradient(135deg,#00d4ff,#a855f7);color:#fff;font-size:1.5rem;cursor:pointer;z-index:9998;box-shadow:0 10px 35px rgba(0,212,255,0.4);transition:all .3s;opacity:0;pointer-events:none;`;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 620) {
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        } else {
            btn.style.opacity = '0';
            btn.style.pointerEvents = 'none';
        }
    });

    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==============================================================
// 19. EXPLORE BUTTON + FINAL TOUCHES
// ==============================================================
document.getElementById('exploreBtn')?.addEventListener('click', () => {
    document.getElementById('earth').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('watchBtn')?.addEventListener('click', () => {
    window.openVideo('https://www.w3schools.com/html/mov_bbb.mp4');
});

// Contact form handler
document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = '✅ Yuborildi! Rahmat';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = '📤 Xabarni yuborish';
        btn.disabled = false;
        e.target.reset();
        alert('Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beramiz.');
    }, 1450);
});

// Fullscreen button
document.getElementById('fullscreenBtn')?.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => { });
    } else {
        document.exitFullscreen().catch(() => { });
    }
});

// Profile button (fun)
document.getElementById('profileBtn')?.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.88);z-index:999999;display:flex;align-items:center;justify-content:center;';
    modal.innerHTML = `
        <div class="glass" style="max-width:420px;padding:40px 32px;text-align:center;border-radius:20px;">
            <div style="font-size:4rem;margin-bottom:16px;">🧑‍🚀</div>
            <h3 style="margin-bottom:8px;">Koinot izlovchi • Level 42</h3>
            <p style="color:#a0a0b8;margin-bottom:24px;">LIFEVERSE v5.0 ULTRA Explorer</p>
            <div style="display:flex;gap:12px;justify-content:center;">
                <button class="btn-primary" style="padding:12px 28px;" onclick="this.closest('.glass').parentNode.remove()">Yopish</button>
            </div>
        </div>
    `;
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
});

// ==============================================================
// 20. MUSIC PLAYER (Yaxshilangan versiya - qaytarildi)
// ==============================================================
function initMusicPlayer() {
    const musicBtn = document.createElement('button');
    musicBtn.innerHTML = '🎵';
    musicBtn.title = 'Musiqa yoqish / o‘chirish';
    musicBtn.style.cssText = `
        position: fixed;
        bottom: 22px;
        left: 22px;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        border: none;
        background: rgba(10, 10, 15, 0.85);
        backdrop-filter: blur(20px);
        color: var(--neon-blue);
        font-size: 1.6rem;
        cursor: pointer;
        z-index: 9998;
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    document.body.appendChild(musicBtn);

    let isPlaying = false;
    let audio = null;

    // Yaxshi va ishonchli demo audio (SoundHelix - bepul)
    const audioSrc = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

    function createAudio() {
        if (!audio) {
            audio = new Audio(audioSrc);
            audio.loop = true;
            audio.volume = 0.35; // Ovoz balandligi biroz pastroq (bezovta qilmasin)
        }
    }

    musicBtn.addEventListener('click', async () => {
        createAudio();

        if (!isPlaying) {
            try {
                await audio.play();
                isPlaying = true;
                musicBtn.innerHTML = '⏸️';
                musicBtn.style.color = 'var(--neon-green)';
                musicBtn.style.boxShadow = '0 0 25px rgba(34, 211, 238, 0.5)';
            } catch (err) {
                // Agar autoplay bloklansa
                alert('Brauzer musiqani avtomatik ijro etishni blokladi. Iltimos, tugmani yana bosing.');
                isPlaying = false;
            }
        } else {
            audio.pause();
            isPlaying = false;
            musicBtn.innerHTML = '🎵';
            musicBtn.style.color = 'var(--neon-blue)';
            musicBtn.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
        }
    });

    // Hover effekti
    musicBtn.addEventListener('mouseenter', () => {
        musicBtn.style.transform = 'scale(1.1)';
    });
    musicBtn.addEventListener('mouseleave', () => {
        musicBtn.style.transform = 'scale(1)';
    });
}

// Final console message
console.log('%c✅ LIFEVERSE v5.0 ULTRA — Barcha modullar muvaffaqiyatli ishga tushirildi!', 'color:#22d3ee; font-size:12px');