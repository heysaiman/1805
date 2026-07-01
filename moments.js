```javascript
(function() {
    // 1. Inject the CSS for the smooth animations
    const style = document.createElement('style');
    style.innerHTML = `
        /* The main box */
        #moments-interactive-box {
            width: 100%;
            max-width: 300px; /* Matches your PLAY button width */
            height: 60px; /* Starting height */
            margin: 15px auto;
            border-radius: 30px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(15px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: height 0.6s cubic-bezier(0.25, 1, 0.5, 1), border-radius 0.6s ease;
            overflow: hidden;
            color: white;
            font-family: inherit;
            box-sizing: border-box;
            position: relative;
        }

        /* The expanded glass card */
        #moments-interactive-box.is-expanded {
            height: 380px; 
            border-radius: 20px;
            background: rgba(0, 0, 0, 0.6); /* Slightly darker when open */
            border: 1px solid rgba(255, 255, 255, 0.25);
            justify-content: flex-start;
            align-items: flex-start;
            padding: 30px;
            cursor: default;
        }

        /* The starting text */
        #moments-text {
            font-size: 14px;
            letter-spacing: 2px;
            font-weight: 500;
            white-space: nowrap;
            transition: opacity 0.3s;
        }

        /* The hidden list */
        #moments-list {
            list-style: none;
            padding: 0;
            margin: 0;
            width: 100%;
            display: none; /* Hidden until expanded */
        }

        .moment-item {
            margin: 18px 0;
            font-size: 15px;
            color: rgba(255, 255, 255, 0.9);
            letter-spacing: 1px;
            white-space: nowrap;
            border-bottom: 1px solid transparent;
            cursor: pointer;
            transition: color 0.3s;
        }

        .moment-item:hover { color: #d4af37; /* A subtle gold highlight on hover */ }

        /* The Close Button at the bottom */
        .close-moments-btn {
            margin-top: auto;
            color: rgba(255, 255, 255, 0.5);
            font-size: 12px;
            text-align: center;
            width: 100%;
            cursor: pointer;
            letter-spacing: 2px;
        }
        .close-moments-btn:hover { color: #fff; }
    `;
    document.head.appendChild(style);

    // 2. The Animation Engine
    document.addEventListener('DOMContentLoaded', () => {
        const box = document.getElementById('moments-interactive-box');
        const textSpan = document.getElementById('moments-text');
        const listContainer = document.getElementById('moments-list');
        
        if (!box) return; // Failsafe if the HTML isn't added yet

        const momentsData = [
            "Our first meet",
            "Our first date",
            "Our first photo",
            "Her birthday 2026",
            "His birthday 2026"
        ];

        let state = 'closed'; // Tracks animation state to prevent glitches
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        // --- OPEN ANIMATION ---
        box.onclick = async (e) => {
            if (state !== 'closed') return; // Ignore clicks if animating or open
            state = 'animating';

            // Phase 1: Backspace the text
            let currentText = textSpan.innerText;
            while (currentText.length > 0) {
                currentText = currentText.slice(0, -1);
                textSpan.innerText = currentText;
                await wait(30); // Speed of backspace
            }
            textSpan.style.display = 'none';

            // Phase 2: Expand the box
            box.classList.add('is-expanded');
            await wait(600); // Wait for the CSS height transition to finish

            // Phase 3: Typewriter effect for the list
            listContainer.style.display = 'block';
            listContainer.innerHTML = ''; // Clear just in case

            for (let i = 0; i < momentsData.length; i++) {
                let li = document.createElement('li');
                li.className = 'moment-item';
                // Click interaction for the future
                li.onclick = () => console.log("Clicked:", momentsData[i]); 
                listContainer.appendChild(li);

                // Type out the characters one by one
                let str = "- " + momentsData[i];
                for (let j = 0; j < str.length; j++) {
                    li.innerHTML += str.charAt(j);
                    await wait(25); // Speed of typing
                }
                await wait(150); // Pause between lines
            }

            // Phase 4: Type out the close button
            let closeBtn = document.createElement('div');
            closeBtn.className = 'close-moments-btn';
            closeBtn.onclick = (event) => {
                event.stopPropagation(); // Stop box click from firing
                closeMomentsSequence();
            };
            listContainer.appendChild(closeBtn);

            let closeStr = "[ CLOSE ]";
            for (let j = 0; j < closeStr.length; j++) {
                closeBtn.innerHTML += closeStr.charAt(j);
                await wait(30);
            }

            state = 'open';
        };

        // --- CLOSE ANIMATION ---
        async function closeMomentsSequence() {
            if (state !== 'open') return;
            state = 'animating';

            // Phase 1: Backspace all the list items from bottom to top
            const elementsToErase = Array.from(listContainer.children).reverse();
            for (let el of elementsToErase) {
                let text = el.innerText;
                while (text.length > 0) {
                    text = text.slice(0, -1);
                    el.innerText = text;
                    await wait(10); // Super fast erase
                }
                el.remove();
            }
            listContainer.style.display = 'none';

            // Phase 2: Shrink the box
            box.classList.remove('is-expanded');
            await wait(600); // Wait for shrink

            // Phase 3: Type original text back
            textSpan.style.display = 'block';
            textSpan.innerText = '';
            let originalText = "✦ MOMENTS";
            for (let i = 0; i < originalText.length; i++) {
                textSpan.innerHTML += originalText.charAt(i);
                await wait(40);
            }

            state = 'closed';
        }
    });
})();

```
