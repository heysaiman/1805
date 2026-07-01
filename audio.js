// audio.js v7 - Compact & Alive Glassmorphic Vinyl Player
console.log('%c[VinylPlayer v7] audio.js loading... (Compact + Alive)', 'color:#64748b; font-family:monospace');

(function() {
  'use strict';

  function initVinylPlayer() {
    const oldContainer = document.getElementById('vinyl-player-v7-container');
    if (oldContainer) oldContainer.remove();
    const oldStyle = document.getElementById('vinyl-player-v7-styles');
    if (oldStyle) oldStyle.remove();

    const style = document.createElement('style');
    style.id = 'vinyl-player-v7-styles';
    style.textContent = `
      #vinyl-player-v7-container {
        position: fixed !important;
        top: 12px !important;
        right: 12px !important;
        width: 108px !important;
        height: 108px !important;
        z-index: 2147483647 !important;
        cursor: pointer !important;
        user-select: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }

      /* Glassmorphism Container */
      #vinyl-player-v7-container .glass-card {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        background: rgba(18, 23, 38, 0.52) !important;
        backdrop-filter: blur(16px) saturate(155%) !important;
        -webkit-backdrop-filter: blur(16px) saturate(155%) !important;
        border-radius: 16px !important;
        border: 1px solid rgba(148, 163, 184, 0.14) !important;
        box-shadow: 
          0 10px 26px rgba(0,0,0,0.32),
          inset 0 1px 0 rgba(255,255,255,0.09) !important;
        overflow: hidden !important;
      }

      /* === GLASS VINYL (More Alive) === */
      #vinyl-player-v7-container .vinyl-wrapper {
        position: absolute !important;
        left: 9px !important;
        top: 9px !important;
        width: 68px !important;
        height: 68px !important;
        z-index: 2 !important;
      }

      #vinyl-player-v7-container .vinyl {
        width: 100% !important;
        height: 100% !important;
        border-radius: 50% !important;
        background: rgba(12, 14, 20, 0.72) !important;
        position: relative !important;
        box-shadow: 
          inset 0 0 0 1.5px rgba(255,255,255,0.09),
          inset 0 0 0 4px rgba(0,0,0,0.6),
          inset 0 0 0 8px rgba(255,255,255,0.05),
          inset 0 0 0 12px rgba(0,0,0,0.55),
          inset 0 0 0 16px rgba(255,255,255,0.04),
          inset 0 0 0 20px rgba(0,0,0,0.5),
          0 4px 12px rgba(0,0,0,0.45),
          0 0 0 3px rgba(255,255,255,0.1) !important;
        transition: transform 0.2s ease !important;
      }

      /* Glass specular highlights */
      #vinyl-player-v7-container .vinyl::before {
        content: '' !important;
        position: absolute !important;
        top: 2% !important;
        left: 5% !important;
        width: 50% !important;
        height: 48% !important;
        background: radial-gradient(
          ellipse at 26% 24%,
          rgba(255,255,255,0.42) 0%,
          rgba(255,255,255,0.15) 26%,
          transparent 60%
        ) !important;
        border-radius: 50% !important;
        pointer-events: none !important;
        z-index: 3 !important;
      }

      #vinyl-player-v7-container .vinyl::after {
        content: '' !important;
        position: absolute !important;
        bottom: 5% !important;
        right: 6% !important;
        width: 36% !important;
        height: 34% !important;
        background: radial-gradient(
          ellipse at 65% 65%,
          rgba(255,255,255,0.11) 0%,
          transparent 55%
        ) !important;
        border-radius: 50% !important;
        pointer-events: none !important;
        z-index: 3 !important;
      }

      /* Center label */
      #vinyl-player-v7-container .vinyl .label {
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        width: 19px !important;
        height: 19px !important;
        background: linear-gradient(145deg, #f1f5f9, #e2e8f0) !important;
        border-radius: 50% !important;
        box-shadow: 
          inset 0 0 0 1px #334155,
          inset 0 0 0 3px #1e2937,
          0 1.5px 4px rgba(0,0,0,0.4) !important;
        z-index: 5 !important;
      }

      /* Alive spinning + subtle pulse when playing */
      #vinyl-player-v7-container .vinyl.playing {
        animation: vinyl-spin-v7 1.72s linear infinite !important;
      }

      @keyframes vinyl-spin-v7 {
        from { transform: rotate(0deg) !important; }
        to { transform: rotate(360deg) !important; }
      }

      /* === TONEARM (More Responsive) === */
      #vinyl-player-v7-container .tonearm-assembly {
        position: absolute !important;
        right: 8px !important;
        top: 19px !important;
        width: 46px !important;
        height: 46px !important;
        transform-origin: 36px 14px !important;
        transition: transform 380ms cubic-bezier(0.23, 1, 0.32, 1) !important;
        z-index: 7 !important;
      }

      #vinyl-player-v7-container .tonearm-pivot {
        position: absolute !important;
        right: 0 !important;
        top: 3px !important;
        width: 13px !important;
        height: 13px !important;
        background: linear-gradient(135deg, #64748b, #475569) !important;
        border-radius: 50% !important;
        border: 1px solid #1e2937 !important;
        box-shadow: 0 1.5px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4) !important;
        z-index: 8 !important;
      }

      #vinyl-player-v7-container .tonearm-arm {
        position: absolute !important;
        right: 10px !important;
        top: 7px !important;
        width: 32px !important;
        height: 3.5px !important;
        background: linear-gradient(to right, #475569, #94a3b8, #64748b) !important;
        border-radius: 2px !important;
        box-shadow: 0 1.5px 4px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.5) !important;
        z-index: 7 !important;
      }

      #vinyl-player-v7-container .tonearm-counterweight {
        position: absolute !important;
        right: 4px !important;
        top: 4px !important;
        width: 7px !important;
        height: 7px !important;
        background: linear-gradient(#64748b, #334155) !important;
        border-radius: 50% !important;
        border: 1px solid #1e2937 !important;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.35) !important;
        z-index: 9 !important;
      }

      #vinyl-player-v7-container .tonearm-headshell {
        position: absolute !important;
        right: 38px !important;
        top: 5px !important;
        width: 8px !important;
        height: 6px !important;
        background: #334155 !important;
        border: 1px solid #475569 !important;
        border-radius: 1.5px !important;
        z-index: 10 !important;
      }

      #vinyl-player-v7-container .tonearm-stylus {
        position: absolute !important;
        right: 43px !important;
        top: 9px !important;
        width: 3px !important;
        height: 3px !important;
        background: #111113 !important;
        border: 1px solid #64748b !important;
        border-radius: 1px !important;
        z-index: 11 !important;
      }

      /* Alive LED (pulsing when playing) */
      #vinyl-player-v7-container .status-led {
        position: absolute !important;
        bottom: 7px !important;
        right: 7px !important;
        width: 4.5px !important;
        height: 4.5px !important;
        border-radius: 50% !important;
        background: #475569 !important;
        transition: all 0.25s ease !important;
        z-index: 13 !important;
        pointer-events: none !important;
      }

      #vinyl-player-v7-container .status-led.playing {
        animation: led-pulse-v7 1.8s ease-in-out infinite !important;
      }

      @keyframes led-pulse-v7 {
        0%, 100% { box-shadow: 0 0 4px #67e8f9; }
        50% { box-shadow: 0 0 9px #67e8f9; }
      }
    `;
    document.head.appendChild(style);

    // ==================== HTML ====================
    const container = document.createElement('div');
    container.id = 'vinyl-player-v7-container';

    container.innerHTML = `
      <div class="glass-card">
        <div class="vinyl-wrapper">
          <div class="vinyl" id="vinyl-v7">
            <div class="label"></div>
          </div>
        </div>

        <div class="tonearm-assembly" id="tonearm-assembly-v7">
          <div class="tonearm-pivot"></div>
          <div class="tonearm-arm"></div>
          <div class="tonearm-counterweight"></div>
          <div class="tonearm-headshell"></div>
          <div class="tonearm-stylus"></div>
        </div>

        <div class="status-led" id="status-led-v7"></div>
      </div>
    `;

    document.body.appendChild(container);

    // ==================== LOGIC ====================
    const vinyl = document.getElementById('vinyl-v7');
    const tonearm = document.getElementById('tonearm-assembly-v7');
    const led = document.getElementById('status-led-v7');

    const audio = new Audio('bg-music.mp3');
    audio.loop = true;
    audio.volume = 0.8;

    let isPlaying = false;

    // Initial parked state
    tonearm.style.transform = 'rotate(-56deg)';
    vinyl.classList.remove('playing');
    led.classList.remove('playing');
    led.style.background = '#475569';
    led.style.boxShadow = 'none';

    function updateVisuals(playing) {
      if (playing) {
        vinyl.classList.add('playing');
        tonearm.style.transform = 'rotate(-10deg)';
        led.style.background = '#67e8f9';
        led.classList.add('playing');
      } else {
        vinyl.classList.remove('playing');
        tonearm.style.transform = 'rotate(-56deg)';
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
            console.warn('%c[VinylPlayer v7] Playback needs interaction', 'color:#f59e0b', err);
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

    console.log('%c[VinylPlayer v7] Compact + alive glass vinyl player ready.', 'color:#67e8f9; font-family:monospace');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVinylPlayer);
  } else {
    initVinylPlayer();
  }
})();
