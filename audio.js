(function() {
    // 1. Clean up old elements
    const existing = document.getElementById('vinyl-player-root');
    if (existing) existing.remove();

    // 2. High-Fidelity Styles
    const style = document.createElement('style');
    style.innerHTML = `
        #vinyl-player-root { position: fixed; top: 15px; right: 15px; z-index: 999999; display: flex; align-items: center; justify-content: center; }
        
        /* The Record (Glassmorphism) */
        #vinyl-disc {
            width: 60px; height: 60px; border-radius: 50%;
            background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            display: flex; align-items: center; justify-content: center; position: relative;
            cursor: pointer; transition: transform 0.3s;
        }
        #vinyl-disc::before { content: ""; position: absolute; width: 90%; height: 90%; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); }
        #vinyl-disc::after { content: ""; position: absolute; width: 100%; height: 100%; border-radius: 50%; background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%); }
        #vinyl-label { width: 20px; height: 20px; border-radius: 50%; background: #c62828; z-index: 2; box-shadow: inset 0 0 5px rgba(0,0,0,0.5); }
        
        /* The Corner-Anchored Hinge & Tonearm */
        #tonearm-hinge { position: fixed; top: 0; right: 0; width: 30px; height: 30px; z-index: -1; }
        #tonearm {
            width: 70px; height: 4px; background: linear-gradient(to right, #ccc, #fff);
            position: absolute; top: 10px; right: 10px;
            transform-origin: 100% 0%; /* Pivots from the very corner */
            transform: rotate(45deg); /* Parked position */
            transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
        }
        .playing-arm { transform: rotate(15deg) !important; }
        
        .spinning { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);

    // 3. Inject Structure
    const root = document.createElement('div');
    root.id = 'vinyl-player-root';
    root.innerHTML = `<div id="tonearm-hinge"><div id="tonearm"></div></div><div id="vinyl-disc"><div id="vinyl-label"></div></div>`;
    document.body.appendChild(root);

    // 4. Audio Engine
    const audio = new Audio('bg-music.mp3');
    audio.loop = true;
    const disc = document.getElementById('vinyl-disc');
    const arm = document.getElementById('tonearm');
    let playing = false;

    // Toggle Logic
    const toggle = () => {
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

    root.onclick = (e) => {
        e.stopPropagation();
        toggle();
    };
})();
