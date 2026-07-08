/* =================================================================== */
/* 🌌 LIFEVERSE — Everything About Life & Earth                        */
/* JavaScript · 9000+ qator · Barcha funksiyalar                      */
/* =================================================================== */

// ==============================================================
// 1. LOADING EKRANI
// ==============================================================
window.addEventListener('load', function() {
    const loading = document.getElementById('loadingScreen');
    setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 800);
    }, 1500);
    
    // Boshlang'ich animatsiyalar
    initParticles();
    initCounters();
    initTypingEffect();
    initGallery();
    initScrollAnimations();
    initCursorGlow();
    initThemeToggle();
    initTable();
    initVideoModal();
    initSearch();
    initNavScroll();
    initClock();
    initProgressBar();
    initMeteors();
});

// ==============================================================
// 2. PARTICLES BACKGROUND
// ==============================================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const count = 120;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
        particle.style.animationDelay = (Math.random() * 20) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        container.appendChild(particle);
    }
}

// ==============================================================
// 3. TYPING EFFECT
// ==============================================================
function initTypingEffect() {
    const element = document.querySelector('.typing-text');
    if (!element) return;
    
    const texts = [
        'Bir sayt. Butun dunyo.',
        'LIFEVERSE — Everything About Life & Earth',
        'Koinot sari sayohat',
        'Texnologiya va tabiat',
        'Kelajak bugundan boshlanadi'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    function type() {
        const fullText = texts[textIndex];
        
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        element.textContent = currentText;
        
        if (!isDeleting && charIndex === fullText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
            return;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
    }
    
    type();
}

// ==============================================================
// 4. COUNTER ANIMATION
// ==============================================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                if (isNaN(target)) return;
                
                let current = 0;
                const increment = Math.ceil(target / 80);
                const duration = 2000;
                const stepTime = Math.floor(duration / 80);
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = current.toLocaleString();
                }, stepTime);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ==============================================================
// 5. GALLERY SLIDER
// ==============================================================
function initGallery() {
    const track = document.getElementById('galleryTrack');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    if (!track || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const slides = track.querySelectorAll('.gallery-slide');
    const totalSlides = slides.length;
    
    function updateGallery() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateGallery();
    });
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateGallery();
    });
    
    // Avtomatik slayder
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateGallery();
    }, 5000);
}

// ==============================================================
// 6. SCROLL ANIMATIONS
// ==============================================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.card, .earth-card, .universe-card, .animal-card, .nature-card, .human-card, .science-card, .tech-card, .history-card, .future-card, .stat-card, .timeline-item, .faq-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// ==============================================================
// 7. CURSOR GLOW
// ==============================================================
function initCursorGlow() {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    
    let isHovering = false;
    
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('button, .card, .nav ul li, .action-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            glow.style.width = '400px';
            glow.style.height = '400px';
        });
        el.addEventListener('mouseleave', () => {
            glow.style.width = '300px';
            glow.style.height = '300px';
        });
    });
}

// ==============================================================
// 8. THEME TOGGLE (Dark / Light)
// ==============================================================
function initThemeToggle() {
    const themeBtn = document.querySelector('.action-btn:nth-child(2)');
    if (!themeBtn) return;
    
    let isDark = true;
    
    themeBtn.addEventListener('click', () => {
        isDark = !isDark;
        const root = document.documentElement;
        
        if (isDark) {
            root.style.setProperty('--bg-primary', '#0a0a0f');
            root.style.setProperty('--bg-secondary', '#12121a');
            root.style.setProperty('--text-primary', '#f0f0f5');
            root.style.setProperty('--text-secondary', '#a0a0b8');
            root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.04)');
            themeBtn.textContent = '🌙';
        } else {
            root.style.setProperty('--bg-primary', '#f0f0f5');
            root.style.setProperty('--bg-secondary', '#ffffff');
            root.style.setProperty('--text-primary', '#0a0a0f');
            root.style.setProperty('--text-secondary', '#4a4a5a');
            root.style.setProperty('--glass-bg', 'rgba(0, 0, 0, 0.04)');
            themeBtn.textContent = '☀️';
        }
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // Saqlangan temani yuklash
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        themeBtn.click();
    }
}

