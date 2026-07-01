    (function() {
    // 1. Force removal of ALL old elements
    const old = document.getElementById('vinyl-player-root') || document.getElementById('vinyl-studio-box');
    if (old) old.remove();

    // 2. Ultra-Compact, Anchored Styles
    const style = document.createElement('style');
    style.innerHTML = `
        #vinyl-studio-box { 
            position: fixed; top: 15px; right: 15px; z-index: 999999 !important;
            background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);
            padding: 8px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.2);
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        /* The Disc */
        #vinyl-disc {
            width: 45px; height: 45px; border-radius: 50%;
            background: radial-gradient(circle, #222 20%, #000 50%, #222 100%);
            border: 2px solid #111; cursor: pointer; position: relative;
            display: flex; align-items: center; justify-content: center;
        }
        #vinyl-label { width: 15px; height: 15px; border-radius: 50%; background: #c62828; }
        
        /* The Pin (Anchored to the box) */
        #tonearm {
            width: 40px; height: 4px; background: linear-gradient(to right, #ccc, #fff);
            position: absolute; top: 10px; right: 10px;
            transform-origin: 100% 0%; transform: rotate(45deg);
            transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 10; border-radius: 2px;
        }
        .is-playing { transform: rotate(15deg) !important; }
        .spin { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);

    // 3. Inject Structure
    const root = document.createElement('div');
    root.id = 'vinyl-studio-box';
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
            audio.play().catch(e => console.log("Tap required"));
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
