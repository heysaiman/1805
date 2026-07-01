// audio.js v3 - Luxury Realistic Vinyl Player
console.log('%c[VinylPlayer v3] audio.js loading...', 'color:#64748b; font-family:monospace');

(function() {
  'use strict';

  function initVinylPlayer() {
    // Remove previous instance if exists (for easy updates)
    const old = document.getElementById('vinyl-player-v3-container');
    if (old) old.remove();

    const oldStyle = document.getElementById('vinyl-player-v3-styles');
    if (oldStyle) oldStyle.remove();

    // ========== INJECT STYLES ==========
    const style = document.createElement('style');
    style.id = 'vinyl-player-v3-styles';
    style.textContent = `
      #vinyl-player-v3-container {
        position: fixed !important;
        top: 18px !important;
        right: 18px !important;
        width: 162px !important;
        height: 162px !important;
        z-index: 2147483647 !important;
        cursor: pointer !important;
        user-select: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }

      #vinyl-player-v3-container .plinth {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        background: #1e2937 !important;
        border-radius: 18px !important;
        box-shadow: 
          0 10px 30px rgba(0,0,0,0.55),
          inset 0 1px 0 rgba(255,255,255,0.08),
          inset 0 -1px 0 rgba(0,0,0,0.6) !important;
        overflow: hidden !important;
        border: 1px solid rgba(148,163,184,0.15) !important;
      }

      /* Subtle brushed metal texture on plinth */
      #vinyl-player-v3-container .plinth::before {
        content: '' !important;
        position: absolute !important;
        inset: 0 !important;
        background-image: 
          repeating-linear-gradient(
            92deg,
            rgba(255,255,255,0.035) 0px,
            rgba(255,255,255,0.035) 1px,
            transparent 1px,
            transparent 3px
          ) !important;
        pointer-events: none !important;
        z-index: 1 !important;
      }

      /* Vinyl */
      #vinyl-player-v3-container .vinyl-wrapper {
        position: absolute !important;
        left: 14px !important;
        top: 14px !important;
        width: 108px !important;
        height: 108px !important;
        z-index: 2 !important;
      }

      #vinyl-player-v3-container .vinyl {
        width: 100% !important;
        height: 100% !important;
        border-radius: 50% !important;
        background: #0a0a0a !important;
        box-shadow: 
          inset 0 0 0 2px #222,
          inset 0 0 0 5px #1a1a1a,
          inset 0 0 0 9px #111,
          inset 0 0 0 13px #1f1f1f,
          inset 0 0 0 17px #0f0f0f,
          inset 0 0 0 22px #222,
          inset 0 0 0 27px #1a1a1a,
          inset 0 0 0 32px #111,
          0 6px 16px rgba(0,0,0,0.7),
          0 0 0 4px #333 !important;
        position: relative !important;
        transition: box-shadow 0.3s ease !important;
      }

      /* Glossy highlight on vinyl */
      #vinyl-player-v3-container .vinyl::before {
        content: '' !important;
        position: absolute !important;
        top: 6% !important;
        left: 10% !important;
        width: 48% !important;
        height: 44% !important;
        background: radial-gradient(
          ellipse at 35% 30%,
          rgba(255,255,255,0.22) 0%,
          rgba(255,255,255,0.06) 35%,
          transparent 65%
        ) !important;
        border-radius: 50% !important;
        pointer-events: none !important;
        z-index: 3 !important;
      }

      /* Center label */
      #vinyl-player-v3-container .vinyl::after {
        content: '' !important;
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        width: 32px !important;
        height: 32px !important;
        background: #f1f5f9 !important;
        border-radius: 50% !important;
        box-shadow: 
          inset 0 0 0 1.5px #334155,
          inset 0 0 0 4px #1e2937,
          0 2px 6px rgba(0,0,0,0.5) !important;
        z-index: 4 !important;
      }

      /* Spinning animation */
      #vinyl-player-v3-container .vinyl.playing {
        animation: vinyl-spin-v3 1.82s linear infinite !important;
      }

      @keyframes vinyl-spin-v3 {
        from { transform: rotate(0deg) !important; }
        to { transform: rotate(360deg) !important; }
      }

      /* Tonearm Assembly */
      #vinyl-player-v3-container .tonearm-assembly {
        position: absolute !important;
        right: 18px !important;
        top: 38px !important;
        width: 72px !important;
        height: 72px !important;
        transform-origin: 58px 22px !important; /* Pivot point */
        transition: transform 420ms cubic-bezier(0.23, 1, 0.32, 1) !important;
        z-index: 5 !important;
      }

      /* Pivot base */
      #vinyl-player-v3-container .tonearm-pivot {
        position: absolute !important;
        right: 0 !important;
        top: 8px !important;
        width: 22px !important;
        height: 22px !important;
        background: linear-gradient(145deg, #64748b, #334155) !important;
        border-radius: 50% !important;
        box-shadow: 
          0 2px 6px rgba(0,0,0,0.5),
          inset 0 1px 0 rgba(255,255,255,0.35),
          inset 0 -2px 3px rgba(0,0,0,0.4) !important;
        border: 1px solid #475569 !important;
        z-index: 6 !important;
      }

      /* Tonearm arm */
      #vinyl-player-v3-container .tonearm-arm {
        position: absolute !important;
        right: 18px !important;
        top: 16px !important;
        width: 52px !important;
        height: 5.5px !important;
        background: linear-gradient(to right, #475569, #e2e8f0, #64748b, #475569) !important;
        border-radius: 3px !important;
        box-shadow: 
          0 3px 8px rgba(0,0,0,0.4),
          inset 0 1px 0 rgba(255,255,255,0.5),
          inset 0 -1px 0 rgba(0,0,0,0.3) !important;
        z-index: 5 !important;
      }

      /* Headshell */
      #vinyl-player-v3-container .tonearm-headshell {
        position: absolute !important;
        right: 62px !important;
        top: 11px !important;
        width: 14px !important;
        height: 11px !important;
        background: linear-gradient(#334155, #1e2937) !important;
        border: 1px solid #64748b !important;
        border-radius: 2px !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.4) !important;
        z-index: 7 !important;
      }

      /* Stylus */
      #vinyl-player-v3-container .tonearm-stylus {
        position: absolute !important;
        right: 71px !important;
        top: 19px !important;
        width: 5px !important;
        height: 5px !important;
        background: #1e2937 !important;
        border: 1px solid #94a3b8 !important;
        border-radius: 1px !important;
        z-index: 8 !important;
      }

      /* Status LED */
      #vinyl-player-v3-container .status-led {
        position: absolute !important;
        bottom: 11px !important;
        left: 11px !important;
        width: 7px !important;
        height: 7px !important;
        border-radius: 50% !important;
        background: #475569 !important;
        box-shadow: none !important;
        transition: all 0.3s ease !important;
        z-index: 10 !important;
        pointer-events: none !important;
      }

      /* Active press effect */
      #vinyl-player-v3-container:active {
        transform: scale(0.96) !important;
        transition: transform 0.1s ease !important;
      }
    `;
    document.head.appendChild(style);

    // ========== CREATE DOM ==========
    const container = document.createElement('div');
    container.id = 'vinyl-player-v3-container';

    container.innerHTML = `
      <div class="plinth">
        <!-- Vinyl -->
        <div class="vinyl-wrapper">
          <div class="vinyl" id="vinyl-v3"></div>
        </div>

        <!-- Tonearm -->
        <div class="tonearm-assembly" id="tonearm-assembly-v3">
          <div class="tonearm-pivot"></div>
          <div class="tonearm-arm"></div>
          <div class="tonearm-headshell"></div>
          <div class="tonearm-stylus"></div>
        </div>

        <!-- Status LED -->
        <div class="status-led" id="status-led-v3"></div>
      </div>
    `;

    document.body.appendChild(container);

    // Get references
    const vinyl = document.getElementById('vinyl-v3');
    const tonearmAssembly = document.getElementById('tonearm-assembly-v3');
    const led = document.getElementById('status-led-v3');

    // Audio setup
    const audio = new Audio('bg-music.mp3');
    audio.loop = true;
    audio.volume = 0.82;

    let isPlaying = false;

    // Initial state (parked)
    tonearmAssembly.style.transform = 'rotate(-68deg)';
    vinyl.classList.remove('playing');
    led.style.background = '#475569';
    led.style.boxShadow = 'none';
    led.style.opacity = '0.6';

    function updateVisuals(playing) {
      if (playing) {
        vinyl.classList.add('playing');
        tonearmAssembly.style.transform = 'rotate(-14deg)';
        led.style.background = '#22c55e';
        led.style.boxShadow = '0 0 8px #22c55e, 0 0 16px rgba(34, 197, 94, 0.35)';
        led.style.opacity = '1';
      } else {
        vinyl.classList.remove('playing');
        tonearmAssembly.style.transform = 'rotate(-68deg)';
        led.style.background = '#475569';
        led.style.boxShadow = 'none';
        led.style.opacity = '0.6';
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
            console.warn('%c[VinylPlayer v3] Playback blocked (needs user gesture):', 'color:#f59e0b', err);
          });
        }
      }
    }

    // Click anywhere on player to toggle
    container.addEventListener('click', togglePlayback);

    // Keyboard accessibility
    container.setAttribute('tabindex', '0');
    container.setAttribute('role', 'button');
    container.setAttribute('aria-label', 'Premium vinyl music player. Click to play or pause.');
    container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePlayback();
      }
    });

    console.log('%c[VinylPlayer v3] Realistic luxury vinyl player initialized. Click the player to toggle playback.', 'color:#22c55e; font-family:monospace');
  }

  // Boot when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVinylPlayer);
  } else {
    initVinylPlayer();
  }
})();
