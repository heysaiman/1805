// --- apology.js ---
// Cinematic, auto-fading full-screen overlay (20 Seconds).

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject custom cinematic CSS animations
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes cinematicFocus {
            0% { opacity: 0; filter: blur(15px); transform: translateY(10px) scale(0.98); }
            100% { opacity: 1; filter: blur(0px); transform: translateY(0) scale(1); }
        }
        @keyframes slowDrift {
            0% { transform: scale(1); }
            100% { transform: scale(1.03); } /* Very subtle continuous zoom over 20s */
        }
        .animate-pull-focus {
            animation: cinematicFocus 3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-drift {
            animation: slowDrift 20s linear forwards;
        }
    `;
    document.head.appendChild(style);

    // 2. Create the full-screen overlay container
    const apologyOverlay = document.createElement('div');
    apologyOverlay.id = 'cinematic-apology-screen';
    // Deep vignette background using radial-gradient, plus a heavy 40px blur
    apologyOverlay.className = 'fixed inset-0 flex flex-col items-center justify-center px-6 z-[99999]';
    apologyOverlay.style.background = 'radial-gradient(circle at center, rgba(40, 10, 15, 0.65) 0%, rgba(5, 2, 3, 0.98) 100%)';
    apologyOverlay.style.backdropFilter = 'blur(40px) saturate(1.2) brightness(0.7)';
    apologyOverlay.style.webkitBackdropFilter = 'blur(40px) saturate(1.2) brightness(0.7)'; // Safari support
    apologyOverlay.style.transition = 'opacity 2s cubic-bezier(0.4, 0, 0.2, 1), filter 2s';
    apologyOverlay.style.opacity = '0'; 

    // 3. Inject the typography and layout with cinematic spacing and drop-shadows
    apologyOverlay.innerHTML = `
        <div class="max-w-2xl text-center animate-drift" id="apology-content">
            
            <div class="animate-pull-focus" style="animation-delay: 0.2s; opacity: 0;">
                <h1 class="text-4xl md:text-5xl font-playfair font-black text-transparent bg-clip-text bg-gradient-to-b from-[#fcf3d7] to-[#d4af37] drop-shadow-[0_4px_20px_rgba(212,175,55,0.25)] mb-10 leading-tight tracking-wide">
                    Umm Sorry for everything
                </h1>
            </div>
            
            <div class="animate-pull-focus" style="animation-delay: 1s; opacity: 0;">
                <p class="text-gray-300 text-lg md:text-xl font-light leading-[1.8] mb-8 drop-shadow-md">
                    Sorry for everything lately, it's happening out of my immense fear of losing you and everything beyond. I just can't.. i just want us to go back to normal as we were, we argue but solve within hours
                </p>
            </div>
            
            <div class="animate-pull-focus" style="animation-delay: 1.8s; opacity: 0;">
                <p class="text-gray-400 text-base md:text-lg italic font-light leading-relaxed mb-10 opacity-90 drop-shadow-md">
                    I also understand the situation you're going through, it's difficult. Praying for you to get strength and recover quickly.. 
                </p>
            </div>
            
            <div class="animate-pull-focus" style="animation-delay: 2.6s; opacity: 0;">
                <p class="text-[#d4af37] text-sm md:text-base font-medium tracking-[0.2em] uppercase opacity-80 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    Will be waiting to solve things from both side..
                </p>
            </div>

        </div>
    `;

    // 4. Append to body
    document.body.appendChild(apologyOverlay);

    // 5. Trigger the initial fade-in for the master container
    setTimeout(() => {
        apologyOverlay.style.opacity = '1';
    }, 100);

    // 6. Automatically fade out into the main app after 20 seconds
    setTimeout(() => {
        apologyOverlay.style.opacity = '0';
        apologyOverlay.style.filter = 'blur(10px)'; // Blurs out as it fades for a smooth exit
        
        // Wait for the CSS transition to finish (2 seconds), then remove from DOM
        setTimeout(() => {
            apologyOverlay.remove();
            // Optional: Remove the injected styles to keep the DOM clean
            style.remove();
        }, 2000);
    }, 20000); 
});

