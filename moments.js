(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        #moments-interactive-box {
            width: 100%;
            max-width: 320px;
            height: 55px; 
            margin: 0 auto 20px auto;
            border-radius: 30px;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: height 0.6s cubic-bezier(0.25, 1, 0.5, 1), background 0.4s ease, border-radius 0.4s ease;
            overflow: hidden;
            color: white;
            box-sizing: border-box;
            position: relative;
            z-index: 10;
        }

        #moments-interactive-box.is-expanded {
            height: 380px; 
            border-radius: 20px;
            background: rgba(0, 0, 0, 0.7); 
            justify-content: flex-start;
            padding: 30px 20px;
            cursor: default;
        }

        #moments-text {
            font-size: 13px;
            letter-spacing: 3px;
            font-weight: 600;
            display: flex;
            align-items: center;
        }
        
        #moments-text span { margin-right: 10px; font-size: 16px; }

        #moments-list {
            list-style: none;
            padding: 0;
            margin: 0;
            width: 100%;
            display: none; 
        }

        .moment-item {
            margin: 18px 0;
            font-size: 15px;
            color: rgba(255, 255, 255, 0.9);
            letter-spacing: 1px;
            font-family: 'Playfair Display', serif;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            padding-bottom: 5px;
            white-space: nowrap;
        }

        .close-moments-btn {
            margin-top: 30px;
            color: rgba(255, 255, 255, 0.4);
            font-size: 11px;
            text-align: center;
            width: 100%;
            cursor: pointer;
            letter-spacing: 3px;
            text-transform: uppercase;
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('DOMContentLoaded', () => {
        const box = document.getElementById('moments-interactive-box');
        if (!box) return; 
        
        const textSpan = document.getElementById('moments-text');
        const listContainer = document.getElementById('moments-list');
        
        const momentsData = [
            "Our first meet",
            "Our first date",
            "Our first photo",
            "Her birthday 2026",
            "His birthday 2026"
        ];

        let state = 'closed'; 
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        box.onclick = async (e) => {
            if (state !== 'closed') return; 
            state = 'animating';

            let currentText = textSpan.innerText;
            while (currentText.length > 0) {
                currentText = currentText.slice(0, -1);
                textSpan.innerText = currentText;
                await wait(25); 
            }
            textSpan.style.display = 'none';

            box.classList.add('is-expanded');
            await wait(600); 

            listContainer.style.display = 'block';
            listContainer.innerHTML = ''; 

            for (let i = 0; i < momentsData.length; i++) {
                let li = document.createElement('li');
                li.className = 'moment-item';
                listContainer.appendChild(li);

                let str = momentsData[i];
                for (let j = 0; j < str.length; j++) {
                    li.innerHTML += str.charAt(j);
                    await wait(25);
                }
                await wait(100); 
            }

            let closeBtn = document.createElement('div');
            closeBtn.className = 'close-moments-btn';
            closeBtn.onclick = (event) => {
                event.stopPropagation(); 
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

        async function closeMomentsSequence() {
            if (state !== 'open') return;
            state = 'animating';

            const elementsToErase = Array.from(listContainer.children).reverse();
            for (let el of elementsToErase) {
                let text = el.innerText;
                while (text.length > 0) {
                    text = text.slice(0, -1);
                    el.innerText = text;
                    await wait(15); 
                }
                el.remove();
            }
            listContainer.style.display = 'none';

            box.classList.remove('is-expanded');
            await wait(600);

            textSpan.style.display = 'flex';
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
