// audio.js v4 - Ultra Realistic Glassmorphic Luxury Vinyl Player
console.log('%c[VinylPlayer v4] audio.js loading... (Maximum realism mode)', 'color:#64748b; font-family:monospace');

(function() {
  'use strict';

  function initVinylPlayer() {
    // Cleanup previous version
    const oldContainer = document.getElementById('vinyl-player-v4-container');
    if (oldContainer) oldContainer.remove();
    const oldStyle = document.getElementById('vinyl-player-v4-styles');
    if (oldStyle) oldStyle.remove();

    // ==================== STYLES ====================
    const style = document.createElement('style');
    style.id = 'vinyl-player-v4-styles';
    style.textContent = `
      #vinyl-player-v4-container {
        position: fixed !important;
        top: 16px !important;
        right: 16px !important;
        width: 188px !important;
        height: 188px !important;
        z-index: 2147483647 !important;
        cursor: pointer !important;
        user-select: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }

      /* Glassmorphism Container */
      #vinyl-player-v4-container .glass-card {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        background: rgba(15, 23, 42, 0.52) !important;
        backdrop-filter: blur(22px) saturate(180%) !important;
        -webkit-backdrop-filter: blur(22px) saturate(180%) !important;
        border-radius: 22px !important;
        border: 1px solid rgba(148, 163, 184, 0.18) !important;
        box-shadow: 
          0 20px 45px rgba(0, 0, 0, 0.45),
          0 8px 20px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.12),
          inset 0 -1px 0 rgba(0, 0, 0, 0.4) !important;
        overflow: hidden !important;
      }

      /* Subtle inner glow for luxury feel */
      #vinyl-player-v4-container .glass-card::before {
        content: '' !important;
        position: absolute !important;
        inset: 0 !important;
        background: radial-gradient(
          circle at 30% 25%,
          rgba(255,255,255,0.07) 0%,
          transparent 60%
        ) !important;
        pointer-events: none !important;
        z-index: 1 !important;
      }

      /* === VINYL === */
      #vinyl-player-v4-container .vinyl-wrapper {
        position: absolute !important;
        left: 17px !important;
        top: 17px !important;
        width: 118px !important;
        height: 118px !important;
        z-index: 2 !important;
      }

      #vinyl-player-v4-container .vinyl {
        width: 100% !important;
        height: 100% !important;
        border-radius: 50% !important;
        background: #0c0c0e !important;
        position: relative !important;
        box-shadow: 
          /* Deep groove layers */
          inset 0 0 0 2px #1f1f23,
          inset 0 0 0 5px #161618,
          inset 0 0 0 9px #0f0f11,
          inset 0 0 0 13px #1a1a1e,
          inset 0 0 0 18px #121214,
          inset 0 0 0 23px #1f1f23,
          inset 0 0 0 28px #0f0f11,
          inset 0 0 0 33px #161618,
          inset 0 0 0 38px #0c0c0e,
          inset 0 0 0 43px #1a1a1e,
          inset 0 0 0 48px #121214,
          /* Outer rim + depth */
          0 8px 22px rgba(0,0,0,0.65),
          0 0 0 5px #222226,
          0 0 0 7px #161618 !important;
      }

      /* Top-left specular highlight (luxury gloss) */
      #vinyl-player-v4-container .vinyl::before {
        content: '' !important;
        position: absolute !important;
        top: 4% !important;
        left: 8% !important;
        width: 52% !important;
        height: 48% !important;
        background: radial-gradient(
          ellipse at 32% 28%,
          rgba(255,255,255,0.28) 0%,
          rgba(255,255,255,0.09) 32%,
          transparent 62%
        ) !important;
        border-radius: 50% !important;
        pointer-events: none !important;
        z-index: 3 !important;
      }

      /* Elegant center label */
      #vinyl-player-v4-container .vinyl::after {
        content: '' !important;
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        width: 34px !important;
        height: 34px !important;
        background: linear-gradient(145deg, #f1f5f9, #e2e8f0) !important;
        border-radius: 50% !important;
        box-shadow: 
          inset 0 0 0 1.5px #334155,
          inset 0 0 0 5px #1e2937,
          0 3px 8px rgba(0,0,0,0.55),
          inset 0 -2px 3px rgba(255,255,255,0.6) !important;
        z-index: 4 !important;
      }

      /* Spinning */
      #vinyl-player-v4-container .vinyl.playing {
        animation: vinyl-spin-v4 1.78s linear infinite !important;
      }

      @keyframes vinyl-spin-v4 {
        from { transform: rotate(0deg) !important; }
        to { transform: rotate(360deg) !important; }
      }

      /* === TONEARM (Highly Detailed) === */
      #vinyl-player-v4-container .tonearm-assembly {
        position: absolute !important;
        right: 14px !important;
        top: 32px !important;
        width: 78px !important;
        height: 78px !important;
        transform-origin: 62px 24px !important;
        transition: transform 480ms cubic-bezier(0.23, 1.0, 0.32, 1) !important;
        z-index: 6 !important;
      }

      /* Pivot Base (metallic raised) */
      #vinyl-player-v4-container .tonearm-pivot {
        position: absolute !important;
        right: 0 !important;
        top: 6px !important;
        width: 24px !important;
        height: 24px !important;
        background: linear-gradient(135deg, #64748b 0%, #475569 45%, #334155 100%) !important;
        border-radius: 50% !important;
        border: 1px solid #1e2937 !important;
        box-shadow: 
          0 3px 8px rgba(0,0,0,0.5),
          inset 0 2px 0 rgba(255,255,255,0.45),
          inset 0 -3px 4px rgba(0,0,0,0.45) !important;
        z-index: 7 !important;
      }

      /* Small screw detail on pivot */
      #vinyl-player-v4-container .tonearm-pivot::after {
        content: '' !important;
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        width: 5px !important;
        height: 5px !important;
        background: #1e2937 !important;
        border-radius: 50% !important;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.3) !important;
      }

      /* Main Tonearm Tube */
      #vinyl-player-v4-container .tonearm-arm {
        position: absolute !important;
        right: 20px !important;
        top: 14px !important;
        width: 54px !important;
        height: 6px !important;
        background: linear-gradient(
          to right,
          #475569 0%,
          #94a3b8 18%,
          #e2e8f0 38%,
          #cbd5e1 52%,
          #64748b 78%,
          #475569 100%
        ) !important;
        border-radius: 3px !important;
        box-shadow: 
          0 4px 10px rgba(0,0,0,0.45),
          inset 0 1.5px 0 rgba(255,255,255,0.6),
          inset 0 -1.5px 0 rgba(0,0,0,0.35) !important;
        z-index: 6 !important;
      }

      /* Rear Counterweight (elegant sphere) */
      #vinyl-player-v4-container .tonearm-counterweight {
        position: absolute !important;
        right: 8px !important;
        top: 7px !important;
        width: 13px !important;
        height: 13px !important;
        background: linear-gradient(145deg, #64748b, #334155) !important;
        border-radius: 50% !important;
        border: 1px solid #1e2937 !important;
        box-shadow: 
          0 2px 5px rgba(0,0,0,0.5),
          inset 0 2px 0 rgba(255,255,255,0.4),
          inset 0 -2px 3px rgba(0,0,0,0.5) !important;
        z-index: 8 !important;
      }

      /* Headshell */
      #vinyl-player-v4-container .tonearm-headshell {
        position: absolute !important;
        right: 66px !important;
        top: 9px !important;
        width: 15px !important;
        height: 12px !important;
        background: linear-gradient(#334155, #1e2937) !important;
        border: 1px solid #475569 !important;
        border-radius: 2px !important;
        box-shadow: 0 2px 5px rgba(0,0,0,0.4) !important;
        z-index: 9 !important;
      }

      /* Stylus / Cartridge tip */
      #vinyl-player-v4-container .tonearm-stylus {
        position: absolute !important;
        right: 76px !important;
        top: 17px !important;
        width: 5px !important;
        height: 5px !important;
        background: #111113 !important;
        border: 1px solid #64748b !important;
        border-radius: 1px !important;
        box-shadow: 0 1px 3px rgba(0,0,0,0.6) !important;
        z-index: 10 !important;
      }

      /* Elegant Status LED (bottom right) */
      #vinyl-player-v4-container .status-led {
        position: absolute !important;
        bottom: 13px !important;
        right: 13px !important;
        width: 6px !important;
        height: 6px !important;
        border-radius: 50% !important;
        background: #475569 !important;
        box-shadow: none !important;
        transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1) !important;
        z-index: 12 !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);

    // ==================== HTML STRUCTURE ====================
    const container = document.createElement('div');
    container.id = 'vinyl-player-v4-container';

    container.innerHTML = `
      <div class="glass-card">
        <!-- Vinyl Record -->
        <div class="vinyl-wrapper">
          <div class="vinyl" id="vinyl-v4"></div>
        </div>

        <!-- Detailed Tonearm -->
        <div class="tonearm-assembly" id="tonearm-assembly-v4">
          <div class="tonearm-pivot"></div>
          <div class="tonearm-arm"></div>
          <div class="tonearm-counterweight"></div>
          <div class="tonearm-headshell"></div>
          <div class="tonearm-stylus"></div>
        </div>

        <!-- Status LED -->
        <div class="status-led" id="status-led-v4"></div>
      </div>
    `;

    document.body.appendChild(container);

    // ==================== LOGIC ====================
    const vinyl = document.getElementById('vinyl-v4');
    const tonearm = document.getElementById('tonearm-assembly-v4');
    const led = document.getElementById('status-led-v4');

    const audio = new Audio('bg-music.mp3');
    audio.loop = true;
    audio.volume = 0.85;

    let isPlaying = false;

    // Initial parked state
    tonearm.style.transform = 'rotate(-62deg)';
    vinyl.classList.remove('playing');
    led.style.background = '#475569';
    led.style.boxShadow = 'none';
    led.style.opacity = '0.55';

    function updateVisuals(playing) {
      if (playing) {
        vinyl.classList.add('playing');
        tonearm.style.transform = 'rotate(-12deg)';
        led.style.background = '#22c55e';
        led.style.boxShadow = '0 0 7px #22c55e, 0 0 14px rgba(34,197,94,0.4)';
        led.style.opacity = '1';
      } else {
        vinyl.classList.remove('playing');
        tonearm.style.transform = 'rotate(-62deg)';
        led.style.background = '#475569';
        led.style.boxShadow = 'none';
        led.style.opacity = '0.55';
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
            console.warn('%c[VinylPlayer v4] Autoplay prevented:', 'color:#f59e0b', err);
          });
        }
      }
    }

    // Main interaction
    container.addEventListener('click', togglePlayback);

    // Accessibility
    container.setAttribute('tabindex', '0');
    container.setAttribute('role', 'button');
    container.setAttribute('aria-label', 'Luxury glassmorphic vinyl player. Click to play or pause music.');
    container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePlayback();
      }
    });

    console.log('%c[VinylPlayer v4] Ultra realistic glassmorphic vinyl player ready. Click to toggle playback.', 'color:#22c55e; font-family:monospace');
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVinylPlayer);
  } else {
    initVinylPlayer();
  }
})();
