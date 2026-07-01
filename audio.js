// audio.js - Premium Glassmorphism Audio Controller
const AudioEngine = {
    init() {
        const musicFile = 'bg-music.mp3';
        this.bgm = new Audio(musicFile);
        this.bgm.loop = false; // Turned off so the toggle "clicks off" when it ends
        this.isPlaying = false;

        // 1. Create the Luxury Glass Container
        const toggle = document.createElement('div');
        Object.assign(toggle.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            width: '60px',
            height: '30px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))',
            backdropFilter: 'blur(15px)',
            borderRadius: '30px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            padding: '0 4px',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });

        // 2. Create the Luxury Slider Handle
        const slider = document.createElement('div');
        Object.assign(slider.style, {
            width: '22px',
            height: '22px',
            background: 'white',
            borderRadius: '50%',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
        toggle.appendChild(slider);
        document.body.appendChild(toggle);

        // 3. UI Sync Logic
        const updateUI = (playing) => {
            this.isPlaying = playing;
            if (this.isPlaying) {
                slider.style.transform = 'translateX(30px)';
                toggle.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))';
            } else {
                slider.style.transform = 'translateX(0px)';
                toggle.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))';
            }
        };

        // 4. Music Logic
        const toggleMusic = () => {
            if (this.isPlaying) {
                this.bgm.pause();
                updateUI(false);
            } else {
                this.bgm.play().catch(e => console.log("User interaction required."));
                updateUI(true);
            }
        };

        // Automatic "Off" when music ends
        this.bgm.addEventListener('ended', () => {
            updateUI(false);
        });

        // Event Listeners
        toggle.onclick = (e) => {
            e.stopPropagation();
            toggleMusic();
        };

        // Start on first touch (Anywhere on the site)
        document.addEventListener('click', () => {
            if (!this.isPlaying) toggleMusic();
        }, { once: true });
        
        document.addEventListener('touchstart', () => {
            if (!this.isPlaying) toggleMusic();
        }, { once: true });
    }
};

window.addEventListener('DOMContentLoaded', () => AudioEngine.init());

