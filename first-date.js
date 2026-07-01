```javascript
/**
 * ============================================================================
 * ✧ 1805 | OUR FIRST DATE: THE GLASSMORPHIC INSTAGRAM ENGINE ✧
 * ============================================================================
 * Architecture: Self-Injecting Autonomous Component
 * Features: Touch-Physics Bottom Sheet, Double-Tap to Like, Auto-Reels, 
 * Stateful Story Viewer, Dynamic Carousels, Liquid Glass UI.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // ✧ 1. AUTONOMOUS INJECTION (FOOLPROOF)
    // Create the container dynamically so it never relies on index.html missing an ID
    const appContainer = document.createElement('div');
    appContainer.id = "instagram-app-container";
    document.body.appendChild(appContainer);

    // ========================================================================
    // 📸 ASSET MAP 
    // ========================================================================
    const AST = {
        story1: "story1.jpg", 
        story2: "story2.jpg",
        story3: "story3.jpg",
        story4: "story4.jpg",
        post1_img1: "20250425_184147(1).jpg", // The Main Image
        post1_img2: "banner2.jpg", 
        post1_img3: "banner3.jpg", 
        reelVideo: "first_date_reel.mp4",
        grid: [
            "explore1.jpg", "explore2.jpg", "explore3.jpg",
            "explore4.jpg", "explore5.jpg", "explore6.jpg",
            "explore7.jpg", "explore8.jpg", "explore9.jpg"
        ],
        profileAvatar: "1000115432.jpg" // The beautiful red dress profile photo
    };

    // ========================================================================
    // 🎨 STYLES & PHYSICS ENGINE
    // ========================================================================
    const igStyles = document.createElement('style');
    igStyles.innerHTML = `
        /* Scrollbar Assassination for Native Feel */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* The Authentic Instagram Gradient */
        .ig-gradient { background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); }
        .ig-text-gradient { background: linear-gradient(45deg, #f09433, #dc2743, #bc1888); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        /* Glass Physics */
        .glass-heavy { background: rgba(5, 5, 5, 0.75); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); border-top: 1px solid rgba(255, 255, 255, 0.08); }
        .glass-card { background: rgba(25, 25, 25, 0.4); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.05); }
        .glass-button { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .glass-button:active { transform: scale(0.95); background: rgba(255, 255, 255, 0.2); }

        /* Carousel Snapping */
        .snap-x-mandatory { scroll-snap-type: x mandatory; overflow-x: scroll; scroll-behavior: smooth; }
        .snap-center { scroll-snap-align: center; }

        /* Animations */
        @keyframes fadeUpIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUpIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        /* Big Double-Tap Heart Animation */
        @keyframes heartBurst {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; filter: drop-shadow(0 0 0px rgba(220,38,38,0)); }
            15% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.9; filter: drop-shadow(0 0 40px rgba(220,38,38,0.8)); }
            30% { transform: translate(-50%, -50%) scale(0.95); opacity: 1; }
            45% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            80% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        .heart-burst-anim { animation: heartBurst 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

        /* Mini UI Heart EKG Pulse */
        @keyframes heartbeatPulse {
            0% { transform: scale(1); }
            25% { transform: scale(1.3); filter: drop-shadow(0 0 10px rgba(220,38,38,0.6)); }
            50% { transform: scale(1); }
            75% { transform: scale(1.15); }
            100% { transform: scale(1); }
        }
        .ekg-active { animation: heartbeatPulse 0.5s ease-in-out forwards; color: #dc2626 !important; fill: currentColor; }

        /* Story Viewer Progress Bar */
        .story-progress-fill { height: 100%; background: #fff; width: 0%; border-radius: 99px; }
        .story-progress-paused { animation-play-state: paused !important; }
        @keyframes storyProgress { from { width: 0%; } to { width: 100%; } }
        .story-progress-bar { animation: storyProgress 4.5s linear forwards; }

        /* Bottom Sheet Physics */
        #comment-sheet { transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1); will-change: transform; touch-action: none; }
        .sheet-open { transform: translateY(0%) !important; }
        .sheet-closed { transform: translateY(100%) !important; }

        /* Spinning Record for Reels */
        @keyframes spinSlow { 100% { transform: rotate(360deg); } }
        .spin-record { animation: spinSlow 4s linear infinite; }
        .spin-paused { animation-play-state: paused; }
    `;
    document.head.appendChild(igStyles);

    // ========================================================================
    // 🧱 DOM ARCHITECTURE (INJECTING THE UI)
    // ========================================================================
    appContainer.innerHTML = `
        <!-- MAIN APP CONTAINER -->
        <div id="ig-app-panel" class="fixed top-0 right-0 w-full md:w-[440px] h-[100dvh] bg-[#000000] z-[20000] transform translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden flex flex-col border-l border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)] text-white font-sans">
            
            <!-- ✧ TOP NAVIGATION BAR ✧ -->
            <div id="ig-top-nav" class="h-14 flex items-center justify-between px-4 border-b border-white/10 relative z-30 bg-black/80 backdrop-blur-md transition-transform duration-300">
                <div class="flex items-center gap-3">
                    <button id="ig-close-btn" class="text-white/80 hover:text-white transition active:scale-90 cursor-pointer p-1">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <h2 class="font-playfair font-black text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#fcf3d7] to-[#d4af37]">1805</h2>
                    <svg class="w-3.5 h-3.5 text-[#38bdf8]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                </div>
                <div class="flex gap-5 items-center">
                    <button class="active:scale-90 transition transform">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    </button>
                    <button class="active:scale-90 transition transform relative">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                        <span class="absolute -top-1 -right-1 flex h-3 w-3">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-black"></span>
                        </span>
                    </button>
                </div>
            </div>

            <!-- ✧ SCREENS VIEWPORT ✧ -->
            <div id="ig-screens" class="flex-1 relative bg-[#000000]">
                
                <!-- ========================================== -->
                <!-- 📱 SCREEN 1: HOME FEED                     -->
                <!-- ========================================== -->
                <div id="screen-home" class="absolute inset-0 overflow-y-auto no-scrollbar pb-24 transition-opacity duration-300 opacity-100 z-10">
                    
                    <!-- 🟢 STORIES TRAY -->
                    <div class="flex gap-4 overflow-x-auto no-scrollbar pt-3 pb-4 px-4 border-b border-white/10 relative">
                        <!-- Add Story -->
                        <div class="flex flex-col items-center gap-1.5 cursor-pointer relative shrink-0">
                            <div class="w-[68px] h-[68px] rounded-full overflow-hidden border border-white/20 bg-zinc-900 relative">
                                <div class="w-full h-full bg-cover bg-center opacity-70" style="background-image: url('${AST.profileAvatar}');"></div>
                                <div class="absolute inset-0 bg-black/20"></div>
                            </div>
                            <div class="absolute bottom-[18px] right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-black flex items-center justify-center">
                                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                            </div>
                            <span class="text-[11px] text-white/60 font-medium">Your story</span>
                        </div>

                        <!-- Dynamic Story Rings -->
                        <div class="flex flex-col items-center gap-1.5 cursor-pointer group ig-story-trigger shrink-0" data-idx="0">
                            <div class="p-[2px] ig-gradient rounded-full transition-transform group-active:scale-95">
                                <div class="w-[64px] h-[64px] rounded-full border-[3px] border-black overflow-hidden bg-zinc-900">
                                    <div class="w-full h-full bg-cover bg-center" style="background-image: url('${AST.story1}'), url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=150');"></div>
                                </div>
                            </div>
                            <span class="text-[11px] text-white/90 font-medium tracking-wide">Arrival</span>
                        </div>

                        <div class="flex flex-col items-center gap-1.5 cursor-pointer group ig-story-trigger shrink-0" data-idx="1">
                            <div class="p-[2px] ig-gradient rounded-full transition-transform group-active:scale-95">
                                <div class="w-[64px] h-[64px] rounded-full border-[3px] border-black overflow-hidden bg-zinc-900">
                                    <div class="w-full h-full bg-cover bg-center" style="background-image: url('${AST.story2}'), url('https://images.unsplash.com/photo-1519046904884-53103b34b206?w=150');"></div>
                                </div>
                            </div>
                            <span class="text-[11px] text-white/90 font-medium tracking-wide">Cinepolis</span>
                        </div>

                        <div class="flex flex-col items-center gap-1.5 cursor-pointer group ig-story-trigger shrink-0" data-idx="2">
                            <div class="p-[2px] ig-gradient rounded-full transition-transform group-active:scale-95">
                                <div class="w-[64px] h-[64px] rounded-full border-[3px] border-black overflow-hidden bg-zinc-900">
                                    <div class="w-full h-full bg-cover bg-center" style="background-image: url('${AST.story3}'), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150');"></div>
                                </div>
                            </div>
                            <span class="text-[11px] text-white/90 font-medium tracking-wide">The Kiss</span>
                        </div>
                    </div>

                    <!-- 🟢 FEED POST 1 -->
                    <article class="pt-3 pb-6 border-b border-white/10 animate-fade-up">
                        <!-- Post Header -->
                        <div class="flex items-center justify-between px-4 mb-3">
                            <div class="flex items-center gap-3">
                                <div class="w-9 h-9 rounded-full ig-gradient p-[2px] cursor-pointer">
                                    <div class="w-full h-full rounded-full bg-black flex items-center justify-center font-playfair font-black text-[10px] text-[#fcf3d7] border border-black overflow-hidden">
                                        <div class="w-full h-full bg-cover bg-center" style="background-image: url('${AST.profileAvatar}');"></div>
                                    </div>
                                </div>
                                <div class="flex flex-col -gap-1">
                                    <span class="text-[13px] font-bold tracking-wide cursor-pointer hover:opacity-80">1805_Specials <svg class="w-[14px] h-[14px] inline text-blue-500 ml-0.5 mb-[2px]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></span>
                                    <span class="text-[11px] text-white/60">Utkal Galleria & Cinepolis</span>
                                </div>
                            </div>
                            <button class="text-white/80 hover:text-white p-1"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg></button>
                        </div>
                        
                        <!-- Post Media: Image Carousel with Double Tap Physics -->
                        <div class="relative w-full aspect-[4/5] bg-zinc-900 flex snap-x-mandatory" id="post-carousel-1">
                            
                            <div class="w-full h-full flex-shrink-0 snap-center bg-cover bg-center relative post-image-block" style="background-image: url('${AST.post1_img1}'), url('https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1000');"></div>
                            
                            <div class="w-full h-full flex-shrink-0 snap-center bg-cover bg-center relative post-image-block" style="background-image: url('${AST.post1_img2}'), url('https://images.unsplash.com/photo-1478147424103-62c648833919?w=1000');"></div>
                            
                            <div class="w-full h-full flex-shrink-0 snap-center bg-cover bg-center relative post-image-block" style="background-image: url('${AST.post1_img3}'), url('https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1000');"></div>
                            
                            <div class="absolute top-3 right-3 bg-black/60 backdrop-blur-md rounded-full px-2.5 py-1 text-[10px] font-bold tracking-widest text-white/90 z-20 shadow-lg border border-white/10" id="carousel-indicator">1/3</div>
                            
                            <!-- Giant Double Tap Heart Overlay -->
                            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-0 pointer-events-none z-30 drop-shadow-2xl" id="giant-heart-anim">
                                <svg class="w-28 h-28 fill-current text-red-500" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            </div>
                        </div>

                        <!-- Action Bar -->
                        <div class="px-4 py-3 flex justify-between items-center">
                            <div class="flex gap-4">
                                <button class="action-btn-heart text-white transition transform active:scale-75 relative">
                                    <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                                </button>
                                <button class="action-btn-comment text-white hover:text-white/70 transition transform active:scale-75">
                                    <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                                </button>
                                <button class="text-white hover:text-white/70 transition transform -rotate-12 active:scale-75">
                                    <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                                </button>
                            </div>
                            
                            <div class="flex gap-1.5" id="carousel-dots">
                                <div class="w-1.5 h-1.5 rounded-full bg-blue-500 transition-colors"></div>
                                <div class="w-1.5 h-1.5 rounded-full bg-white/30 transition-colors"></div>
                                <div class="w-1.5 h-1.5 rounded-full bg-white/30 transition-colors"></div>
                            </div>
                            
                            <button class="action-btn-save text-white hover:text-white/70 transition transform active:scale-75">
                                <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                            </button>
                        </div>

                        <!-- Metadata & Dynamic Expanding Caption -->
                        <div class="px-4">
                            <p class="text-[13px] font-semibold mb-1 cursor-pointer">Liked by <span class="font-bold">shreya</span> and <span class="font-bold">infinite others</span></p>
                            
                            <div class="text-[13px] text-gray-100 leading-snug">
                                <span class="font-bold mr-1 cursor-pointer hover:underline">1805_Specials</span> 
                                <span id="caption-short" class="inline">
                                    Our official first date didn't happen in a quiet space—it unfolded amidst the bright lights of Utkal Galleria. Hopping through outlets...
                                </span>
                                <span id="caption-more-btn" class="text-gray-400 cursor-pointer hover:text-white">more</span>
                                
                                <div id="caption-full" class="hidden mt-1 text-gray-300 space-y-3 relative z-10 border-l-2 border-white/20 pl-3 ml-1 mt-2">
                                    <p>...laughing, but internally I was dead nervous, continually asking if I could hug her, if I could hold her hand.</p>
                                    <p>Then we hopped to Cinepolis for a movie. It was our first movie together, and remarkably, it was her very first cinema experience in a theatre! Watching her take it all in was the real movie for me.</p>
                                    <p>Then came the departure. By the cab, we experienced our first kiss. It lasted only a second, but it was something deeply remarkable that stopped time itself.</p>
                                </div>
                            </div>
                            
                            <p class="text-[13px] text-gray-400 mt-1 cursor-pointer hover:text-gray-300 action-btn-comment">View all 1,805 comments</p>
                            <p class="text-[10px] text-gray-500 mt-2 uppercase tracking-wide">March 27, 2025</p>
                        </div>
                    </article>
                    
                    <div class="py-10 flex flex-col items-center justify-center text-white/30 border-t border-white/5">
                        <svg class="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <p class="text-sm font-semibold tracking-wider uppercase">You're all caught up</p>
                        <p class="text-xs mt-1">You've seen all memories from this date.</p>
                    </div>

                </div>

                <!-- ========================================== -->
                <!-- 🔍 SCREEN 2: EXPLORE GRID                  -->
                <!-- ========================================== -->
                <div id="screen-explore" class="absolute inset-0 overflow-y-auto no-scrollbar opacity-0 pointer-events-none transition-opacity duration-300 z-10 pb-20 bg-black">
                    <div class="p-3 sticky top-0 bg-black/80 backdrop-blur-xl z-20 border-b border-white/5">
                        <div class="bg-zinc-800/80 border border-white/10 h-10 rounded-xl flex items-center px-4 text-white/50 shadow-inner">
                            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                            <span class="text-[15px] font-medium tracking-wide">Search memories...</span>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-3 gap-[2px]">
                        <div class="aspect-square bg-zinc-900 bg-cover bg-center cursor-pointer hover:brightness-75 transition-all" style="background-image: url('${AST.grid[0]}'), url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300');"></div>
                        <div class="aspect-square bg-zinc-900 bg-cover bg-center cursor-pointer hover:brightness-75 transition-all" style="background-image: url('${AST.grid[1]}'), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300');"></div>
                        <div class="aspect-square bg-zinc-900 bg-cover bg-center cursor-pointer hover:brightness-75 transition-all" style="background-image: url('${AST.grid[2]}'), url('https://images.unsplash.com/photo-1519046904884-53103b34b206?w=300');"></div>
                        
                        <div class="col-span-2 row-span-2 aspect-square bg-zinc-900 bg-cover bg-center cursor-pointer hover:brightness-75 transition-all relative group" style="background-image: url('${AST.grid[3]}'), url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600');">
                            <div class="absolute top-2 right-2 text-white drop-shadow-md opacity-80"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5h1v2H5V5zm0 4h1v2H5V9zm0 4h1v2H5v-2z" clip-rule="evenodd"></path></svg></div>
                        </div>
                        <div class="aspect-square bg-zinc-900 bg-cover bg-center cursor-pointer hover:brightness-75 transition-all" style="background-image: url('${AST.grid[4]}'), url('https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300');"></div>
                        <div class="aspect-square bg-zinc-900 bg-cover bg-center cursor-pointer hover:brightness-75 transition-all" style="background-image: url('${AST.grid[5]}'), url('https://images.unsplash.com/photo-1478147424103-62c648833919?w=300');"></div>
                        
                        <div class="aspect-square bg-zinc-900 bg-cover bg-center cursor-pointer hover:brightness-75 transition-all" style="background-image: url('${AST.grid[6]}'), url('https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300');"></div>
                        <div class="aspect-square bg-zinc-900 bg-cover bg-center cursor-pointer hover:brightness-75 transition-all" style="background-image: url('${AST.grid[7]}'), url('https://images.unsplash.com/photo-1518134105260-2646270b22a0?w=300');"></div>
                        <div class="aspect-square bg-zinc-900 bg-cover bg-center cursor-pointer hover:brightness-75 transition-all relative" style="background-image: url('${AST.grid[8]}'), url('https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300');">
                            <div class="absolute top-2 right-2 text-white drop-shadow-md opacity-80"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg></div>
                        </div>
                    </div>
                </div>

                <!-- ========================================== -->
                <!-- 🎬 SCREEN 3: REELS                         -->
                <!-- ========================================== -->
                <div id="screen-reels" class="absolute inset-0 overflow-hidden opacity-0 pointer-events-none transition-opacity duration-300 z-10 bg-black">
                    <div class="relative w-full h-full bg-zinc-900" id="reel-container">
                        <div class="absolute inset-0 bg-cover bg-center opacity-70" style="background-image: url('https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1000');"></div>
                        
                        <video id="reels-video" class="absolute inset-0 w-full h-full object-cover z-10 hidden" loop playsinline>
                            <source src="${AST.reelVideo}" type="video/mp4">
                        </video>
                        
                        <div class="absolute top-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none"></div>
                        <div class="absolute bottom-0 w-full h-64 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 pointer-events-none"></div>
                        
                        <div id="reel-play-icon" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 opacity-0 transition-opacity duration-300 pointer-events-none bg-black/40 backdrop-blur-md rounded-full p-6">
                            <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
                        </div>
                        
                        <div class="absolute bottom-20 left-4 right-16 z-30">
                            <div class="flex items-center gap-3 mb-3 cursor-pointer group">
                                <div class="w-9 h-9 rounded-full border border-white/30 overflow-hidden shadow-lg p-[1px] bg-gradient-to-tr from-pink-500 to-yellow-500">
                                    <div class="w-full h-full bg-black rounded-full bg-cover bg-center" style="background-image: url('${AST.profileAvatar}');"></div>
                                </div>
                                <span class="font-bold text-[15px] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">1805_Specials</span>
                                <button class="px-4 py-1.5 rounded-xl border border-white/60 text-[11px] font-bold backdrop-blur-md bg-white/10 hover:bg-white/20 transition uppercase tracking-wider shadow-lg">Follow</button>
                            </div>
                            <div class="pr-2">
                                <p class="text-[14px] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-snug font-medium">Tirrri valo me darrr ka mahol 😂 <br>The most beautiful, chaotic ride.</p>
                                <p class="text-[13px] text-white mt-2 flex items-center gap-1.5 drop-shadow-md bg-black/30 w-max px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 cursor-pointer hover:bg-white/20 transition">
                                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg> 
                                    <marquee class="w-24 whitespace-nowrap overflow-hidden" scrollamount="3">1805_Specials • Original Audio - The First Date Story</marquee>
                                </p>
                            </div>
                        </div>

                        <div class="absolute bottom-20 right-3 z-30 flex flex-col items-center gap-6">
                            <div class="flex flex-col items-center gap-1.5 cursor-pointer action-btn-heart relative">
                                <svg class="w-8 h-8 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-transform active:scale-75" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                                <span class="text-[12px] font-bold text-white drop-shadow-md">Infinite</span>
                            </div>
                            <div class="flex flex-col items-center gap-1.5 cursor-pointer action-btn-comment">
                                <svg class="w-8 h-8 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-transform active:scale-75" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                                <span class="text-[12px] font-bold text-white drop-shadow-md">1,805</span>
                            </div>
                            <div class="flex flex-col items-center gap-1.5 cursor-pointer">
                                <svg class="w-8 h-8 text-white transform -rotate-12 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-transform active:scale-75" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                                <span class="text-[12px] font-bold text-white drop-shadow-md">Share</span>
                            </div>
                            <div class="w-[34px] h-[34px] rounded-lg border-2 border-white/60 bg-black mt-2 overflow-hidden spin-record shadow-[0_0_15px_rgba(0,0,0,0.5)] relative" id="reel-record">
                                <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('${AST.profileAvatar}');"></div>
                                <div class="absolute inset-0 rounded-lg border-2 border-black rounded-full scale-50 opacity-50"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ========================================== -->
                <!-- 👤 SCREEN 4: PROFILE                       -->
                <!-- ========================================== -->
                <div id="screen-profile" class="absolute inset-0 overflow-y-auto no-scrollbar opacity-0 pointer-events-none transition-opacity duration-300 z-10 pb-20 bg-[#000000]">
                    <div class="sticky top-0 bg-black/90 backdrop-blur-lg border-b border-white/10 p-3 flex justify-between items-center z-20">
                        <div class="flex items-center gap-2 cursor-pointer">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                            <span class="font-bold text-lg">1805_specials <svg class="w-3.5 h-3.5 inline text-blue-500 ml-0.5 mb-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></span>
                        </div>
                        <div class="flex gap-4">
                            <svg class="w-7 h-7 hover:opacity-70 transition cursor-pointer" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                            <svg class="w-7 h-7 hover:opacity-70 transition cursor-pointer" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
                        </div>
                    </div>

                    <div class="p-5 flex items-center justify-between">
                        <div class="w-[88px] h-[88px] rounded-full border border-white/20 p-[3px] relative bg-zinc-900 shadow-xl cursor-pointer hover:opacity-80 transition">
                            <div class="w-full h-full rounded-full bg-cover bg-center" style="background-image: url('${AST.profileAvatar}');"></div>
                            <div class="absolute bottom-0 right-0 w-7 h-7 bg-blue-500 rounded-full border-2 border-black flex items-center justify-center text-white shadow-lg">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                            </div>
                        </div>
                        <div class="flex-1 flex justify-around px-2">
                            <div class="flex flex-col items-center cursor-pointer"><span class="font-bold text-xl tracking-tight">2</span><span class="text-[13px] text-white/80">posts</span></div>
                            <div class="flex flex-col items-center cursor-pointer"><span class="font-bold text-xl tracking-tight">∞</span><span class="text-[13px] text-white/80">followers</span></div>
                            <div class="flex flex-col items-center cursor-pointer"><span class="font-bold text-xl tracking-tight">1</span><span class="text-[13px] text-white/80">following</span></div>
                        </div>
                    </div>

                    <div class="px-5 pb-5">
                        <p class="font-bold text-[15px] mb-0.5">05.06 ✨🧿</p>
                        <p class="text-[15px] text-white/90 leading-tight">Peace over chaos !</p>
                        <p class="text-[14px] text-blue-300 mt-1 cursor-pointer hover:underline">@saiman @shreya</p>
                        
                        <div class="mt-4 bg-zinc-900/60 border border-white/10 rounded-xl p-2.5 flex items-center gap-2 cursor-pointer hover:bg-zinc-800 transition">
                            <svg class="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
                            <span class="text-sm font-medium">Vespa è Libertà (From "Luca...")</span>
                            <span class="ml-auto text-xs font-semibold bg-white/10 px-3 py-1 rounded-full">+ Add</span>
                        </div>

                        <div class="flex gap-2 mt-4">
                            <button class="flex-1 glass-button py-2 rounded-xl text-[14px] font-semibold text-white shadow-md">Edit profile</button>
                            <button class="flex-1 glass-button py-2 rounded-xl text-[14px] font-semibold text-white shadow-md">Share profile</button>
                            <button class="glass-button px-3.5 rounded-xl flex items-center shadow-md">
                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg>
                            </button>
                        </div>
                    </div>

                    <div class="px-2 pb-5 flex gap-4 overflow-x-auto no-scrollbar border-b border-white/10">
                        <div class="flex flex-col items-center gap-1.5 ml-2">
                            <div class="w-[64px] h-[64px] rounded-full border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/10 transition">
                                <svg class="w-8 h-8 text-white/50" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                            </div>
                            <span class="text-[12px] font-medium text-white/80">New</span>
                        </div>
                        <div class="flex flex-col items-center gap-1.5">
                            <div class="w-[64px] h-[64px] rounded-full border border-zinc-700 p-0.5 cursor-pointer hover:opacity-80 transition bg-zinc-900">
                                <div class="w-full h-full rounded-full bg-cover bg-center" style="background-image: url('${AST.post1_img1}'), url('https://images.unsplash.com/photo-1511895426328-dc8714191300?w=150');"></div>
                            </div>
                            <span class="text-[12px] font-medium text-white/80">🥀</span>
                        </div>
                    </div>

                    <div class="flex w-full sticky top-[68px] bg-black z-10 border-b border-white/10">
                        <div class="flex-1 border-b-[2px] border-white py-3 flex justify-center cursor-pointer"><svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg></div>
                        <div class="flex-1 py-3 flex justify-center text-white/40 cursor-pointer hover:text-white/70 transition"><svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
                        <div class="flex-1 py-3 flex justify-center text-white/40 cursor-pointer hover:text-white/70 transition"><svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div>
                    </div>
                    
                    <div class="grid grid-cols-3 gap-[2px]">
                         <div class="aspect-square bg-zinc-900 bg-cover bg-center cursor-pointer hover:brightness-75 transition relative group" style="background-image: url('${AST.post1_img1}'), url('https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300');">
                             <div class="absolute top-2 right-2 opacity-90"><svg class="w-5 h-5 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5h1v2H5V5zm0 4h1v2H5V9zm0 4h1v2H5v-2z" clip-rule="evenodd"></path></svg></div>
                         </div>
                         <div class="aspect-square bg-zinc-900 bg-cover bg-center cursor-pointer hover:brightness-75 transition relative" style="background-image: url('${AST.grid[3]}'), url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300');"></div>
                    </div>
                </div>

            </div>

            <!-- ========================================== -->
            <!-- 📱 BOTTOM NAVIGATION (GLASS BLUR)            -->
            <!-- ========================================== -->
            <div class="absolute bottom-0 w-full h-14 glass-heavy flex justify-around items-center z-[100] pb-safe text-white/60">
                <button class="ig-nav-btn active text-white p-2" data-target="screen-home">
                    <svg class="w-7 h-7 transition-transform active:scale-90 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
                </button>
                <button class="ig-nav-btn p-2" data-target="screen-explore">
                    <svg class="w-7 h-7 transition-transform active:scale-90 drop-shadow-lg" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </button>
                <button class="ig-nav-btn p-2" data-target="screen-reels">
                    <svg class="w-7 h-7 transition-transform active:scale-90 drop-shadow-lg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </button>
                <button class="ig-nav-btn p-2" data-target="screen-profile">
                    <div class="w-7 h-7 rounded-full border-[1.5px] border-current p-[1px] transition-transform active:scale-90 drop-shadow-lg bg-black">
                        <div class="w-full h-full rounded-full bg-cover bg-center" style="background-image: url('${AST.profileAvatar}');"></div>
                    </div>
                </button>
            </div>

            <!-- ========================================== -->
            <!-- 🎬 FULLSCREEN STORY VIEWER OVERLAY         -->
            <!-- ========================================== -->
            <div id="ig-story-viewer" class="absolute inset-0 bg-black z-[20000] flex flex-col opacity-0 pointer-events-none transition-opacity duration-300">
                <div id="story-bg-blur" class="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-40 scale-110 transition-all duration-300" style="background-image: url('${AST.story1}');"></div>
                
                <div class="relative z-10 flex-1 flex flex-col pt-4">
                    <div class="px-2 flex gap-1.5 mb-3" id="story-progress-container">
                        <div class="h-0.5 bg-white/30 rounded-full flex-1 overflow-hidden"><div class="story-progress-fill" id="prog-0"></div></div>
                        <div class="h-0.5 bg-white/30 rounded-full flex-1 overflow-hidden"><div class="story-progress-fill" id="prog-1"></div></div>
                        <div class="h-0.5 bg-white/30 rounded-full flex-1 overflow-hidden"><div class="story-progress-fill" id="prog-2"></div></div>
                    </div>
                    
                    <div class="px-4 flex items-center justify-between text-white drop-shadow-xl z-20">
                        <div class="flex items-center gap-2.5">
                            <div class="w-8 h-8 rounded-full border border-white/40 overflow-hidden bg-zinc-900">
                                <div class="w-full h-full bg-cover bg-center" style="background-image: url('${AST.profileAvatar}');"></div>
                            </div>
                            <span class="font-bold text-[13px] tracking-wide">1805_Specials <span class="text-white/70 font-normal ml-1 text-xs">2h</span></span>
                        </div>
                        <div class="flex gap-4">
                            <button class="hover:opacity-70"><svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg></button>
                            <button id="close-story-btn" class="hover:opacity-70 transition cursor-pointer"><svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
                        </div>
                    </div>
                    
                    <div class="flex-1 relative flex items-center justify-center p-0 mt-4 rounded-t-2xl overflow-hidden shadow-2xl">
                        <div class="absolute inset-y-0 left-0 w-1/3 z-30" id="story-tap-left"></div>
                        <div class="absolute inset-y-0 right-0 w-2/3 z-30" id="story-tap-right"></div>

                        <div id="story-media-display" class="w-full h-full bg-cover bg-center transition-all duration-300" style="background-image: url('${AST.story1}');">
                            <div class="w-full h-full flex flex-col items-center justify-center text-white bg-black/30 backdrop-blur-sm pointer-events-none">
                                <span id="story-display-title" class="text-xl font-playfair font-black tracking-widest uppercase drop-shadow-2xl">The Arrival</span>
                                <span class="text-[10px] font-mono mt-2 bg-black/60 px-3 py-1 rounded-full border border-white/20">Slot Active</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="px-4 pt-4 pb-8 flex gap-4 items-center bg-gradient-to-t from-black via-black/80 to-transparent absolute bottom-0 w-full z-20">
                        <div class="flex-1 rounded-full border border-white/40 bg-black/40 backdrop-blur-xl px-5 py-3 text-[14px] font-medium text-white/80 cursor-text shadow-lg hover:bg-black/60 transition">Send message...</div>
                        <button class="text-white hover:scale-110 transition drop-shadow-lg"><svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg></button>
                        <button class="text-white transform -rotate-12 hover:scale-110 transition drop-shadow-lg"><svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg></button>
                    </div>
                </div>
            </div>

            <!-- ========================================== -->
            <!-- 💬 TOUCH-PHYSICS COMMENT BOTTOM SHEET      -->
            <!-- ========================================== -->
            <div id="comment-sheet" class="fixed inset-x-0 bottom-0 h-[70dvh] bg-[#1a1a1a] rounded-t-3xl z-[30000] flex flex-col sheet-closed border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:w-[440px] md:right-0 md:left-auto">
                <div class="w-full pt-3 pb-2 flex justify-center cursor-grab active:cursor-grabbing" id="sheet-drag-handle">
                    <div class="w-10 h-1 rounded-full bg-white/30"></div>
                </div>
                <div class="text-center font-bold text-[15px] pb-3 border-b border-white/10 text-white">Comments</div>
                
                <div class="flex-1 overflow-y-auto p-4 space-y-5">
                    <div class="flex gap-3 items-start">
                        <div class="w-9 h-9 rounded-full bg-zinc-800 bg-cover bg-center shrink-0 border border-white/10" style="background-image: url('${AST.profileAvatar}');"></div>
                        <div class="flex-1 text-[13px]">
                            <span class="font-bold text-white mr-1">saiman</span>
                            <span class="text-white/90">I was literally sweating asking to hold hands 😂 </span>
                            <div class="flex items-center gap-4 text-[11px] text-white/50 mt-1.5 font-medium">
                                <span>2h</span> <span>Reply</span> <span>See translation</span>
                            </div>
                        </div>
                        <button class="text-white/40 hover:text-red-500"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg></button>
                    </div>
                    <div class="flex gap-3 items-start">
                        <div class="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shrink-0 font-bold text-white text-xs">S</div>
                        <div class="flex-1 text-[13px]">
                            <span class="font-bold text-white mr-1">shreya</span>
                            <span class="text-white/90">The movie was great but you were so distracted looking at me the whole time! ❤️</span>
                            <div class="flex items-center gap-4 text-[11px] text-white/50 mt-1.5 font-medium">
                                <span>1h</span> <span>Reply</span> <span>See translation</span>
                            </div>
                        </div>
                        <button class="text-red-500"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></button>
                    </div>
                </div>

                <div class="p-4 border-t border-white/10 flex items-center gap-3 bg-[#1a1a1a]">
                    <div class="w-9 h-9 rounded-full bg-zinc-800 bg-cover bg-center shrink-0" style="background-image: url('${AST.profileAvatar}');"></div>
                    <div class="flex-1 flex items-center bg-black rounded-full border border-white/10 px-4 py-2">
                        <input type="text" placeholder="Add a comment..." class="bg-transparent outline-none w-full text-sm text-white placeholder-white/40">
                        <button class="text-blue-500 text-sm font-bold ml-2 opacity-50">Post</button>
                    </div>
                </div>
            </div>

            <div id="sheet-backdrop" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[25000] opacity-0 pointer-events-none transition-opacity duration-400"></div>
        </div>
    `;

    // ========================================================================
    // 🧠 LOGIC & INTERACTION BINDING
    // ========================================================================
    
    // Core Elements
    const appPanel = document.getElementById('ig-app-panel');
    const closeBtn = document.getElementById('ig-close-btn');
    const navBtns = document.querySelectorAll('.ig-nav-btn');
    const screens = {
        'screen-home': document.getElementById('screen-home'),
        'screen-explore': document.getElementById('screen-explore'),
        'screen-reels': document.getElementById('screen-reels'),
        'screen-profile': document.getElementById('screen-profile')
    };

    // 1. ROUTER EXPOSURE
    window.openInstagramPanel = function() {
        if(appPanel) appPanel.classList.replace('translate-x-full', 'translate-x-0');
    };
    window.closeInstagramPanel = function() {
        if(appPanel) appPanel.classList.replace('translate-x-0', 'translate-x-full');
    };
    if (closeBtn) closeBtn.addEventListener('click', window.closeInstagramPanel);

    // 2. GLOBAL EVENT DELEGATION LISTENER
    // This perfectly connects the click from the morphing box directly to this file
    document.addEventListener('click', (e) => {
        if (e.target && e.target.tagName === 'P' && e.target.textContent.trim() === 'Our first date') {
            e.stopPropagation();
            window.openInstagramPanel();
        }
    });

    // 3. BOTTOM NAVIGATION SWITCHER
    const reelsVideo = document.getElementById('reels-video');
    const reelRecord = document.getElementById('reel-record');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => {
                b.classList.remove('text-white');
                b.classList.add('text-white/60');
            });
            btn.classList.add('text-white');
            btn.classList.remove('text-white/60');

            const targetId = btn.getAttribute('data-target');
            
            Object.values(screens).forEach(screen => {
                if(screen) {
                    screen.classList.remove('opacity-100');
                    screen.classList.add('opacity-0', 'pointer-events-none');
                }
            });

            if (screens[targetId]) {
                screens[targetId].classList.remove('opacity-0', 'pointer-events-none');
                screens[targetId].classList.add('opacity-100');
            }

            if (targetId === 'screen-reels' && reelsVideo) {
                reelsVideo.classList.remove('hidden');
                reelsVideo.play().catch(e => console.log("Video requires interaction first:", e));
                if(reelRecord) reelRecord.classList.remove('spin-paused');
            } else if (reelsVideo) {
                reelsVideo.pause();
                if(reelRecord) reelRecord.classList.add('spin-paused');
            }
        });
    });

    // 4. CAROUSEL PAGINATION LOGIC
    const carousel = document.getElementById('post-carousel-1');
    const dots = document.getElementById('carousel-dots');
    const indicator = document.getElementById('carousel-indicator');
    
    if (carousel && dots && indicator) {
        carousel.addEventListener('scroll', () => {
            const scrollPercent = carousel.scrollLeft / (carousel.scrollWidth - carousel.clientWidth);
            const activeIndex = Math.round(scrollPercent * 2); 
            
            Array.from(dots.children).forEach((dot, idx) => {
                if (idx === activeIndex) {
                    dot.classList.replace('bg-white/30', 'bg-blue-500');
                } else {
                    dot.classList.replace('bg-blue-500', 'bg-white/30');
                }
            });
            
            indicator.innerText = `${activeIndex + 1}/3`;
        });
    }

    // 5. DOUBLE-TAP TO LIKE PHYSICS
    const postBlocks = document.querySelectorAll('.post-image-block');
    const heartAnim = document.getElementById('giant-heart-anim');
    const heartBtn = document.querySelector('.action-btn-heart');
    let lastTapTime = 0;
    
    const triggerLike = () => {
        if (!heartBtn) return;
        const svg = heartBtn.querySelector('svg');
        svg.classList.replace('fill-none', 'fill-current');
        heartBtn.classList.add('ekg-active');
        
        if (heartAnim) {
            heartAnim.classList.remove('heart-burst-anim');
            void heartAnim.offsetWidth; 
            heartAnim.classList.add('heart-burst-anim');
        }
        setTimeout(() => heartBtn.classList.remove('ekg-active'), 800);
    };

    postBlocks.forEach(block => {
        block.addEventListener('click', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTapTime;
            if (tapLength < 300 && tapLength > 0) {
                triggerLike();
                e.preventDefault();
            }
            lastTapTime = currentTime;
        });
    });

    if (heartBtn) {
        heartBtn.addEventListener('click', () => {
            const svg = heartBtn.querySelector('svg');
            if (svg.classList.contains('fill-none')) {
                triggerLike();
            } else {
                svg.classList.replace('fill-current', 'fill-none');
            }
        });
    }

    // 6. EXPANDABLE TEXT ('...more')
    const moreBtn = document.getElementById('caption-more-btn');
    const captionShort = document.getElementById('caption-short');
    const captionFull = document.getElementById('caption-full');
    
    if (moreBtn && captionShort && captionFull) {
        moreBtn.addEventListener('click', () => {
            moreBtn.style.display = 'none';
            captionFull.classList.remove('hidden');
        });
    }

    // 7. TOUCH PHYSICS: COMMENT BOTTOM SHEET
    const commentBtns = document.querySelectorAll('.action-btn-comment');
    const sheet = document.getElementById('comment-sheet');
    const backdrop = document.getElementById('sheet-backdrop');
    const handle = document.getElementById('sheet-drag-handle');
    
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    const openSheet = () => {
        sheet.classList.replace('sheet-closed', 'sheet-open');
        sheet.style.transform = ''; 
        backdrop.classList.replace('opacity-0', 'opacity-100');
        backdrop.classList.remove('pointer-events-none');
    };

    const closeSheet = () => {
        sheet.classList.replace('sheet-open', 'sheet-closed');
        sheet.style.transform = ''; 
        backdrop.classList.replace('opacity-100', 'opacity-0');
        backdrop.classList.add('pointer-events-none');
    };

    commentBtns.forEach(btn => btn.addEventListener('click', openSheet));
    if (backdrop) backdrop.addEventListener('click', closeSheet);

    if (handle && sheet) {
        handle.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isDragging = true;
            sheet.style.transition = 'none'; 
        }, { passive: true });

        handle.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentY = e.touches[0].clientY - startY;
            if (currentY > 0) { 
                sheet.style.transform = `translateY(${currentY}px)`;
            }
        }, { passive: true });

        handle.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            sheet.style.transition = 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)';
            
            if (currentY > 150) {
                closeSheet();
            } else {
                sheet.style.transform = 'translateY(0%)'; 
            }
            currentY = 0;
        });
    }

    // 8. STATEFUL STORY VIEWER
    const storyData = [
        { title: "Arrival", img: AST.story1 },
        { title: "Cinepolis", img: AST.story2 },
        { title: "The Kiss", img: AST.story3 }
    ];
    let currentStoryIdx = 0;
    let storyTimer;
    
    const storyTriggers = document.querySelectorAll('.ig-story-trigger');
    const viewer = document.getElementById('ig-story-viewer');
    const viewerCloseBtn = document.getElementById('close-story-btn');
    const displayImg = document.getElementById('story-media-display');
    const displayTitle = document.getElementById('story-display-title');
    const bgBlur = document.getElementById('story-bg-blur');
    const progressFills = [
        document.getElementById('prog-0'),
        document.getElementById('prog-1'),
        document.getElementById('prog-2')
    ];

    const loadStory = (idx) => {
        if (idx >= storyData.length) { closeStory(); return; }
        if (idx < 0) idx = 0;
        currentStoryIdx = idx;

        const data = storyData[idx];
        if (displayImg) displayImg.style.backgroundImage = `url('${data.img}')`;
        if (bgBlur) bgBlur.style.backgroundImage = `url('${data.img}')`;
        if (displayTitle) displayTitle.innerText = data.title;

        progressFills.forEach((fill, i) => {
            if (!fill) return;
            fill.classList.remove('story-progress-bar', 'story-progress-paused');
            void fill.offsetWidth; 
            if (i < idx) {
                fill.style.width = '100%'; 
            } else if (i === idx) {
                fill.style.width = '0%';
                fill.classList.add('story-progress-bar'); 
            } else {
                fill.style.width = '0%'; 
            }
        });

        clearTimeout(storyTimer);
        storyTimer = setTimeout(() => {
            loadStory(currentStoryIdx + 1);
        }, 4500);
    };

    const openStory = (idx) => {
        if(viewer) {
            viewer.classList.remove('opacity-0', 'pointer-events-none');
            viewer.classList.add('opacity-100');
            loadStory(idx);
        }
    };

    const closeStory = () => {
        if(viewer) {
            viewer.classList.add('opacity-0', 'pointer-events-none');
            viewer.classList.remove('opacity-100');
            clearTimeout(storyTimer);
            progressFills.forEach(fill => {
                if(fill) fill.classList.remove('story-progress-bar');
            });
        }
    };

    storyTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const idx = parseInt(trigger.getAttribute('data-idx'));
            openStory(idx);
        });
    });

    if (viewerCloseBtn) viewerCloseBtn.addEventListener('click', closeStory);

    const tapLeft = document.getElementById('story-tap-left');
    const tapRight = document.getElementById('story-tap-right');

    if (tapLeft) tapLeft.addEventListener('click', () => loadStory(currentStoryIdx - 1));
    if (tapRight) tapRight.addEventListener('click', () => loadStory(currentStoryIdx + 1));
    
    const pauseStory = () => {
        clearTimeout(storyTimer);
        const activeProg = progressFills[currentStoryIdx];
        if (activeProg) activeProg.classList.add('story-progress-paused');
    };
    const resumeStory = () => {
        const activeProg = progressFills[currentStoryIdx];
        if (activeProg) activeProg.classList.remove('story-progress-paused');
        storyTimer = setTimeout(() => loadStory(currentStoryIdx + 1), 4500);
    };

    [tapLeft, tapRight].forEach(zone => {
        if (!zone) return;
        zone.addEventListener('touchstart', pauseStory, { passive: true });
        zone.addEventListener('touchend', resumeStory);
        zone.addEventListener('mousedown', pauseStory);
        zone.addEventListener('mouseup', resumeStory);
        zone.addEventListener('mouseleave', resumeStory);
    });

});


```
