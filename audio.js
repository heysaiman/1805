// audio.js - Luxury Cinematic Gatekeeper
const AudioEngine = {
    init() {
        const musicFile = 'bg-music.mp3';
        this.bgm = new Audio(musicFile);
        this.bgm.loop = false;
        this.isPlaying = false;

        // 1. Create the Full-Screen "Enter" Overlay
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
            position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
            background: 'radial-gradient(circle, #1a1a2e 0%, #000000 100%)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            color: 'white', fontSize: '20px', letterSpacing: '8px',
            zIndex: '10000', cursor: 'pointer', transition: 'opacity 1s ease'
        });
        overlay.innerHTML = "ENTER";
        document.body.appendChild(overlay);

        // 2. Create the Luxury 3D Toggle (Hidden initially)
        const toggle = document.createElement('div');
        Object.assign(toggle.style, {
            position: 'fixed', top: '20px', right: '20px', width: '90px', height: '45px',
            background: '#222', borderRadius: '50px', border: '1px solid #444',
            display: 'flex', alignItems: 'center', padding: '4px', cursor: 'pointer',
            zIndex: '9999', opacity: '0', transition: 'opacity 1s ease, background 0.3s',
            boxShadow: 'inset 0 4px 6px rgba(0,0,0,0.5), 0 2px 4px rgba(255,255,255,0.1)'
        });

        const knob = document.createElement('div');
        Object.assign(knob.style, {
            width: '37px', height: '37px', background: 'linear-gradient(145deg, #eee, #ccc)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(0,0,0,0.2)'
        });
        knob.innerHTML = '🔇';
        toggle.appendChild(knob);
        document.body.appendChild(toggle);

        // 3. Playback Logic
        const toggleMusic = () => {
            if (this.isPlaying) {
                this.bgm.pause();
                this.isPlaying = false;
                knob.style.transform = 'translateX(0px)';
                knob.innerHTML = '🔇';
                toggle.style.background = '#222';
            } else {
                this.bgm.play();
                this.isPlaying = true;
                knob.style.transform = 'translateX(45px)';
                knob.innerHTML = '🔊';
                toggle.style.background = '#4e44ce';
            }
        };

        // 4. "Enter" Interaction
        overlay.onclick = () => {
            this.bgm.play();
            this.isPlaying = true;
            
            // UI Switch to "Playing"
            overlay.style.opacity = '0';
            setTimeout(() => overlay.style.display = 'none', 1000);
            toggle.style.opacity = '1';
            
            knob.style.transform = 'translateX(45px)';
            knob.innerHTML = '🔊';
            toggle.style.background = '#4e44ce';
        };

        // Auto-reset when music ends
        this.bgm.addEventListener('ended', () => {
            this.isPlaying = false;
            knob.style.transform = 'translateX(0px)';
            knob.innerHTML = '🔇';
            toggle.style.background = '#222';
        });

        toggle.onclick = (e) => {
            e.stopPropagation();
            toggleMusic();
        };
    }
};

window.addEventListener('DOMContentLoaded', () => AudioEngine.init());
