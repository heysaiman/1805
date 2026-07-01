(function() {
    // 1. Clean up old elements
    const existing = document.getElementById('vinyl-player-root');
    if (existing) existing.remove();

    // 2. High-Fidelity Styles
    const style = document.createElement('style');
    style.innerHTML = `
        /* The Hinge (Bolted to the very corner) */
        #vinyl-hinge { 
            position: fixed; top: 0; right: 0; width: 60px; height: 60px; z-index: 999999;
        }
        
        /* The Tonearm (Anchored to Hinge) */
        #tonearm {
            width: 90px; height: 6px; background: linear-gradient(to right, #ccc, #fff);
            position: absolute; top: 10px; right: 10px;
            transform-origin: 100% 0%; 
            transform: rotate(45deg); /* Parked position */
            transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 2px 2px 5px rgba(0,0,0,0.4); border-radius: 3px;
        }
        .playing-arm { transform: rotate(20deg) !important; }

        /* The Record (Floating slightly below) */
        #vinyl-disc {
            position: fixed; top: 50px; right: 20px; z-index: 999998;
            width: 70px; height: 70px; border-radius: 50%;
            background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 15px rgba(0,0,0,0.4);
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; transition: transform 0.3s;
        }
        #vinyl-disc::before { content: ""; position: absolute; width: 85%; height: 85%; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); }
        #vinyl-label { width: 25px; height: 25px; border-radius: 50%; background: #c62828; box-shadow: inset 0 0 5px rgba(0,0,0,0.5); }
        
        .spinning { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);

    // 3. Inject Structure
    const root = document.createElement('div');
    root.id = 'vinyl-player-root';
    root.innerHTML = `
        <div id="vinyl-hinge"><div id="tonearm"></div></div>
        <div id="vinyl-disc"><div id="vinyl-label"></div></div>
    `;
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
            arm.classList.add('playing-arm'); // Swings onto vinyl
            playing = true;
        } else {
            audio.pause();
            disc.classList.remove('spinning');
            arm.classList.remove('playing-arm'); // Parks back at corner
            playing = false;
        }
    };

    // Listen on the disc, because that's what the user will tap
    disc.onclick = (e) => {
        e.stopPropagation();
        toggle();
    };
})();
