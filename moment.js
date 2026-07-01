// --- moments.js ---

// ✧----------------- PHOTO CONFIGURATION -----------------✧
// Paste your first-meet photo URL here! 
const firstMeetPhotoUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800"; 
// ✧-------------------------------------------------------✧

const myMoments = [
    "Our first meet",
    "Our first date",
    "Her birthday 2026",
    "His birthday 2026"
];

document.addEventListener('DOMContentLoaded', () => {
    const originalBtn = document.getElementById('moments-magic-btn');
    if (!originalBtn) return;

    let isAnimating = false;
    let isOpen = false;
    
    // Set up the Main Photo URL in the Netflix Panel
    const bannerImg = document.getElementById('netflix-banner-img');
    const bannerPlaceholder = document.getElementById('netflix-banner-placeholder');
    if (bannerImg && firstMeetPhotoUrl) {
        bannerImg.style.backgroundImage = `url('${firstMeetPhotoUrl}')`;
        if (bannerPlaceholder) bannerPlaceholder.style.display = 'none';
    }

    // Premium blur overlay with GPU flags
    const overlay = document.createElement('div');
    overlay.className = "fixed inset-0 bg-black/75 backdrop-blur-md opacity-0 pointer-events-none";
    overlay.style.transition = "opacity 0.8s cubic-bezier(0.32, 0.72, 0, 1)";
    overlay.style.willChange = "opacity";
    overlay.style.transform = "translateZ(0)"; 
    overlay.style.zIndex = "9990";
    document.body.appendChild(overlay);

    // Create a ghost placeholder to prevent layout glitches
    const ghostAnchor = document.createElement('div');
    ghostAnchor.style.display = "none";
    ghostAnchor.style.visibility = "hidden";
    ghostAnchor.style.pointerEvents = "none";
    originalBtn.parentNode.insertBefore(ghostAnchor, originalBtn);

    const wait = (ms) => new Promise(r => setTimeout(r, ms));

    originalBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (isAnimating || isOpen) return;
        isAnimating = true;

        const startRect = originalBtn.getBoundingClientRect();
        const startTop = Math.round(startRect.top);
        const startLeft = Math.round(startRect.left);
        const startWidth = Math.round(startRect.width);
        const startHeight = Math.round(startRect.height);

        ghostAnchor.style.width = startWidth + "px";
        ghostAnchor.style.height = startHeight + "px";
        ghostAnchor.style.margin = window.getComputedStyle(originalBtn).margin;
        ghostAnchor.style.display = "block";

        originalBtn.style.visibility = "hidden";
        originalBtn.style.opacity = "0";

        document.body.style.overflow = "hidden";

        const clone = document.createElement('div');
        clone.innerHTML = originalBtn.innerHTML; 
        clone.className = originalBtn.className; 
        clone.classList.remove('hover:-translate-y-1', 'hover:bg-white/10', 'group'); 
        
        clone.style.position = 'fixed';
        clone.style.top = startTop + 'px';
        clone.style.left = startLeft + 'px';
        clone.style.width = startWidth + 'px';
        clone.style.height = startHeight + 'px';
        clone.style.margin = '0';
        clone.style.zIndex = '9999';
        clone.style.display = 'flex';
        clone.style.alignItems = 'center';
        clone.style.justifyContent = 'center';
        clone.style.boxSizing = 'border-box';
        
        clone.style.willChange = 'top, left, width, height, border-radius, background-color';
        clone.style.transform = 'translateZ(0)'; 
        clone.style.overflow = 'hidden';
        
        const initialTextWrapper = document.createElement('div');
        initialTextWrapper.style.position = "absolute";
        initialTextWrapper.style.inset = "0";
        initialTextWrapper.style.display = "flex";
        initialTextWrapper.style.alignItems = "center";
        initialTextWrapper.style.justifyContent = "center";
        initialTextWrapper.style.gap = "1rem";
        initialTextWrapper.style.opacity = "1";
        initialTextWrapper.style.transition = "opacity 0.2s ease-out";
        initialTextWrapper.innerHTML = originalBtn.innerHTML;
        clone.appendChild(initialTextWrapper);

        document.body.appendChild(clone);

        overlay.classList.remove('pointer-events-none');
        overlay.style.opacity = "1";

        await new Promise(requestAnimationFrame);

        initialTextWrapper.style.opacity = "0";
        await wait(200);

        const targetWidth = Math.round(Math.min(window.innerWidth * 0.9, 360));
        const targetHeight = 440;
        const targetTop = Math.round((window.innerHeight - targetHeight) / 2);
        const targetLeft = Math.round((window.innerWidth - targetWidth) / 2);

        clone.style.transition = 'top 0.6s cubic-bezier(0.32, 0.72, 0, 1), left 0.6s cubic-bezier(0.32, 0.72, 0, 1), width 0.6s cubic-bezier(0.32, 0.72, 0, 1), height 0.6s cubic-bezier(0.32, 0.72, 0, 1), border-radius 0.6s cubic-bezier(0.32, 0.72, 0, 1), background-color 0.6s ease';
        
        clone.style.top = targetTop + 'px';
        clone.style.left = targetLeft + 'px';
        clone.style.width = targetWidth + 'px';
        clone.style.height = targetHeight + 'px';
        clone.style.borderRadius = '2rem';
        clone.style.background = 'rgba(10, 5, 8, 0.85)';
        clone.style.border = '1px solid rgba(252, 243, 215, 0.15)';
        
        await wait(650); 
        initialTextWrapper.remove();

        const contentWrapper = document.createElement('div');
        contentWrapper.style.width = "100%";
        contentWrapper.style.height = "100%";
        contentWrapper.style.display = "flex";
        contentWrapper.style.flexDirection = "column";
        contentWrapper.style.alignItems = "center";
        contentWrapper.style.padding = "40px 30px";
        contentWrapper.style.opacity = "0"; 
        contentWrapper.style.transition = "opacity 0.4s ease";
        clone.appendChild(contentWrapper);

        const title = document.createElement('h3');
        title.style.color = "#fcf3d7";
        title.style.fontFamily = "'Playfair Display', serif";
        title.style.fontSize = "1.2rem";
        title.style.letterSpacing = "0.3em";
        title.style.marginBottom = "30px";
        title.innerText = "✧ MOMENTS";
        contentWrapper.appendChild(title);
        
        const list = document.createElement('div');
        list.style.width = "100%";
        list.style.display = "flex";
        list.style.flexDirection = "column";
        list.style.gap = "20px";
        contentWrapper.appendChild(list);

        const actions = document.createElement('div');
        actions.style.display = "flex";
        actions.style.justifyContent = "space-between";
        actions.style.width = "100%";
        actions.style.marginTop = "auto";
        
        const addBtn = document.createElement('span');
        addBtn.innerHTML = "+ ADD";
        addBtn.style.color = "#10b981"; 
        addBtn.style.fontSize = "12px";
        addBtn.style.letterSpacing = "0.2em";
        addBtn.style.cursor = "pointer";

        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = "CLOSE ✕";
        closeBtn.style.color = "rgba(255,255,255,0.5)";
        closeBtn.style.fontSize = "12px";
        closeBtn.style.letterSpacing = "0.2em";
        closeBtn.style.cursor = "pointer";
        closeBtn.style.padding = "10px";
        closeBtn.style.margin = "-10px";

        actions.appendChild(addBtn);
        actions.appendChild(closeBtn);
        contentWrapper.appendChild(actions);

        requestAnimationFrame(() => {
            contentWrapper.style.opacity = "1";
        });
        
        await wait(200);

        for (let item of myMoments) {
            let p = document.createElement('p');
            p.style.fontFamily = "'Montserrat', sans-serif";
            p.style.fontWeight = "300";
            p.style.color = "rgba(255,255,255,0.9)";
            p.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
            p.style.paddingBottom = "5px";
            p.style.fontSize = "14px";
            p.style.width = "100%";
            p.style.textAlign = "center";
            p.style.letterSpacing = "0.05em";
            p.style.cursor = "pointer";
            p.style.transition = "color 0.3s";
            
            p.className = "hover:text-emerald-400 active:scale-[0.98]";

            if (item === "Our first meet") {
                p.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openNetflixPanel();
                });
            }

            list.appendChild(p);

            for (let char of item) {
                p.innerHTML += char;
                await wait(20);
            }
            await wait(50);
        }

        isAnimating = false;
        isOpen = true;

        closeBtn.onclick = async (e) => {
            e.stopPropagation();
            if (isAnimating) return;
            isAnimating = true;
            
            contentWrapper.style.opacity = "0";
            await wait(300);
            contentWrapper.remove();

            const returnTextWrapper = document.createElement('div');
            returnTextWrapper.style.position = "absolute";
            returnTextWrapper.style.inset = "0";
            returnTextWrapper.style.display = "flex";
            returnTextWrapper.style.alignItems = "center";
            returnTextWrapper.style.justifyContent = "center";
            returnTextWrapper.style.gap = "1rem";
            returnTextWrapper.style.opacity = "0";
            returnTextWrapper.style.transition = "opacity 0.3s ease-in";
            returnTextWrapper.innerHTML = originalBtn.innerHTML;
            clone.appendChild(returnTextWrapper);

            const returnRect = ghostAnchor.getBoundingClientRect();
            const returnTop = Math.round(returnRect.top);
            const returnLeft = Math.round(returnRect.left);
            const returnWidth = Math.round(returnRect.width);
            const returnHeight = Math.round(returnRect.height);

            overlay.style.opacity = "0";

            clone.style.top = returnTop + 'px';
            clone.style.left = returnLeft + 'px';
            clone.style.width = returnWidth + 'px';
            clone.style.height = returnHeight + 'px';
            clone.style.borderRadius = '9999px'; 
            clone.style.padding = '0';
            clone.style.background = 'rgba(255, 255, 255, 0.05)'; 
            clone.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            
            await wait(450); 
            returnTextWrapper.style.opacity = "1";
            await wait(200);

            clone.remove();
            originalBtn.style.visibility = "visible";
            originalBtn.style.opacity = '1';
            originalBtn.style.pointerEvents = 'auto';
            ghostAnchor.style.display = "none";

            overlay.classList.add('pointer-events-none');
            document.body.style.overflow = ""; 
            isAnimating = false;
            isOpen = false;
        };
    });

    // ✧ NETFLIX PANEL FUNCTIONALITY ✧
    const netflixPanel = document.getElementById('netflix-panel');
    const netflixBack = document.getElementById('netflix-back');
    const netflixFavorite = document.getElementById('netflix-favorite');
    const heartSvg = document.getElementById('heart-icon-svg');
    const netflixMylist = document.getElementById('netflix-mylist-btn');
    const mylistIcon = document.getElementById('mylist-icon');
    const netflixInfo = document.getElementById('netflix-info-btn');
    const secretCard = document.getElementById('secret-details-card');
    const hearts = Array.from(document.querySelectorAll('#netflix-hearts-container span'));

    function openNetflixPanel() {
        netflixPanel.style.transform = "translateX(0)";
    }

    function closeNetflixPanel() {
        netflixPanel.style.transform = "translateX(100%)";
    }

    if (netflixBack) {
        netflixBack.addEventListener('click', closeNetflixPanel);
    }

    let isFav = false;
    if (netflixFavorite) {
        netflixFavorite.addEventListener('click', () => {
            isFav = !isFav;
            if (isFav) {
                netflixFavorite.classList.remove('text-white/50');
                netflixFavorite.classList.add('text-pink-500');
                heartSvg.classList.remove('fill-none');
                heartSvg.classList.add('fill-current');
                netflixFavorite.style.transform = "scale(1.2)";
                setTimeout(() => netflixFavorite.style.transform = "none", 150);
            } else {
                netflixFavorite.classList.add('text-white/50');
                netflixFavorite.classList.remove('text-pink-500');
                heartSvg.classList.add('fill-none');
                heartSvg.classList.remove('fill-current');
            }
        });
    }

    let addedToList = false;
    if (netflixMylist) {
        netflixMylist.addEventListener('click', () => {
            addedToList = !addedToList;
            if (addedToList) {
                mylistIcon.innerHTML = "✓";
                mylistIcon.classList.add('text-emerald-400');
            } else {
                mylistIcon.innerHTML = "+";
                mylistIcon.classList.remove('text-emerald-400');
            }
        });
    }

    let infoOpen = false;
    if (netflixInfo) {
        netflixInfo.addEventListener('click', () => {
            infoOpen = !infoOpen;
            if (infoOpen) {
                secretCard.classList.remove('hidden');
            } else {
                secretCard.classList.add('hidden');
            }
        });
    }

    hearts.forEach((heart, idx) => {
        heart.addEventListener('click', () => {
            hearts.forEach((h, hIdx) => {
                if (hIdx <= idx) {
                    h.style.color = '#ef4444'; 
                    h.style.transform = 'scale(1.2)';
                    setTimeout(() => h.style.transform = 'none', 150);
                } else {
                    h.style.color = 'rgba(255,255,255,0.2)'; 
                }
            });
        });
    });
});
