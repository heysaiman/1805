    (function() {
    // 1. Remove anything currently on the page
    const existing = document.getElementById('vinyl-player-ui');
    if (existing) existing.remove();

    // 2. Define Styles (Unified container)
    const style = document.createElement('style');
    style.innerHTML = `
        #vinyl-player-ui { 
            position: fixed; top: 15px; right: 15px; z-index: 999999 !important;
            width: 60px; height: 60px;
            background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2); border-radius: 12px;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            overflow: hidden; /* This keeps the pin inside the box */
        }
        
        #vinyl-record {
            width: 45px; height: 45px; border-radius: 50%;
            background: radial-gradient(circle, #222 30%, #000 50%, #222 100%);
            border: 2px solid #000; box-shadow: inset 0 0 5px #333;
            transition: transform 0.5s ease;
        }

        #vinyl-pin {
            position: absolute; top: 5px; right: 5px;
            width: 30px; height: 4px; background: linear-gradient(to right, #ccc, #fff);
            transform-origin: 100% 50%; transform: rotate(45deg);
            transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border-radius: 2px; z-index: 10;
        }

        .playing-pin { transform: rotate(15deg) !important; }
        .spin { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);

    // 3. Create Structure
    const player = document.createElement('div');
    player.id = 'vinyl-player-ui';
    player.innerHTML = `
        <div id="vinyl-pin"></div>
        <div id="vinyl-record"></div>
    `;
    document.body.appendChild(player);

    // 4. Audio Logic
    const audio = new Audio('bg-music.mp3');
    audio.loop = true;
    const record = document.getElementById('vinyl-record');
    const pin = document.getElementById('vinyl-pin');
    let playing = false;

    player.onclick = () => {
        if (!playing) {
            audio.play().catch(e => console.log("Interaction required"));
            record.classList.add('spin');
            pin.classList.add('playing-pin');
            playing = true;
        } else {
            audio.pause();
            record.classList.remove('spin');
            pin.classList.remove('playing-pin');
            playing = false;
        }
    };
})();
