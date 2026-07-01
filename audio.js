// audio.js - The Intelligent Media Engine
const AudioEngine = {
    init() {
        const musicFile = 'bg-music.mp3';
        this.bgm = new Audio(musicFile);
        this.bgm.loop = true;
        this.isPlaying = false;

        // Create a stylish Play/Pause button
        const btn = document.createElement('button');
        btn.innerText = "🔊"; // Initial Icon
        btn.style.position = 'fixed';
        btn.style.bottom = '20px';
        btn.style.right = '20px';
        btn.style.padding = '10px 15px';
        btn.style.background = 'rgba(255, 255, 255, 0.1)';
        btn.style.color = 'white';
        btn.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        btn.style.borderRadius = '50px';
        btn.style.zIndex = '9999';
        btn.style.backdropFilter = 'blur(5px)';
        document.body.appendChild(btn);

        // The logic to start/stop
        const toggleMusic = () => {
            if (this.isPlaying) {
                this.bgm.pause();
                btn.innerText = "🔇"; // Show Replay icon
                this.isPlaying = false;
            } else {
                this.bgm.play();
                btn.innerText = "🔊"; // Show Mute icon
                this.isPlaying = true;
            }
        };

        // On first interaction (tap/swipe), start the music automatically
        const startOnFirstTap = () => {
            if (!this.isPlaying) {
                this.bgm.play();
                this.isPlaying = true;
                btn.innerText = "🔊";
            }
            document.removeEventListener('click', startOnFirstTap);
            document.removeEventListener('touchstart', startOnFirstTap);
        };

        document.addEventListener('click', startOnFirstTap, { once: true });
        document.addEventListener('touchstart', startOnFirstTap, { once: true });

        // Button click toggles the state
        btn.onclick = toggleMusic;
    }
};

window.addEventListener('DOMContentLoaded', () => AudioEngine.init());
