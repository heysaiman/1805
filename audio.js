(function() {
    console.log("Vinyl Player Engine: Initializing...");

    // 1. Remove old instances to prevent stacking
    const existing = document.getElementById('vinyl-player-box');
    if (existing) existing.remove();

    // 2. Inject Styles (High-end CSS)
    const style = document.createElement('style');
    style.innerHTML = `
        #vinyl-player-box { position: fixed; top: 20px; right: 20px; z-index: 99999; cursor: pointer; transition: transform 0.3s; }
        #vinyl-player-box:active { transform: scale(0.95); }
        .vinyl-disc { width: 70px; height: 70px; border-radius: 50%; border: 4px solid #1a1a1a;
            background: radial-gradient(circle, #333 20%, #000 20%, #000 25%, #333 25%, #333 30%, #000 30%, #000 35%, #333 35%, #333 40%, #000 40%, #000 100%);
            box-shadow: 0 10px 25px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; }
        .vinyl-label { width: 30%; height: 30%; border-radius: 50%; background: #c62828; box-shadow: inset 0 0 5px rgba(0,0,0,0.5); }
        .is-spinning { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);

    // 3. Create Elements
    const container = document.createElement('div');
    container.id = 'vinyl-player-box';
    container.innerHTML = '<div class="vinyl-disc"><div class="vinyl-label"></div></div>';
    document.body.appendChild(container);

    // 4. Audio Engine
    const audio = new Audio('bg-music.mp3');
    audio.loop = true;
    let isPlaying = false;

    // 5. Interaction
    const toggle = () => {
        const disc = container.querySelector('.vinyl-disc');
        if (isPlaying) {
            audio.pause();
            disc.classList.remove('is-spinning');
        } else {
            audio.play().catch(e => console.error("Audio block:", e));
            disc.classList.add('is-spinning');
        }
        isPlaying = !isPlaying;
    };

    container.onclick = toggle;
    console.log("Vinyl Player Engine: Ready.");
})();