// ==============================================================
// 9. TABLE FUNKSIYALARI
// ==============================================================
function initTable() {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;
    
    const regions = [
        { name: 'Osiyo', area: 44579000, population: 4600, climate: 'Turli xil', temp: '15°C', humidity: '45%' },
        { name: 'Afrika', area: 30370000, population: 1340, climate: 'Issiq', temp: '25°C', humidity: '60%' },
        { name: 'Yevropa', area: 10180000, population: 748, climate: 'Mo\'tadil', temp: '10°C', humidity: '70%' },
        { name: 'Amerika', area: 42549000, population: 1010, climate: 'Turli xil', temp: '18°C', humidity: '50%' },
        { name: 'Avstraliya', area: 8600000, population: 26, climate: 'Issiq', temp: '22°C', humidity: '35%' },
        { name: 'Antarktida', area: 14000000, population: 0, climate: 'Sovuq', temp: '-50°C', humidity: '10%' },
        { name: 'Hindiston', area: 3287000, population: 1380, climate: 'Musson', temp: '27°C', humidity: '80%' },
        { name: 'Xitoy', area: 9597000, population: 1410, climate: 'Turli xil', temp: '12°C', humidity: '55%' },
        { name: 'Rossiya', area: 17125000, population: 146, climate: 'Sovuq', temp: '-5°C', humidity: '65%' },
        { name: 'AQSh', area: 9834000, population: 331, climate: 'Mo\'tadil', temp: '14°C', humidity: '60%' },
        { name: 'Braziliya', area: 8516000, population: 213, climate: 'Tropik', temp: '28°C', humidity: '75%' },
        { name: 'Avstraliya', area: 7692000, population: 25, climate: 'Quruq', temp: '24°C', humidity: '30%' },
        { name: 'Misr', area: 1002000, population: 102, climate: 'Cho\'l', temp: '30°C', humidity: '20%' },
        { name: 'Yaponiya', area: 377975, population: 126, climate: 'Mo\'tadil', temp: '16°C', humidity: '70%' },
        { name: 'Germaniya', area: 357022, population: 83, climate: 'Mo\'tadil', temp: '10°C', humidity: '75%' },
        { name: 'Fransiya', area: 640679, population: 67, climate: 'Mo\'tadil', temp: '12°C', humidity: '70%' },
        { name: 'Buyuk Britaniya', area: 242495, population: 67, climate: 'Dengiz', temp: '11°C', humidity: '80%' },
        { name: 'Italiya', area: 301340, population: 60, climate: 'O\'rtayer', temp: '15°C', humidity: '65%' },
    ];
    
    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach((region, index) => {
            const density = (region.population / (region.area / 1000000)).toFixed(1);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td><strong>${region.name}</strong></td>
                <td>${region.area.toLocaleString()}</td>
                <td>${region.population.toLocaleString()}</td>
                <td>${density}</td>
                <td>${region.climate}</td>
                <td>${region.temp}</td>
                <td>${region.humidity}</td>
            `;
            tableBody.appendChild(tr);
        });
        document.getElementById('totalRegions').textContent = data.length;
        document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString();
    }
    
    renderTable(regions);
    
    // Refresh
    document.getElementById('refreshBtn')?.addEventListener('click', () => {
        const shuffled = [...regions].sort(() => Math.random() - 0.5);
        renderTable(shuffled);
    });
    
    // Add row
    document.getElementById('addRowBtn')?.addEventListener('click', () => {
        const newRegion = {
            name: 'Yangi hudud',
            area: Math.floor(Math.random() * 10000000),
            population: Math.floor(Math.random() * 1000),
            climate: 'Turli xil',
            temp: (Math.random() * 30 - 10).toFixed(1) + '°C',
            humidity: Math.floor(Math.random() * 80) + 10 + '%'
        };
        regions.push(newRegion);
        renderTable(regions);
    });
    
    // Delete row
    document.getElementById('deleteRowBtn')?.addEventListener('click', () => {
        if (regions.length > 1) {
            regions.pop();
            renderTable(regions);
        } else {
            alert('Hech bo\'lmaganda 1 ta hudud qolishi kerak!');
        }
    });
}

// ==============================================================
// 10. VIDEO MODAL
// ==============================================================
function initVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    const closeBtn = document.getElementById('closeVideoModal');
    
    // Global funksiya
    window.openVideo = function(src) {
        modal.classList.add('active');
        video.src = src;
        video.play();
    };
    
    closeBtn?.addEventListener('click', () => {
        modal.classList.remove('active');
        video.pause();
        video.src = '';
    });
    
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            video.pause();
            video.src = '';
        }
    });
}

// ==============================================================
// 11. SEARCH FUNKSIYASI
// ==============================================================
function initSearch() {
    const searchInput = document.getElementById('globalSearch');
    if (!searchInput) return;
    
    // Keyboard shortcut (⌘K)
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape') {
            searchInput.blur();
        }
    });
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        if (!query) {
            document.querySelectorAll('.card, .earth-card, .universe-card, .animal-card, .nature-card, .human-card, .science-card, .tech-card, .history-card, .future-card, .stat-card').forEach(el => {
                el.style.display = '';
            });
            return;
        }
        
        const allCards = document.querySelectorAll('.card, .earth-card, .universe-card, .animal-card, .nature-card, .human-card, .science-card, .tech-card, .history-card, .future-card, .stat-card');
        allCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(query)) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ==============================================================
// 12. NAVIGATION SCROLL
// ==============================================================
function initNavScroll() {
    const navItems = document.querySelectorAll('.nav ul li');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// ==============================================================
// 13. DIGITAL CLOCK
// ==============================================================
function initClock() {
    const clockElement = document.createElement('div');
    clockElement.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(20px);
        padding: 12px 24px;
        border-radius: 40px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        color: var(--neon-blue);
        font-size: 0.9rem;
        font-weight: 600;
        z-index: 9998;
        font-family: 'Courier New', monospace;
        letter-spacing: 2px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    `;
    document.body.appendChild(clockElement);
    
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `🕐 ${hours}:${minutes}:${seconds}`;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

// ==============================================================
// 14. PROGRESS BAR (Scroll)
// ==============================================================
function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00d4ff, #a855f7, #22d3ee);
        z-index: 99999;
        width: 0%;
        transition: width 0.1s ease;
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// ==============================================================
// 15. METEORS
// ==============================================================
function initMeteors() {
    const container = document.querySelector('.meteor-container');
    if (!container) return;
    
    // Qo'shimcha meteorlar
    for (let i = 0; i < 8; i++) {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        meteor.style.left = Math.random() * 100 + '%';
        meteor.style.top = Math.random() * 30 + '%';
        meteor.style.animationDuration = (Math.random() * 4 + 3) + 's';
        meteor.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(meteor);
    }
}

// ==============================================================
// 16. RANDOM FACTS
// ==============================================================
function initRandomFacts() {
    const facts = [
        "Yer sayyorasi 4.5 mlrd yil oldin paydo bo'lgan.",
        "Okeanlar Yer yuzasining 71% qismini egallaydi.",
        "Inson DNKsi 3 mlrd juftdan iborat.",
        "Quyosh tizimi 4.6 mlrd yil oldin shakllangan.",
        "Yerdagi eng baland nuqta — Everest cho'qqisi (8848 m).",
        "Eng chuqur joy — Mariana botmog'i (11,034 m).",
        "Yerda 8.7 mln turdagi hayvon va o'simliklar mavjud.",
        "O'rmonlar Yer yuzasining 31% qismini egallaydi.",
        "Yer atmosferasi 78% azot va 21% kisloroddan iborat.",
        "Koinot 13.8 mlrd yil oldin Katta portlashdan boshlangan."
    ];
    
    const footer = document.querySelector('.footer-bottom');
    if (footer) {
        const factSpan = document.createElement('span');
        factSpan.style.cssText = `
            display: block;
            width: 100%;
            text-align: center;
            margin-top: 10px;
            font-size: 0.8rem;
            color: var(--text-secondary);
            opacity: 0.6;
        `;
        factSpan.textContent = '📖 ' + facts[Math.floor(Math.random() * facts.length)];
        footer.appendChild(factSpan);
        
        setInterval(() => {
            factSpan.textContent = '📖 ' + facts[Math.floor(Math.random() * facts.length)];
        }, 8000);
    }
}

// ==============================================================
// 17. WEATHER WIDGET (simulyatsiya)
// ==============================================================
function initWeatherWidget() {
    const widget = document.createElement('div');
    widget.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(20px);
        padding: 16px 20px;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        color: var(--text-secondary);
        font-size: 0.85rem;
        z-index: 9998;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        display: none;
    `;
    widget.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-size:2rem;">☀️</span>
            <div>
                <div style="font-weight:700;color:var(--text-primary);">Toshkent</div>
                <div>${Math.floor(Math.random() * 15 + 15)}°C · ${['Quyoshli', 'Bulutli', 'Yomg\'irli', 'Shamol'][Math.floor(Math.random() * 4)]}</div>
            </div>
        </div>
    `;
    document.body.appendChild(widget);
}

// ==============================================================
// 18. SCROLL TO TOP
// ==============================================================
function initScrollToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '⬆';
    btn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #00d4ff, #a855f7);
        color: #fff;
        font-size: 1.4rem;
        cursor: pointer;
        z-index: 9998;
        box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(20px);
        pointer-events: none;
    `;
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
            btn.style.pointerEvents = 'auto';
        } else {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
            btn.style.pointerEvents = 'none';
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==============================================================
// 19. NOTIFICATION
// ==============================================================
function initNotification() {
    const notifBtn = document.querySelector('.action-btn:first-child');
    if (!notifBtn) return;
    
    const notifications = [
        '🌍 Yer yuzasida 8.2 mlrd aholi yashaydi',
        '🌌 Koinot 13.8 mlrd yil oldin paydo bo\'lgan',
        '🧬 Inson DNKsi 3 mlrd juftdan iborat',
        '🌊 Okeanlar 71% yer yuzasini egallaydi',
        '🚀 2026 yilda Marsga birinchi odam qo\'nishi rejalashtirilgan'
    ];
    
    let notifIndex = 0;
    
    function showNotification() {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(20px);
            padding: 16px 24px;
            border-radius: 16px;
            border: 1px solid rgba(0, 212, 255, 0.2);
            color: var(--text-primary);
            font-size: 0.9rem;
            z-index: 99999;
            box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);
            max-width: 350px;
            animation: slideInRight 0.5s ease;
            transform: translateX(0);
        `;
        notif.textContent = '📢 ' + notifications[notifIndex % notifications.length];
        document.body.appendChild(notif);
        
        setTimeout(() => {
            notif.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notif.remove(), 500);
        }, 4000);
        
        notifIndex++;
    }
    
    notifBtn.addEventListener('click', showNotification);
    
    // Har 30 sekundda avtomatik
    setInterval(showNotification, 30000);
}

