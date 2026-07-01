(function() {
    // 1. Remove previous instance
    const existing = document.getElementById('vinyl-player-root');
    if (existing) existing.remove();

    // 2. High-Fidelity Styles
    const style = document.createElement('style');
    style.innerHTML = `
        #vinyl-player-root { position: fixed; top: 30px; right: 30px; z-index: 999999; cursor: pointer; display: flex; align-items: center; }
        
        /* The Record with Grooves */
        #vinyl-disc {
            width: 90px; height: 90px; border-radius: 50%;
            background: radial-gradient(circle, #333 10%, #111 20%, #000 30%, #111 40%, #000 50%, #111 60%, #000 70%, #111 80%, #000 90%, #111 100%);
            border: 2px solid #222; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            display: flex; align-items: center; justify-content: center; position: relative;
            transition: transform 0.3s;
        }
        /* Glossy Reflection */
        #vinyl-disc::after {
            content: ""; position: absolute; width: 100%; height: 100%; border-radius: 50%;
            background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%);
            pointer-events: none;
        }
        #vinyl-label { width: 35px; height: 35px; border-radius: 50%; background: #c62828; box-shadow: inset 0 0 10px rgba(0,0,0,0.4); border: 2px solid #fff; }

        /* The Pin / Tonearm */
        #tonearm {
            width: 70px; height: 8px; background: linear-gradient(to right, #ccc, #eee);
            position: absolute; top: -5px; right: 35px;
            transform-origin: 100% 50%; transform: rotate(-30deg); 
            transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            z-index: -1; box-shadow: 2px 2px 5px rgba(0,0,0,0.4);
        }
        .playing-arm { transform: rotate(-15deg) !important; }
        
        .spinning { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);

    // 3. Inject Structure
    const root = document.createElement('div');
    root.id = 'vinyl-player-root';
    root.innerHTML = `<div id="tonearm"></div><div id="vinyl-disc"><div id="vinyl-label"></div></div>`;
    document.body.appendChild(root);

    // 4. Audio Engine
    const audio = new Audio('bg-music.mp3');
    audio.loop = true;
    const disc = document.getElementById('vinyl-disc');
    const arm = document.getElementById('tonearm');
    let playing = false;

    root.onclick = () => {
        if (!playing) {
            audio.play().catch(e => console.log("User tap required"));
            disc.classList.add('spinning');
            arm.classList.add('playing-arm');
            playing = true;
        } else {
            audio.pause();
            disc.classList.remove('spinning');
            arm.classList.remove('playing-arm');
            playing = false;
        }
    };
})();
