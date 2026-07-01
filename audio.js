// audio.js v10 - Transparent & Blended Glassmorphic Vinyl Player
console.log('%c[VinylPlayer v10] audio.js loading... (More transparent & blended)', 'color:#64748b; font-family:monospace');

(function() {
  'use strict';

  function initVinylPlayer() {
    const oldContainer = document.getElementById('vinyl-player-v10-container');
    if (oldContainer) oldContainer.remove();
    const oldStyle = document.getElementById('vinyl-player-v10-styles');
    if (oldStyle) oldStyle.remove();

    const style = document.createElement('style');
    style.id = 'vinyl-player-v10-styles';
    style.textContent = `
      #vinyl-player-v10-container {
        position: fixed !important;
        top: 8px !important;
        right: 8px !important;
        width: 74px !important;
        height: 74px !important;
        z-index: 2147483647 !important;
        cursor: pointer !important;
        user-select: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }

      /* More Transparent Glassmorphism */
      #vinyl-player-v10-container .glass-card {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        background: rgba(18, 23, 38, 0.38) !important;
        backdrop-filter: blur(16px) saturate(140%) !important;
        -webkit-backdrop-filter: blur(16px) saturate(140%) !important;
        border-radius: 13px !important;
        border: 1px solid rgba(148, 163, 184, 0.09) !important;
        box-shadow: 
          0 6px 18px rgba(0,0,0,0.22),
          inset 0 1px 0 rgba(255,255,255,0.06) !important;
        overflow: hidden !important;
      }

      /* === GLASS VINYL === */
      #vinyl-player-v10-container .vinyl-wrapper {
        position: absolute !important;
        left: 5px !important;
        top: 5px !important;
        width: 46px !important;
        height: 46px !important;
        z-index: 2 !important;
      }

      #vinyl-player-v10-container .vinyl {
        width: 100% !important;
        height: 100% !important;
        border-radius: 50% !important;
        background: rgba(12, 14, 20, 0.55) !important;
        position: relative !important;
        box-shadow: 
          inset 0 0 0 1px rgba(255,255,255,0.12),
          inset 0 0 0 3.5px rgba(0,0,0,0.5),
          inset 0 0 0 6.5px rgba(255,255,255,0.06),
          inset 0 0 0 9.5px rgba(0,0,0,0.45),
          0 2px 7px rgba(0,0,0,0.3),
          0 0 0 2px rgba(255,255,255,0.08) !important;
      }

      /* Glass highlights */
      #vinyl-player-v10-container .vinyl::before {
        content: '' !important;
        position: absolute !important;
        top: 1% !important;
        left: 4% !important;
        width: 46% !important;
        height: 44% !important;
        background: radial-gradient(
          ellipse at 25% 23%,
          rgba(255,255,255,0.32) 0%,
          rgba(255,255,255,0.1) 26%,
          transparent 55%
        ) !important;
        border-radius: 50% !important;
        pointer-events: none !important;
        z-index: 3 !important;
      }

      /* Center label */
      #vinyl-player-v10-container .vinyl .label {
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        width: 12.5px !important;
        height: 12.5px !important;
        background: linear-gradient(145deg, #f1f5f9, #e2e8f0) !important;
        border-radius: 50% !important;
        box-shadow: inset 0 0 0 1px #334155, inset 0 0 0 2px #1e2937, 0 1px 2.5px rgba(0,0,0,0.3) !important;
        z-index: 5 !important;
      }

      /* Spinning */
      #vinyl-player-v10-container .vinyl.playing {
        animation: vinyl-spin-v10 1.65s linear infinite !important;
      }

      @keyframes vinyl-spin-v10 {
        from { transform: rotate(0deg) !important; }
        to { transform: rotate(360deg) !important; }
      }

      /* === TONEARM === */
      #vinyl-player-v10-container .tonearm-assembly {
        position: absolute !important;
        right: 4px !important;
        top: 12px !important;
        width: 32px !important;
        height: 32px !important;
        transform-origin: 25px 10px !important;
        transition: transform 340ms cubic-bezier(0.23, 1, 0.32, 1) !important;
        z-index: 7 !important;
      }

      #vinyl-player-v10-container .tonearm-pivot {
        position: absolute !important;
        right: 0 !important;
        top: 1px !important;
        width: 9px !important;
        height: 9px !important;
        background: linear-gradient(135deg, #64748b, #475569) !important;
        border-radius: 50% !important;
        border: 1px solid #1e2937 !important;
        box-shadow: 0 1px 2.5px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.4) !important;
        z-index: 8 !important;
      }

      #vinyl-player-v10-container .tonearm-arm {
        position: absolute !important;
        right: 6px !important;
        top: 4px !important;
        width: 22px !important;
        height: 2.5px !important;
        background: linear-gradient(to right, #475569, #94a3b8, #64748b) !important;
        border-radius: 1.5px !important;
        box-shadow: 0 1px 2.5px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5) !important;
        z-index: 7 !important;
      }

      #vinyl-player-v10-container .tonearm-counterweight {
        position: absolute !important;
        right: 2px !important;
        top: 2px !important;
        width: 5px !important;
        height: 5px !important;
        background: linear-gradient(#64748b, #334155) !important;
        border-radius: 50% !important;
        border: 1px solid #1e2937 !important;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.35) !important;
        z-index: 9 !important;
      }

      #vinyl-player-v10-container .tonearm-headshell {
        position: absolute !important;
        right: 25px !important;
        top: 3px !important;
        width: 5.5px !important;
        height: 4px !important;
        background: #334155 !important;
        border: 1px solid #475569 !important;
        border-radius: 1px !important;
        z-index: 10 !important;
      }

      #vinyl-player-v10-container .tonearm-stylus {
        position: absolute !important;
        right: 28px !important;
        top: 5.5px !important;
        width: 2px !important;
        height: 2px !important;
        background: #111113 !important;
        border: 1px solid #64748b !important;
        border-radius: 1px !important;
        z-index: 11 !important;
      }

      /* LED */
      #vinyl-player-v10-container .status-led {
        position: absolute !important;
        bottom: 4px !important;
        right: 4px !important;
        width: 3.5px !important;
        height: 3.5px !important;
        border-radius: 50% !important;
        background: #475569 !important;
        transition: all 0.25s ease !important;
        z-index: 13 !important;
        pointer-events: none !important;
      }

      #vinyl-player-v10-container .status-led.playing {
        animation: led-pulse-v10 1.65s ease-in-out infinite !important;
      }

      @keyframes led-pulse-v10 {
        0%, 100% { box-shadow: 0 0 2.5px #67e8f9; }
        50% { box-shadow: 0 0 6px #67e8f9; }
      }
    `;
    document.head.appendChild(style);

    // ==================== HTML ====================
    const container = document.createElement('div');
    container.id = 'vinyl-player-v10-container';

    container.innerHTML = `
      <div class="glass-card">
        <div class="vinyl-wrapper">
          <div class="vinyl" id="vinyl-v10">
            <div class="label"></div>
          </div>
        </div>

        <div class="tonearm-assembly" id="tonearm-assembly-v10">
          <div class="tonearm-pivot"></div>
          <div class="tonearm-arm"></div>
          <div class="tonearm-counterweight"></div>
          <div class="tonearm-headshell"></div>
          <div class="tonearm-stylus"></div>
        </div>

        <div class="status-led" id="status-led-v10"></div>
      </div>
    `;

    document.body.appendChild(container);

    // ==================== LOGIC ====================
    const vinyl = document.getElementById('vinyl-v10');
    const tonearm = document.getElementById('tonearm-assembly-v10');
    const led = document.getElementById('status-led-v10');

    const audio = new Audio('bg-music.mp3');
    audio.loop = true;
    audio.volume = 0.75;

    let isPlaying = false;

    tonearm.style.transform = 'rotate(-52deg)';
    vinyl.classList.remove('playing');
    led.classList.remove('playing');
    led.style.background = '#475569';

    function updateVisuals(playing) {
      if (playing) {
        vinyl.classList.add('playing');
        tonearm.style.transform = 'rotate(-8deg)';
        led.style.background = '#67e8f9';
        led.classList.add('playing');
      } else {
        vinyl.classList.remove('playing');
        tonearm.style.transform = 'rotate(-52deg)';
        led.style.background = '#475569';
        led.style.boxShadow = 'none';
        led.classList.remove('playing');
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
            console.warn('%c[VinylPlayer v10] Playback needs interaction', 'color:#f59e0b', err);
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

    console.log('%c[VinylPlayer v10] More transparent & blended version ready (74px).', 'color:#67e8f9; font-family:monospace');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVinylPlayer);
  } else {
    initVinylPlayer();
  }
})();
