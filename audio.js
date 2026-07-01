(function() {
    // 1. Remove old versions to force a fresh start
    const old = document.getElementById('vinyl-player-root');
    if (old) old.remove();

    // 2. Inject high-priority styles (Using !important to override everything)
    const style = document.createElement('style');
    style.innerHTML = `
        #vinyl-player-root { position: fixed; top: 25px; right: 25px; z-index: 999999 !important; }
        
        #vinyl-disc {
            width: 70px; height: 70px; border-radius: 50%;
            background: radial-gradient(circle, #333 10%, #111 20%, #000 30%, #222 50%, #000 100%) !important;
            border: 2px solid rgba(255,255,255,0.1); box-shadow: 0 8px 20px rgba(0,0,0,0.5);
            display: flex; align-items: center; justify-content: center; cursor: pointer;
            transition: transform 0.3s ease; position: relative;
        }
        
        #vinyl-label { width: 25px; height: 25px; border-radius: 50%; background: #e53935; border: 2px solid white; box-shadow: inset 0 0 5px rgba(0,0,0,0.5); }
        
        #tonearm {
            width: 80px; height: 6px; background: linear-gradient(to right, #ddd, #fff);
            position: absolute; top: -5px; right: 35px;
            transform-origin: 100% 0%; transform: rotate(45deg);
            transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: -1; box-shadow: 2px 2px 5px rgba(0,0,0,0.3); border-radius: 3px;
        }
        
        .is-playing { transform: rotate(20deg) !important; }
        .spin { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);

    // 3. Inject Structure
    const root = document.createElement('div');
    root.id = 'vinyl-player-root';
    root.innerHTML = `<div id="tonearm"></div><div id="vinyl-disc"><div id="vinyl-label"></div></div>`;
    document.body.appendChild(root);

    // 4. Logic
    const audio = new Audio('bg-music.mp3');
    audio.loop = true;
    const disc = document.getElementById('vinyl-disc');
    const arm = document.getElementById('tonearm');
    let playing = false;

    root.onclick = () => {
        if (!playing) {
            audio.play().catch(e => console.log("Interaction required"));
            disc.classList.add('spin');
            arm.classList.add('is-playing');
            playing = true;
        } else {
            audio.pause();
            disc.classList.remove('spin');
            arm.classList.remove('is-playing');
            playing = false;
        }
    };
})();
