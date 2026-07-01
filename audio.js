// audio.js v6 - Glassmorphic Vinyl Player with Glass Vinyl
console.log('%c[VinylPlayer v6] audio.js loading... (Glass Vinyl mode)', 'color:#64748b; font-family:monospace');

(function() {
  'use strict';

  function initVinylPlayer() {
    const oldContainer = document.getElementById('vinyl-player-v6-container');
    if (oldContainer) oldContainer.remove();
    const oldStyle = document.getElementById('vinyl-player-v6-styles');
    if (oldStyle) oldStyle.remove();

    const style = document.createElement('style');
    style.id = 'vinyl-player-v6-styles';
    style.textContent = `
      #vinyl-player-v6-container {
        position: fixed !important;
        top: 14px !important;
        right: 14px !important;
        width: 122px !important;
        height: 122px !important;
        z-index: 2147483647 !important;
        cursor: pointer !important;
        user-select: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }

      /* Glassmorphism Container */
      #vinyl-player-v6-container .glass-card {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        background: rgba(18, 23, 38, 0.55) !important;
        backdrop-filter: blur(18px) saturate(160%) !important;
        -webkit-backdrop-filter: blur(18px) saturate(160%) !important;
        border-radius: 18px !important;
        border: 1px solid rgba(148, 163, 184, 0.16) !important;
        box-shadow: 
          0 12px 30px rgba(0, 0, 0, 0.35),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          inset 0 -1px 0 rgba(0, 0, 0, 0.35) !important;
        overflow: hidden !important;
      }

      #vinyl-player-v6-container .glass-card::before {
        content: '' !important;
        position: absolute !important;
        inset: 0 !important;
        background: radial-gradient(circle at 35% 28%, rgba(255,255,255,0.06) 0%, transparent 55%) !important;
        pointer-events: none !important;
        z-index: 1 !important;
      }

      /* === GLASS VINYL === */
      #vinyl-player-v6-container .vinyl-wrapper {
        position: absolute !important;
        left: 11px !important;
        top: 11px !important;
        width: 78px !important;
        height: 78px !important;
        z-index: 2 !important;
      }

      #vinyl-player-v6-container .vinyl {
        width: 100% !important;
        height: 100% !important;
        border-radius: 50% !important;
        background: rgba(12, 14, 20, 0.75) !important;
        position: relative !important;
        box-shadow: 
          /* Glass depth + grooves */
          inset 0 0 0 2px rgba(255,255,255,0.08),
          inset 0 0 0 5px rgba(0,0,0,0.6),
          inset 0 0 0 9px rgba(255,255,255,0.05),
          inset 0 0 0 13px rgba(0,0,0,0.55),
          inset 0 0 0 18px rgba(255,255,255,0.04),
          inset 0 0 0 23px rgba(0,0,0,0.5),
          inset 0 0 0 28px rgba(12,14,20,0.7),
          /* Outer glass rim */
          0 5px 14px rgba(0,0,0,0.5),
          0 0 0 3.5px rgba(255,255,255,0.12),
          0 0 0 5.5px rgba(0,0,0,0.65) !important;
      }

      /* Strong glass specular highlight (top-left) */
      #vinyl-player-v6-container .vinyl::before {
        content: '' !important;
        position: absolute !important;
        top: 3% !important;
        left: 6% !important;
        width: 52% !important;
        height: 50% !important;
        background: radial-gradient(
          ellipse at 28% 26%,
          rgba(255,255,255,0.38) 0%,
          rgba(255,255,255,0.14) 28%,
          rgba(255,255,255,0.04) 48%,
          transparent 68%
        ) !important;
        border-radius: 50% !important;
        pointer-events: none !important;
        z-index: 3 !important;
      }

      /* Second highlight for glass thickness (bottom-right rim) */
      #vinyl-player-v6-container .vinyl::after {
        content: '' !important;
        position: absolute !important;
        bottom: 6% !important;
        right: 7% !important;
        width: 38% !important;
        height: 36% !important;
        background: radial-gradient(
          ellipse at 65% 65%,
          rgba(255,255,255,0.12) 0%,
          transparent 55%
        ) !important;
        border-radius: 50% !important;
        pointer-events: none !important;
        z-index: 3 !important;
      }

      /* Center label (slightly glassy too) */
      #vinyl-player-v6-container .vinyl .label {
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        width: 22px !important;
        height: 22px !important;
        background: linear-gradient(145deg, rgba(241,245,249,0.95), rgba(226,232,240,0.9)) !important;
        border-radius: 50% !important;
        box-shadow: 
          inset 0 0 0 1px #334155,
          inset 0 0 0 3.5px #1e2937,
          0 2px 5px rgba(0,0,0,0.4) !important;
        z-index: 5 !important;
      }

      /* Spinning */
      #vinyl-player-v6-container .vinyl.playing {
        animation: vinyl-spin-v6 1.85s linear infinite !important;
      }

      @keyframes vinyl-spin-v6 {
        from { transform: rotate(0deg) !important; }
        to { transform: rotate(360deg) !important; }
      }

      /* === TONEARM === */
      #vinyl-player-v6-container .tonearm-assembly {
        position: absolute !important;
        right: 10px !important;
        top: 22px !important;
        width: 52px !important;
        height: 52px !important;
        transform-origin: 40px 16px !important;
        transition: transform 420ms cubic-bezier(0.23, 1, 0.32, 1) !important;
        z-index: 7 !important;
      }

      #vinyl-player-v6-container .tonearm-pivot {
        position: absolute !important;
        right: 0 !important;
        top: 4px !important;
        width: 15px !important;
        height: 15px !important;
        background: linear-gradient(135deg, #64748b, #475569) !important;
        border-radius: 50% !important;
        border: 1px solid #1e2937 !important;
        box-shadow: 0 2px 5px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4) !important;
        z-index: 8 !important;
      }

      #vinyl-player-v6-container .tonearm-arm {
        position: absolute !important;
        right: 12px !important;
        top: 9px !important;
        width: 36px !important;
        height: 4px !important;
        background: linear-gradient(to right, #475569, #94a3b8, #64748b) !important;
        border-radius: 2px !important;
        box-shadow: 0 2px 5px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.5) !important;
        z-index: 7 !important;
      }

      #vinyl-player-v6-container .tonearm-counterweight {
        position: absolute !important;
        right: 5px !important;
        top: 5px !important;
        width: 8px !important;
        height: 8px !important;
        background: linear-gradient(#64748b, #334155) !important;
        border-radius: 50% !important;
        border: 1px solid #1e2937 !important;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.35) !important;
        z-index: 9 !important;
      }

      #vinyl-player-v6-container .tonearm-headshell {
        position: absolute !important;
        right: 43px !important;
        top: 6px !important;
        width: 9px !important;
        height: 7px !important;
        background: #334155 !important;
        border: 1px solid #475569 !important;
        border-radius: 1.5px !important;
        z-index: 10 !important;
      }

      #vinyl-player-v6-container .tonearm-stylus {
        position: absolute !important;
        right: 49px !important;
        top: 11px !important;
        width: 3.5px !important;
        height: 3.5px !important;
        background: #111113 !important;
        border: 1px solid #64748b !important;
        border-radius: 1px !important;
        z-index: 11 !important;
      }

      /* Soft LED */
      #vinyl-player-v6-container .status-led {
        position: absolute !important;
        bottom: 9px !important;
        right: 9px !important;
        width: 5px !important;
        height: 5px !important;
        border-radius: 50% !important;
        background: #475569 !important;
        transition: all 0.3s ease !important;
        z-index: 13 !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);

    // ==================== HTML ====================
    const container = document.createElement('div');
    container.id = 'vinyl-player-v6-container';

    container.innerHTML = `
      <div class="glass-card">
        <div class="vinyl-wrapper">
          <div class="vinyl" id="vinyl-v6">
            <div class="label"></div>
          </div>
        </div>

        <div class="tonearm-assembly" id="tonearm-assembly-v6">
          <div class="tonearm-pivot"></div>
          <div class="tonearm-arm"></div>
          <div class="tonearm-counterweight"></div>
          <div class="tonearm-headshell"></div>
          <div class="tonearm-stylus"></div>
        </div>

        <div class="status-led" id="status-led-v6"></div>
      </div>
    `;

    document.body.appendChild(container);

    // ==================== LOGIC ====================
    const vinyl = document.getElementById('vinyl-v6');
    const tonearm = document.getElementById('tonearm-assembly-v6');
    const led = document.getElementById('status-led-v6');

    const audio = new Audio('bg-music.mp3');
    audio.loop = true;
    audio.volume = 0.82;

    let isPlaying = false;

    tonearm.style.transform = 'rotate(-58deg)';
    vinyl.classList.remove('playing');
    led.style.background = '#475569';
    led.style.boxShadow = 'none';
    led.style.opacity = '0.5';

    function updateVisuals(playing) {
      if (playing) {
        vinyl.classList.add('playing');
        tonearm.style.transform = 'rotate(-11deg)';
        led.style.background = '#67e8f9';
        led.style.boxShadow = '0 0 6px #67e8f9';
        led.style.opacity = '0.95';
      } else {
        vinyl.classList.remove('playing');
        tonearm.style.transform = 'rotate(-58deg)';
        led.style.background = '#475569';
        led.style.boxShadow = 'none';
        led.style.opacity = '0.5';
      }
    }

    function togglePlayback() {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
        updateVisuals(false);
      } else {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            isPlaying = true;
            updateVisuals(true);
          }).catch((err) => {
            console.warn('%c[VinylPlayer v6] Playback needs user interaction', 'color:#f59e0b', err);
          });
        }
      }
    }

    container.addEventListener('click', togglePlayback);

    container.setAttribute('tabindex', '0');
    container.setAttribute('role', 'button');
    container.setAttribute('aria-label', 'Play our story');
    container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePlayback();
      }
    });

    console.log('%c[VinylPlayer v6] Glass vinyl + glassmorphic player ready.', 'color:#67e8f9; font-family:monospace');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVinylPlayer);
  } else {
    initVinylPlayer();
  }
})();