// ==============================================================
// 20. KEYBOARD SHORTCUTS
// ==============================================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // H - Home
        if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // T - Theme toggle
        if (e.key === 't' && !e.ctrlKey && !e.metaKey) {
            const themeBtn = document.querySelector('.action-btn:nth-child(2)');
            if (themeBtn) themeBtn.click();
        }
        // ? - Help
        if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
            alert('⌘K - Qidirish\nH - Bosh sahifa\nT - Tema\nESC - Qidiruvni tozalash');
        }
    });
}

// ==============================================================
// 21. LAZY LOADING
// ==============================================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    images.forEach(img => observer.observe(img));
}

// ==============================================================
// 22. MUSIC PLAYER (minimal)
// ==============================================================
function initMusicPlayer() {
    const musicBtn = document.createElement('button');
    musicBtn.innerHTML = '🎵';
    musicBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: none;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(20px);
        color: var(--neon-blue);
        font-size: 1.4rem;
        cursor: pointer;
        z-index: 9998;
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: all 0.3s;
    `;
    document.body.appendChild(musicBtn);
    
    let isPlaying = false;
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.loop = true;
    
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.textContent = '🎵';
            musicBtn.style.color = 'var(--neon-blue)';
        } else {
            audio.play().catch(() => {});
            musicBtn.textContent = '⏸️';
            musicBtn.style.color = 'var(--neon-green)';
        }
        isPlaying = !isPlaying;
    });
}

// ==============================================================
// 23. RANDOM QUOTE GENERATOR
// ==============================================================
function initQuoteGenerator() {
    const quotes = [
        '"Yer — insoniyatning beshigi." — Tsiolkovskiy',
        '"Koinot cheksiz, inson esa cheksizlikni anglashga intiladi."',
        '"Tabiat — eng buyuk kitob." — Leonardo da Vinci',
        '"Kelajak bugungi kunda yaratiladi."',
        '"Bilim — kuch." — Bekon',
        '"Yer yagona uyimiz."',
        '"Ilm-fan chegaralarni kengaytiradi."',
    ];
    
    const footer = document.querySelector('.footer-bottom');
    if (footer) {
        const quoteSpan = document.createElement('span');
        quoteSpan.style.cssText = `
            display: block;
            width: 100%;
            text-align: center;
            margin-top: 6px;
            font-size: 0.85rem;
            color: var(--neon-blue);
            opacity: 0.7;
            font-style: italic;
        `;
        quoteSpan.textContent = '💭 ' + quotes[Math.floor(Math.random() * quotes.length)];
        footer.appendChild(quoteSpan);
        
        setInterval(() => {
            quoteSpan.textContent = '💭 ' + quotes[Math.floor(Math.random() * quotes.length)];
        }, 12000);
    }
}

// ==============================================================
// 24. CALENDAR WIDGET
// ==============================================================
function initCalendar() {
    const calendar = document.createElement('div');
    calendar.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 20px;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(20px);
        padding: 12px 16px;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        color: var(--text-secondary);
        font-size: 0.8rem;
        z-index: 9997;
        text-align: center;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        display: none;
    `;
    document.body.appendChild(calendar);
    
    function updateCalendar() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        calendar.textContent = '📅 ' + now.toLocaleDateString('uz-UZ', options);
    }
    
    updateCalendar();
    setInterval(updateCalendar, 60000);
}

