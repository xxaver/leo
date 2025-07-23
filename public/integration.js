const setupLeo = () => {
    // const origin = "http://localhost:3000";
    const origin = "https://frag-leo.vercel.app";

    const leo = document.createElement('div');
    leo.classList.add('leo');

    const logo = document.createElement('div');
    logo.classList.add('leo-logo');
    const img = document.createElement('img');
    img.width = 96;
    img.height = 96;
    img.src = "https://www.gymnasium-weingarten.de/fileadmin/templates/gymnasium-weingarten-de/assets/img/favicon.ico";
    logo.appendChild(img);

    const tooltip = document.createElement('div');
    tooltip.classList.add('leo-tooltip');
    tooltip.innerHTML = `
        <svg
          class="shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fb2c36"
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
             Hallo, Ich bin Leo! 🦁
         </div>
         <div class="text-sm">
             Ich helfe dir gerne bei Fragen rund ums Gymnasium Weingarten
         </div>
    </div>
    `;

    const storage = sessionStorage;
    
    const chat = document.createElement('div');

    chat.classList.add('leo-chat');
    chat.textContent = "Wird geladen..."

    leo.appendChild(logo);
    leo.appendChild(chat);
    leo.appendChild(tooltip);

    let isOpen = storage.getItem('leo-open');
    let isTooltipOpen = !storage.getItem('leo-tooltip-hidden');
    let loaded = false;
    
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
    loadIframe();
    
    const setOpen = (open) => {
        isOpen = open;
        if(isOpen) setTooltipOpen(false);
        if(isOpen && !loaded) loadIframe();
        
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
            if(isOpen) return;
            if(target === logo) storage.setItem('leo-tooltip-hidden', 'true');
            setTooltipOpen(true);
        })
        target.addEventListener('mouseleave', (e) => {
            if(e.target !== target) return;
            setTooltipOpen(false);
        })
    })

    window.addEventListener("message", (event) => {
        if (event.data.action === 'leo-close') setOpen(false);
    });

    document.body.appendChild(leo);
}

window.addEventListener('load', setupLeo)