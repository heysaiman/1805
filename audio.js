// audio.js - Button-Triggered Engine
const AudioEngine = {
    init() {
        const musicFile = 'bg-music.mp3';
        this.bgm = new Audio(musicFile);
        this.bgm.loop = true;
        
        // Create the button dynamically
        const btn = document.createElement('button');
        btn.innerText = "Begin";
        btn.style.position = 'fixed';
        btn.style.top = '50%';
        btn.style.left = '50%';
        btn.style.transform = 'translate(-50%, -50%)';
        btn.style.padding = '15px 30px';
        btn.style.background = 'rgba(255, 255, 255, 0.2)';
        btn.style.color = 'white';
        btn.style.border = '1px solid white';
        btn.style.borderRadius = '50px';
        btn.style.zIndex = '9999';
        btn.style.cursor = 'pointer';
        
        btn.onclick = () => {
            this.bgm.play();
            btn.style.display = 'none'; // Hide button after clicking
        };
        
        document.body.appendChild(btn);
    }
};

window.addEventListener('DOMContentLoaded', () => AudioEngine.init());
