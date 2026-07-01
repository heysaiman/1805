// audio.js v8 - Ultra Compact Glassmorphic Vinyl Player (Mobile Optimized)
console.log('%c[VinylPlayer v8] audio.js loading... (Ultra compact mobile version)', 'color:#64748b; font-family:monospace');

(function() {
  'use strict';

  function initVinylPlayer() {
    const oldContainer = document.getElementById('vinyl-player-v8-container');
    if (oldContainer) oldContainer.remove();
    const oldStyle = document.getElementById('vinyl-player-v8-styles');
    if (oldStyle) oldStyle.remove();

    const style = document.createElement('style');
    style.id = 'vinyl-player-v8-styles';
    style.textContent = `
      #vinyl-player-v8-container {
        position: fixed !important;
        top: 10px !important;
        right: 10px !important;
        width: 86px !important;
        height: 86px !important;
        z-index: 2147483647 !important;
        cursor: pointer !important;
        user-select: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }

      /* Glassmorphism Container - Compact */
      #vinyl-player-v8-container .glass-card {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        background: rgba(18, 23, 38, 0.55) !important;
        backdrop-filter: blur(14px) saturate(150%) !important;
        -webkit-backdrop-filter: blur(14px) saturate(150%) !important;
        border-radius: 14px !important;
        border: 1px solid rgba(148, 163, 184, 0.13) !important;
        box-shadow: 0 8px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08) !important;
        overflow: hidden !important;
      }

      /* === GLASS VINYL (Compact) === */
      #vinyl-player-v8-container .vinyl-wrapper {
        position: absolute !important;
        left: 7px !important;
        top: 7px !important;
        width: 54px !important;
        height: 54px !important;
        z-index: 2 !important;
      }

      #vinyl-player-v8-container .vinyl {
        width: 100% !important;
        height: 100% !important;
        border-radius: 50% !important;
        background: rgba(12, 14, 20, 0.7) !important;
        position: relative !important;
        box-shadow: 
          inset 0 0 0 1.5px rgba(255,255,255,0.1),
          inset 0 0 0 4px rgba(0,0,0,0.55),
          inset 0 0 0 7px rgba(255,255,255,0.05),
          inset 0 0 0 10px rgba(0,0,0,0.5),
          0 3px 9px rgba(0,0,0,0.4),
          0 0 0 2.5px rgba(255,255,255,0.1) !important;
      }

      /* Glass highlights */
      #vinyl-player-v8-container .vinyl::before {
        content: '' !important;
        position: absolute !important;
        top: 2% !important;
        left: 5% !important;
        width: 48% !important;
        height: 46% !important;
        background: radial-gradient(
          ellipse at 26% 24%,
          rgba(255,255,255,0.38) 0%,
          rgba(255,255,255,0.12) 28%,
          transparent 58%
        ) !important;
        border-radius: 50% !important;
        pointer-events: none !important;
        z-index: 3 !important;
      }

      /* Center label */
      #vinyl-player-v8-container .vinyl .label {
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        width: 15px !important;
        height: 15px !important;
        background: linear-gradient(145deg, #f1f5f9, #e2e8f0) !important;
        border-radius: 50% !important;
        box-shadow: inset 0 0 0 1px #334155, inset 0 0 0 2.5px #1e2937, 0 1px 3px rgba(0,0,0,0.35) !important;
        z-index: 5 !important;
      }

      /* Spinning */
      #vinyl-player-v8-container .vinyl.playing {
        animation: vinyl-spin-v8 1.68s linear infinite !important;
      }

      @keyframes vinyl-spin-v8 {
        from { transform: rotate(0deg) !important; }
        to { transform: rotate(360deg) !important; }
      }

      /* === TONEARM (Compact) === */
      #vinyl-player-v8-container .tonearm-assembly {
        position: absolute !important;
        right: 6px !important;
        top: 15px !important;
        width: 38px !important;
        height: 38px !important;
        transform-origin: 30px 12px !important;
        transition: transform 360
