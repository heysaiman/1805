const Engine = {
    init() {
        const data = window.websiteData || { mainHeroImage: '', togetherSinceText: 'Together Forever', startDate: '2025-11-30T00:00:00', synopsis: '' };
        document.getElementById('bgImage').src = data.mainHeroImage;
        document.getElementById('togetherText').innerText = data.togetherSinceText;
        this.startDate = new Date(data.startDate);
        this.startTime = this.startDate.getTime();
        this.titleHasCounted = false;
        
        this.startClock();
        InteractionManager.init();
        ParticleSystem.init();
    },

    startClock() {
        const update = () => {
            const nowObj = new Date(); const now = nowObj.getTime(); const diff = now - this.startTime;
            const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));
            const years = Math.floor(daysTotal / 365); const months = Math.floor((daysTotal % 365) / 30);
            const weeks = Math.floor(((daysTotal % 365) % 30) / 7); const days = ((daysTotal % 365) % 30) % 7;
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); const secs = Math.floor((diff % (1000 * 60)) / 1000);

            let totalMonths = (nowObj.getFullYear() - this.startDate.getFullYear()) * 12 + (nowObj.getMonth() - this.startDate.getMonth());
            if (nowObj.getDate() < this.startDate.getDate()) totalMonths--;
            
            let isYears = totalMonths >= 12; let targetNum = isYears ? Math.floor(totalMonths / 12) : totalMonths;
            let targetLabel = isYears ? `YEAR${Math.floor(totalMonths / 12) > 1 ? 'S' : ''}` : `MONTHS`;
            let paddedTarget = String(targetNum).padStart(2, '0');
            
            const rawSynopsis = window.websiteData.synopsis || '';
            document.getElementById('synopsisText').innerText = rawSynopsis.replace(/7 months|1 year/i, `${targetNum} ${targetLabel.toLowerCase()}`);

            if (!this.titleHasCounted) {
                this.titleHasCounted = true;
                document.getElementById('heroLabel').innerText = targetLabel;
                setTimeout(() => {
                    let current = 0; const numberEl = document.getElementById('heroNumber');
                    const rapidCounter = setInterval(() => {
                        current += 1; numberEl.innerText = String(current).padStart(2, '0');
                        if (current >= targetNum) {
                            clearInterval(rapidCounter); numberEl.innerText = paddedTarget; 
                            numberEl.classList.add('number-pop');
                            setTimeout(() => numberEl.classList.remove('number-pop'), 400);
                        }
                    }, 100); 
                }, 3900); 
            } else {
                document.getElementById('heroNumber').innerText = paddedTarget;
                document.getElementById('heroLabel').innerText = targetLabel;
            }

            const timeUnits = [
                { label: 'Years', val: years }, { label: 'Months', val: valPad(months) }, { label: 'Weeks', val: valPad(weeks) }, 
                { label: 'Days', val: valPad(days) }, { label: 'Hours', val: valPad(hours) }, { label: 'Mins', val: valPad(mins) }, { label: 'Secs', val: valPad(secs), isLive: true }
            ];

            let html = '';
            timeUnits.forEach(u => {
                const style = u.isLive ? 'text-emerald-300 font-medium drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]' : 'text-[#fcf3d7] font-light drop-shadow-[0_5px_15px_rgba(212,175,55,0.25)]';
                html += `<div class="flex flex-col items-center justify-center"><span class="font-playfair text-5xl md:text-7xl ${style} transition-all duration-300 tracking-wider">${u.val}</span><span class="text-[9px] md:text-xs text-gray-400 mt-4 uppercase tracking-[0.5em] font-semibold opacity-70">${u.label}</span></div>`;
            });
            document.getElementById('countdown-container').innerHTML = html;
        };

        const valPad = (val) => String(val).padStart(2, '0');
        update(); setInterval(update, 1000);
    }
};

