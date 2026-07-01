    (function() {
    // 1. Remove existing container to avoid duplicates
    const old = document.getElementById('vinyl-player-root');
    if (old) old.remove();

    // 2. High-Fidelity Glassmorphism & Vinyl Styles
    const style = document.createElement('style');
    style.innerHTML = `
        #vinyl-player-root { 
            position: fixed; top: 20px; right: 20px; z-index: 999999 !important;
            background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(15px);
            padding: 10px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2);
            display: flex; align-items: center; justify-content: center;
        }
        
        /* The Vinyl Record with Grooves */
        #vinyl-disc {
            width: 70px; height: 70px; border-radius: 50%;
            background: radial-gradient(circle, #222 30%, #000 35%, #222 40%, #000 45%, #222 50%, #000 55%, #111 100%);
            border: 3px solid #111; box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
            display: flex; align-items: center; justify-content: center; cursor: pointer;
            transition: transform 0.5s ease;
        }
        #vinyl-label { width: 25px; height: 25px; border-radius: 50%; background: #c62828; border: 2px solid white; }
        
        /* Metallic Tonearm */
        #tonearm {
            width: 75px; height: 8px; background: linear-gradient(to right, #ccc, #eee, #ccc);
            position: absolute; top: 5px; right: 5px;
            transform-origin: 100% 0%; transform: rotate(45deg);
            transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: -1; box-shadow: 2px 2px 5px rgba(0,0,0,0.4); border-radius: 4px;
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
            audio.play().catch(e => console.log("User interaction required"));
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
