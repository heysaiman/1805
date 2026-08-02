(function() {
  // 1. Build the Cinematic Overlay
  const overlay = document.createElement('div');
  overlay.id = 'shreya-cinematic-layer';
  
  // 2. Inject the Wine & Gold styling and animations
  const style = document.createElement('style');
  style.innerHTML = `
    #shreya-cinematic-layer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: radial-gradient(circle at center, #722f37 0%, #2a0810 100%); /* Deep Merlot */
      z-index: 99999;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 2rem;
      box-sizing: border-box;
      opacity: 1;
      transition: opacity 1.5s ease-in-out;
    }

    .apology-vignette {
      position: absolute;
      inset: 0;
      box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.85);
      pointer-events: none;
    }

    .apology-text-wrapper {
      color: #d4af37; /* Metallic Gold */
      font-family: 'Georgia', serif;
      z-index: 2;
      animation: pullFocus 20s ease-out forwards;
      text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.8);
    }

    .apology-text-wrapper h1 {
      font-size: 2.8rem;
      margin-bottom: 1.5rem;
      font-weight: normal;
      letter-spacing: 3px;
    }

    .apology-text-wrapper p {
      font-size: 1.25rem;
      line-height: 1.8;
      max-width: 85%;
      margin: 0 auto;
    }

    /* The 20-Second Pull-Focus and Drift */
    @keyframes pullFocus {
      0% { transform: scale(0.9); filter: blur(8px); opacity: 0; }
      10% { transform: scale(1); filter: blur(0px); opacity: 1; }
      85% { transform: scale(1.05); filter: blur(0px); opacity: 1; }
      100% { transform: scale(1.1); filter: blur(12px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // 3. Insert Content
  overlay.innerHTML = `
    <div class="apology-vignette"></div>
    <div class="apology-text-wrapper">
      <h1>For Shreya</h1>
      <p>
        <!-- PASTE YOUR CUSTOM APOLOGY TEXT BELOW THIS LINE -->
        I am so incredibly sorry for the misunderstanding. I know things have been heavy lately, 
        and I just want to be here to support you. You mean everything to me.
        <!-- PASTE YOUR CUSTOM APOLOGY TEXT ABOVE THIS LINE -->
      </p>
    </div>
  `;
  document.body.appendChild(overlay);

  // 4. The 20-Second Auto-Destruct Sequence
  setTimeout(() => {
    // Step A: Fade out and instantly disable clicks on the overlay
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none'; 
    
    // Step B: Wait for the fade, then obliterate the code so the "Moments" button works perfectly
    setTimeout(() => {
      overlay.remove();
      style.remove();
    }, 1500);
  }, 20000); 
})();
