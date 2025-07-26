let isLeoSetUp = false;
const setupLeo = () => {
    if (!isLeoSetUp) {
        const style = document.createElement('style');
        style.textContent = `
:root {
    --leo-primary: #0095d0;
}
.leo {
    position: fixed;
    right: 1.25rem;
    bottom: 1.25rem;
    z-index: 1030;
}

.leo-logo {
    height: 4rem;
    width: 4rem;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: white;
    border: 1px solid var(--leo-primary);
    transition: all .2s;
    cursor: pointer;
}

.leo-logo:hover {
    transform: scale(1.1);
}

.leo-logo img {
    width: 3rem;
    height: 3rem;
}

.leo-chat {
    overflow: hidden;
    transform-origin: bottom right;
    position: absolute;
    right: 0;
    transition: all .1s;
    height: 60rem;
    width: 35rem;
    border: 1px solid oklch(0.922 0 0);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1px;
    color: gray;
    text-align: center;
    font-size: 1.4rem;
    box-shadow: 0 7px 10px 0 #dfdfdf;
    background-color: white;
}

.leo-chat iframe {
    flex-grow: 1;
    align-self: stretch;
    outline: none !important;
}

.leo-chat iframe:not(.leo-loaded) {
    display: none;
}

.leo:not(.leo-open):not(.leo-transitioning) .leo-chat {
    display: none;
}

.leo:not(.leo-open) .leo-chat, .leo.leo-transitioning .leo-chat {
    opacity: 0;
    transform: scale(.95);
}

@media (max-height: 1024px) {
    .leo-chat {
        max-height: calc(100dvh - 40px);
        bottom: 0;
    }

    .leo.leo-open .leo-logo {

    }
}

@media (min-height: 1025px) {
    .leo-chat {
        max-height: calc(100dvh - 40px);
        bottom: 0;
        
        /*max-height: calc(100dvh - 100px);*/
        /*translate: 0 calc(-100% - 10px);*/
        /*top: 0*/
    }
}

@media (max-width: 700px) {
    .leo-chat {
        translate: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100dvw;
        height: 100dvh;
        max-height: 100dvh;
    }
}

.leo-tooltip {
    width: max-content;
    display: flex;
    position: absolute;
    left: 0;
    top: 50%;
    translate: -100% -50%;
    background-color: white;
    border: 1px solid var(--leo-primary);
    padding: 10px;
    gap: 10px;
    border-radius: 10px;
    transform: translateX(-20px);
    transition: all .2s;
    max-width: calc(100dvw - 120px);
}

.leo-tooltip:after {
    content: "";
    position: absolute;
    right: 9px;
    top: 50%;
    translate: 100% -50%;
    border-right: 1px solid var(--leo-primary);
    border-top: 1px solid var(--leo-primary);
    height: 20px;
    width: 20px;
    background-color: white;
    transform: rotate(45deg);
}

.leo-tooltip:not(.leo-open):not(.leo-transitioning) {
    display: none;
}

.leo-tooltip.leo-transitioning {
    opacity: 0;
    transform: translateX(-10px);
}

.shrink-0 {
    flex-shrink: 0;
}

.grow {
    flex-grow: 1;
}

.text-lg {
    font-size: 1.125rem;
    line-height: 1.5rem;
}

.font-medium {
    font-weight: 500;
}

.text-sm {
    font-size: .875rem;
    line-height: 1.25rem;
}

.scroll-top {
    translate: 0 -5rem;
}`;
        document.head.appendChild(style);
    }
    isLeoSetUp = true;


    const origin = location.origin === "http://localhost:3000" ? "http://localhost:3000" : "https://bloenbot.vercel.app";


    const presentLeo = document.querySelector('.leo');

    const leo = presentLeo || document.createElement('div');
    leo.classList.add('leo');

    const logo = document.querySelector(".leo-logo") || document.createElement('div');
    const tooltip = document.querySelector('.leo-tooltip') || document.createElement('div');
    const chat = document.querySelector('.leo-chat') || document.createElement('div');
    const storage = sessionStorage;

    if (!presentLeo) {
        chat.classList.add('leo-chat');
        chat.textContent = "Wird geladen..."
        logo.classList.add('leo-logo');

        const img = document.createElement('img');
        img.width = 96;
        img.height = 96;
        img.src = "https://bloenbot.vercel.app/logo.png";
        img.style.objectFit = "contain";
        logo.appendChild(img);

        tooltip.classList.add('leo-tooltip');
        tooltip.innerHTML = `
        <svg
          class="shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0095d0"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 8V4H8" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M2 14h2" />
          <path d="M20 14h2" />
          <path d="M15 13v2" />
          <path d="M9 13v2" />
        </svg>

    <div class="grow">
         <div class="text-lg font-medium">
             Hallo, Ich bin Johannes!
         </div>
         <div class="text-sm">
             Ich helfe dir gerne bei Fragen rund ums Studienkolleg St. Johann
         </div>
    </div>
    `;

        leo.appendChild(logo);
        leo.appendChild(chat);
        leo.appendChild(tooltip);

        document.body.appendChild(leo);
    }

    let isOpen = false;//storage.getItem('leo-open');
    let isTooltipOpen = !storage.getItem('leo-tooltip-hidden');
    let loaded = leo.querySelector("iframe") !== null;

    const loadIframe = () => {
        loaded = true;
        const iframe = document.createElement('iframe');
        iframe.src = origin + '/?embedded=true';
        chat.appendChild(iframe);
        iframe.addEventListener("load", () => {
            chat.childNodes.forEach(e => e.nodeName.toLowerCase() === "#text" && e.remove())
            iframe.classList.add('leo-loaded');
        })
    }
    // loadIframe();

    const setOpen = (open) => {
        isOpen = open;
        if (isOpen) setTooltipOpen(false);
        if (isOpen && !loaded) loadIframe();

        storage.setItem('leo-open', isOpen ? 'true' : '');

        leo.classList.add("leo-transitioning");
        setTimeout(() => {
            leo.classList.remove("leo-transitioning")
            if (isOpen) leo.classList.add('leo-open');
            else leo.classList.remove('leo-open');
        }, isOpen ? 10 : 200);
    }
    const setTooltipOpen = (open) => {
        isTooltipOpen = open;

        tooltip.classList.add("leo-transitioning");
        setTimeout(() => {
            tooltip.classList.remove("leo-transitioning")
            if (isTooltipOpen) tooltip.classList.add('leo-open');
            else tooltip.classList.remove('leo-open');
        }, isTooltipOpen ? 10 : 200);
    }
    setTooltipOpen(isTooltipOpen);
    setOpen(isOpen);

    logo.addEventListener('click', () => {
        setOpen(!isOpen);
    })

    const tooltipTargets = [logo, tooltip];
    tooltipTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            if (isOpen) return;
            if (target === logo) storage.setItem('leo-tooltip-hidden', 'true');
            setTooltipOpen(true);
        })
        target.addEventListener('mouseleave', (e) => {
            if (e.target !== target) return;
            setTooltipOpen(false);
        })
    })

    window.addEventListener("message", (event) => {
        if (event.data.action === 'leo-close') setOpen(false);
    });
}

if (document.readyState === "complete") setupLeo()
else window.addEventListener('load', setupLeo)
