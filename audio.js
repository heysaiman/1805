// audio.js - 100% Isolated Luxury Audio Engine
const AudioEngine = {
    init() {
        // The music name is locked safely in here, no need to touch data.js!
        const musicFile = 'bg-music.mp3'; 
        
        this.bgm = new Audio(musicFile);
        this.bgm.loop = true; // Infinite loop
        this.bgm.volume = 0;  // Start totally silent for the fade-in
        this.isPlaying = false;

        // The elegant unlock: Browser requires a physical interaction to play audio
        const unlockAudio = () => {
            if (this.isPlaying) return;
            this.isPlaying = true;
            
            // Attempt to play, then trigger the fade-in effect
            this.bgm.play().then(() => {
                this.fadeIn(2500); // 2.5 second smooth fade-in
            }).catch(err => {
                console.log("Audio waiting for physical screen tap...", err);
                this.isPlaying = false;
            });

            // Once unlocked, remove the listeners so it doesn't re-trigger
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('touchstart', unlockAudio);
        };

        // Listen for the first touch or click anywhere on the screen
        document.addEventListener('click', unlockAudio, { once: true });
        document.addEventListener('touchstart', unlockAudio, { once: true });
    },

    // Cinematic fade-in logic
    fadeIn(duration) {
        const steps = 25;
        const stepTime = duration / steps;
        const maxVolume = 0.6; // 60% volume - perfect for background ambiance
        let currentStep = 0;

        const fadeInterval = setInterval(() => {
            currentStep++;
            let vol = (currentStep / steps) * maxVolume;
            this.bgm.volume = Math.min(vol, maxVolume);
            
            if (currentStep >= steps) {
                clearInterval(fadeInterval);
            }
        }, stepTime);
    }
};

// Boot up the engine safely when the page loads
window.addEventListener('DOMContentLoaded', () => AudioEngine.init());

