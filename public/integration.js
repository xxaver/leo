const setupLeo = () => {
    const leo = document.createElement('div');
    leo.classList.add('leo');

    const logo = document.createElement('div');
    logo.classList.add('leo-logo');
    const img = document.createElement('img');
    img.width = 96;
    img.height = 96;
    img.src = 'https://frag-leo.vercel.app/logo.png';
    logo.appendChild(img);

    const chat = document.createElement('div');
    const iframe = document.createElement('iframe');
    iframe.src = 'https://frag-leo.vercel.app/';
    chat.appendChild(iframe);
    chat.classList.add('leo-chat');

    leo.appendChild(logo);
    leo.appendChild(chat);

    let isOpen = localStorage.getItem('leo-open');
    const setOpen = (open) => {
        isOpen = open;

        if(isOpen) chat.classList.add('leo-open');
        else chat.classList.remove('leo-open');
    }
    setOpen(isOpen);

    logo.addEventListener('click', () => {
        setOpen(!isOpen);
    })

    window.addEventListener("message", (event) => {
        if(event.data.action === 'leo-close') setOpen(false);
    });

    document.body.appendChild(leo);
}

window.addEventListener('load', setupLeo)