const InteractionManager = {
    init() {
        this.card = document.getElementById('tilt-card'); this.container = document.getElementById('main-ui-layer');
        this.container.addEventListener('mousemove', (e) => {
            let x = (window.innerWidth / 2 - e.pageX) / 50; let y = (window.innerHeight / 2 - e.pageY) / 50;
            this.card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        });
        this.container.addEventListener('mouseleave', () => this.card.style.transform = `rotateY(0deg) rotateX(0deg)`);
        window.addEventListener('deviceorientation', (e) => {
            if (!e.gamma || !e.beta) return;
            let tiltX = Math.max(-15, Math.min(15, e.gamma / 1.5)); let tiltY = Math.max(-15, Math.min(15, (e.beta - 45) / 1.5)); 
            this.card.style.transform = `rotateY(${tiltX}deg) rotateX(${-tiltY}deg)`;
        });
    }
};

const ParticleSystem = {
    lastSpawn: 0, throttle: 25, emojis: ['🤍', '✨', '🤎', '✨'], 
    init() {
        this.setupAmbientEnvironment();
        document.addEventListener('mousemove', (e) => this.spawnMix(e.clientX, e.clientY));
        document.addEventListener('touchmove', (e) => this.spawnMix(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
        document.addEventListener('click', (e) => { for(let i=0; i<30; i++) this.spawnMix(e.clientX, e.clientY, true); });
    },
    spawnMix(x, y, isBurst = false) {
        const now = Date.now();
        if (!isBurst && now - this.lastSpawn < this.throttle) return; 
        this.lastSpawn = now;
        const isHeart = Math.random() > 0.65; 
        this.createParticle(x, y, isHeart, isBurst);
    },
    createParticle(x, y, isHeart, isBurst) {
        const el = document.createElement('div');
        el.className = `particle ${isHeart ? 'particle-heart' : 'particle-stardust'}`;
        if (isHeart) { el.innerText = this.emojis[Math.floor(Math.random() * this.emojis.length)]; el.style.setProperty('--size', `${Math.random() * 1.5 + 1}rem`); } 
        else { el.style.setProperty('--size', `${Math.random() * 6 + 2}px`); }
        
        const spread = isBurst ? 150 : 60; const offsetX = (Math.random() - 0.5) * (isBurst ? 40 : 20); const offsetY = (Math.random() - 0.5) * (isBurst ? 40 : 20);
        el.style.left = `${x + offsetX}px`; el.style.top = `${y + offsetY}px`;
        
        const dx = (Math.random() - 0.5) * spread; const dy = (Math.random() - 0.5) * spread - (Math.random() * 100 + 50); 
        el.style.setProperty('--dx', `${dx}px`); el.style.setProperty('--dy', `${dy}px`);
        el.style.setProperty('--rot-start', `${Math.random() * 360}deg`); el.style.setProperty('--rot-mid', `${Math.random() * 360 + 180}deg`); el.style.setProperty('--rot-end', `${Math.random() * 720}deg`);
        
        const duration = Math.random() * 1.5 + 1.2; el.style.setProperty('--duration', `${duration}s`);
        document.body.appendChild(el); setTimeout(() => el.remove(), duration * 1000);
    },
    setupAmbientEnvironment() {
        const container = document.getElementById('environment-layer');
        for(let i=0; i<35; i++) {
            const orb = document.createElement('div'); orb.className = 'ambient-orb'; orb.style.left = `${Math.random() * 100}vw`;
            const size = Math.random() * 150 + 50; orb.style.width = `${size}px`; orb.style.height = `${size}px`;
            orb.style.setProperty('--max-opacity', Math.random() * 0.15 + 0.05);
            orb.style.animationDuration = `${Math.random() * 20 + 15}s`; orb.style.animationDelay = `${Math.random() * -30}s`;
            container.appendChild(orb);
        }
    }
};

window.addEventListener('DOMContentLoaded', () => Engine.init());

