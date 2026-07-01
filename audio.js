// audio.js - Instant-Trigger Engine
const AudioEngine = {
    init() {
        const musicFile = 'bg-music.mp3';
        this.bgm = new Audio(musicFile);
        this.bgm.loop = false;
        this.isPlaying = false;

        // 1. Create the UI Component
        const container = document.createElement('div');
        Object.assign(container.style, {
            position: 'fixed', top: '20px', right: '20px', width: '70px', height: '34px',
            background: '#1a1a2e', borderRadius: '50px', border: '2px solid #2d2d44',
            display: 'flex', alignItems: 'center', padding: '3px', cursor: 'pointer',
            zIndex: '9999', transition: 'background 0.3s ease'
        });

        const knob = document.createElement('div');
        Object.assign(knob.style, {
            width: '28px', height: '28px', background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        });
        
        container.appendChild(knob);
        document.body.appendChild(container);

        // 2. Playback Logic
        const playMusic = () => {
            if (this.isPlaying) return;
            this.bgm.play().then(() => {
                this.isPlaying = true;
                knob.style.transform = 'translateX(36px)';
                knob.innerHTML = '🔊';
                container.style.background = '#4e44ce';
            }).catch(e => console.log("Waiting for user gesture..."));
        };

        const stopMusic = () => {
            this.bgm.pause();
            this.isPlaying = false;
            knob.style.transform = 'translateX(0px)';
            knob.innerHTML = '🔇';
            container.style.background = '#1a1a2e';
        };

        // 3. Listen to ANY interaction on the page (Stardust, scroll, click)
        const triggerHandler = () => {
            playMusic();
            // Remove listeners so it only triggers the first time
            document.removeEventListener('click', triggerHandler);
            document.removeEventListener('touchstart', triggerHandler);
        };

        document.addEventListener('click', triggerHandler);
        document.addEventListener('touchstart', triggerHandler);

        // 4. Manual Toggle Control
        container.onclick = (e) => {
            e.stopPropagation();
            this.isPlaying ? stopMusic() : playMusic();
        };

        // Auto-reset
        this.bgm.addEventListener('ended', stopMusic);
        
        // Initial state
        knob.innerHTML = '🔇';
    }
};

window.addEventListener('DOMContentLoaded', () => AudioEngine.init());
