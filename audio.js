/// audio.js - Direct Play (Bypassing Mobile Volume Locks)
const AudioEngine = {
    init() {
        this.bgm = new Audio('bg-music.mp3');
        this.bgm.loop = true;
        this.isPlaying = false;

        const startPlaying = () => {
            if (this.isPlaying) return;
            this.isPlaying = true;
            
            // Force play at default hardware volume
            this.bgm.play().then(() => {
                console.log("Music unlocked and playing!");
            }).catch(err => {
                console.log("Browser blocked play", err);
                this.isPlaying = false;
            });
            
            document.removeEventListener('click', startPlaying);
            document.removeEventListener('touchstart', startPlaying);
        };

        // Listen for the absolute first interaction
        document.addEventListener('click', startPlaying, { once: true });
        document.addEventListener('touchstart', startPlaying, { once: true });
    }
};

window.addEventListener('DOMContentLoaded', () => AudioEngine.init());