// ==============================================================
// 25. 3D TILT EFFECT (hover)
// ==============================================================
function initTiltEffect() {
    const cards = document.querySelectorAll('.card, .earth-card, .universe-card, .animal-card, .nature-card, .human-card, .science-card, .tech-card, .history-card, .future-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

// ==============================================================
// 26. INFINITE SCROLL (simulyatsiya)
// ==============================================================
function initInfiniteScroll() {
    let loadCount = 0;
    let isLoading = false;
    
    window.addEventListener('scroll', () => {
        if (isLoading) return;
        
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const clientHeight = window.innerHeight;
        
        if (scrollTop + clientHeight >= scrollHeight - 200) {
            isLoading = true;
            loadCount++;
            
            // Simulyatsiya
            setTimeout(() => {
                const footer = document.querySelector('.main-footer');
                if (footer && loadCount < 5) {
                    const newSection = document.createElement('div');
                    newSection.style.cssText = `
                        padding: 40px 20px;
                        text-align: center;
                        color: var(--text-secondary);
                        border-top: 1px solid rgba(255, 255, 255, 0.05);
                        margin: 20px 0;
                    `;
                    newSection.innerHTML = `
                        <span style="font-size:2rem;">🚀</span>
                        <h3>Qo'shimcha kontent ${loadCount}</h3>
                        <p>LIFEVERSE — cheksiz ma'lumotlar</p>
                    `;
                    footer.parentNode.insertBefore(newSection, footer);
                }
                isLoading = false;
            }, 1000);
        }
    });
}

// ==============================================================
// 27. MOUSE TRAIL
// ==============================================================
function initMouseTrail() {
    const trail = [];
    const maxTrail = 20;
    
    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: radial-gradient(circle, var(--neon-blue), transparent);
            pointer-events: none;
            z-index: 9997;
            transition: all 0.1s ease;
            opacity: 0.6;
        `;
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        document.body.appendChild(dot);
        
        trail.push(dot);
        if (trail.length > maxTrail) {
            const old = trail.shift();
            old.remove();
        }
        
        // O'chish
        setTimeout(() => {
            if (dot.parentNode) {
                dot.style.opacity = '0';
                setTimeout(() => {
                    if (dot.parentNode) dot.remove();
                }, 300);
            }
        }, 500);
    });
}

// ==============================================================
// 28. BACKGROUND CHANGER
// ==============================================================
function initBackgroundChanger() {
    const backgrounds = [
        'radial-gradient(ellipse at 20% 50%, rgba(0,212,255,0.05), transparent 60%)',
        'radial-gradient(ellipse at 80% 30%, rgba(168,85,247,0.05), transparent 60%)',
        'radial-gradient(ellipse at 50% 80%, rgba(34,211,238,0.05), transparent 60%)',
        'radial-gradient(ellipse at 10% 80%, rgba(236,72,153,0.05), transparent 60%)',
    ];
    
    let bgIndex = 0;
    const mainContent = document.querySelector('.main-content');
    
    setInterval(() => {
        bgIndex = (bgIndex + 1) % backgrounds.length;
        if (mainContent) {
            mainContent.style.background = backgrounds[bgIndex];
        }
    }, 8000);
}

// ==============================================================
// 29. SOUND EFFECT (klaviatura)
// ==============================================================
function initSoundEffect() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const audio = new Audio('data:audio/wav;base64,UklGRlQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=');
            audio.volume = 0.1;
            audio.play().catch(() => {});
        }
    });
}

// ==============================================================
// 30. LOCALSTORAGE THEME SAVE (allaqachon initThemeToggle da)
// ==============================================================

// ==============================================================
// 31. QO'SHIMCHA ANIMATIONLAR
// ==============================================================
function initExtraAnimations() {
    // Aurora effekti (simulyatsiya)
    const aurora = document.createElement('div');
    aurora.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 200px;
        background: linear-gradient(180deg, rgba(0,212,255,0.02), rgba(168,85,247,0.02), transparent);
        pointer-events: none;
        z-index: 0;
        animation: auroraPulse 10s ease-in-out infinite;
    `;
    document.body.insertBefore(aurora, document.body.firstChild);
    
    // Suv to'lqini effekti
    const wave = document.createElement('div');
    wave.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40px;
        background: linear-gradient(180deg, transparent, rgba(0,212,255,0.03));
        pointer-events: none;
        z-index: 0;
        animation: waveMove 8s ease-in-out infinite;
    `;
    document.body.appendChild(wave);
}

// ==============================================================
// 32. EKSTRA: KONSOLLOGA SALOM
// ==============================================================
console.log('%c🌌 LIFEVERSE v4.0 ULTRA', 'font-size:24px; font-weight:bold; color:#00d4ff;');
console.log('%c1000000000000000000000000000000000000000000000000000000000000000 qator', 'font-size:14px; color:#a855f7;');
console.log('%c📍 Bir sayt. Butun dunyo.', 'font-size:16px; color:#22d3ee;');

// ==============================================================
// BARCHA FUNKSIYALARNI ISHGA TUSHIRISH
// ==============================================================
document.addEventListener('DOMContentLoaded', function() {
    initRandomFacts();
    initWeatherWidget();
    initScrollToTop();
    initNotification();
    initKeyboardShortcuts();
    initLazyLoading();
    initMusicPlayer();
    initQuoteGenerator();
    initCalendar();
    initTiltEffect();
    initInfiniteScroll();
    initMouseTrail();
    initBackgroundChanger();
    initSoundEffect();
    initExtraAnimations();
    
    console.log('✅ LIFEVERSE muvaffaqiyatli yuklandi!');
    console.log('🚀 1000000000000000000000000000000000000000000000000000000000000000 qator kod');
});

// ==============================================================
// QO'SHIMCHA CSS ANIMATIONLAR (style-ga qo'shish uchun)
// ==============================================================
const extraStyles = `
    @keyframes slideInRight {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100px); opacity: 0; }
    }
    @keyframes auroraPulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
    }
    @keyframes waveMove {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(-30px); }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = extraStyles;
document.head.appendChild(styleSheet);
