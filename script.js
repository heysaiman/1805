<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>1805 | Our Story</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="style.css">
    <script src="data.js"></script>
</head>
<body class="selection:bg-[#d4af37] selection:text-black cursor-crosshair">

    <div class="fixed inset-0 z-0 overflow-hidden" id="environment-layer">
        <img id="bgImage" src="" alt="Background" class="w-full h-full object-cover object-[center_20%] opacity-90 animate-ken-burns" />
        <div class="cinematic-overlay"></div>
    </div>
    
    <div class="relative z-10 flex flex-col min-h-screen p-6 md:p-12" id="main-ui-layer">
        <header class="flex justify-between items-center mb-auto reveal-element delay-1">
            <h1 class="text-3xl md:text-4xl font-playfair font-black tracking-widest drop-shadow-2xl">
                <span class="text-emerald-500">18</span><span style="color: var(--color-champagne)">05</span>
            </h1>
        </header>

        <main class="max-w-4xl mt-12 mb-auto pointer-events-none relative z-20">
            <div class="foil-text-container mb-4 reveal-element delay-2">
                <h2 class="font-playfair font-bold tracking-tighter uppercase flex items-baseline gap-2 md:gap-4 drop-shadow-2xl">
                    <span id="heroNumber" class="champagne-foil text-[6rem] md:text-[9rem] leading-none">00</span>
                    <span id="heroLabel" class="champagne-foil text-3xl md:text-5xl tracking-[0.2em] mb-2 md:mb-4">MONTHS</span>
                </h2>
            </div>
            <p id="togetherText" class="text-emerald-400 font-semibold text-xs md:text-lg tracking-[0.6em] uppercase mb-8 drop-shadow-md reveal-element delay-3"></p>
            <p id="synopsisText" class="text-gray-300 text-base md:text-2xl leading-relaxed mb-12 max-w-2xl drop-shadow-lg font-light reveal-element delay-4"></p>
            
            <div class="flex flex-wrap gap-5 mb-12 reveal-element delay-5 pointer-events-auto">
                <button class="relative bg-[#fcf3d7] text-[#0a0508] px-10 py-5 rounded-full font-bold text-xs md:text-sm tracking-[0.2em] uppercase transition-all flex items-center gap-4 hover:-translate-y-1 duration-500 group overflow-hidden shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)]">
                    <span class="text-xl relative z-10 group-hover:scale-125 transition-transform duration-500 text-emerald-700">▶</span> 
                    <span class="relative z-10">Play Our Story</span>
                    <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-0"></div>
                </button>
                
                <button style="display: none;" class="luxury-glass text-white px-10 py-5 rounded-full font-bold text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-white/10 transition-all flex items-center gap-4 hover:-translate-y-1 duration-500 group">
                    <span class="text-[#fcf3d7] text-lg group-hover:rotate-180 transition-transform duration-700">✧</span> 
                    <span>Moments</span>
                </button>

                <div id="moments-interactive-box">
                    <div id="moments-text"><span>✧</span> MOMENTS</div>
                    <ul id="moments-list"></ul>
                </div>
            </div>
        </main>

        <div class="luxury-glass rounded-[2.5rem] p-8 md:p-12 w-full max-w-5xl mx-auto mt-4 mb-4 reveal-element delay-5" id="tilt-card">
            <div class="flex items-center justify-center gap-6 mb-12 transform translate-z-10">
                <div class="h-[1px] w-12 md:w-32 bg-gradient-to-r from-transparent to-[#fcf3d7]/60"></div>
                <p class="text-center text-[#fcf3d7] opacity-90 uppercase tracking-[0.6em] text-[10px] md:text-sm font-bold">Time Together</p>
                <div class="h-[1px] w-12 md:w-32 bg-gradient-to-l from-transparent to-[#fcf3d7]/60"></div>
            </div>
            <div class="grid grid-cols-4 md:grid-cols-7 gap-y-10 gap-x-4 justify-center items-center transform translate-z-20" id="countdown-container">
            </div>
        </div>
    </div>

    <script src="script.js"></script>
    <script src="audio.js"></script> 
    <script src="moments.js?v=4"></script>
</body>
</html>
