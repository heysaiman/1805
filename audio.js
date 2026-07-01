// audio.js - Premium Vinyl Record Engine
const AudioEngine = {
    init() {
        const musicFile = 'bg-music.mp3';
        this.bgm = new Audio(musicFile);
        this.bgm.loop = true;
        this.isPlaying = false;

        // 1. Create the Container
        const container = document.createElement('div');
        Object.assign(container.style, {
            position: 'fixed', top: '20px', right: '20px', width: '80px', height: '80px',
            zIndex: '9999', cursor: 'pointer', transition: 'transform 0.3s ease'
        });

        // 2. The Vinyl Record (CSS Generated)
        const vinyl = document.createElement('div');
        Object.assign(vinyl.style, {
            width: '100%', height: '100%', borderRadius: '50%',
            background: 'radial-gradient(circle, #333 20%, #000 20%, #000 25%, #333 25%, #333 30%, #000 30%, #000 35%, #333 35%, #333 40%, #000 40%, #000 100%)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
            border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center'
        });

        // The Center Label
        const label = document.createElement('div');
        Object.assign(label.style, {
            width: '30%', height: '30%', borderRadius: '50%', background: '#ff4d4d',
            boxShadow: 'inset 0 0 5px rgba(0,0,0,0.3)'
        });
        vinyl.appendChild(label);

        // 3. The Tonearm
        const tonearm = document.createElement('div');
        Object.assign(tonearm.style, {
            position: 'absolute', top: '-10px', right: '-10px', width: '40px', height: '5px',
            background: '#ccc', borderRadius: '2px', transform: 'rotate(-25deg)',
            transformOrigin: 'bottom right', transition: 'transform 0.3s ease'
        });

        container.appendChild(tonearm);
        container.appendChild(vinyl);
        document.body.appendChild(container);

        // 4. Animation Keyframes (Spinning)
        const style = document.createElement('style');
        style.innerHTML = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
        document.head.appendChild(style);

        // 5. Playback Logic
        const toggleMusic = () => {
            if (this.isPlaying) {
                this.bgm.pause();
                vinyl.style.animation = 'none';
                tonearm.style.transform = 'rotate(-25deg)';
            } else {
                this.bgm.play();
                vinyl.style.animation = 'spin 3s linear infinite';
                tonearm.style.transform = 'rotate(-10deg)';
            }
            this.isPlaying = !this.isPlaying;
        };

        // Click to toggle
        container.onclick = (e) => {
            e.stopPropagation();
            toggleMusic();
        };

        // First interaction trigger
        document.addEventListener('click', () => {
            if (!this.isPlaying) toggleMusic();
        }, { once: true });
        
        document.addEventListener('touchstart', () => {
            if (!this.isPlaying) toggleMusic();
        }, { once: true });
    }
};

window.addEventListener('DOMContentLoaded', () => AudioEngine.init());
