const test = async () => {
    const scriptContent = await (await fetch('https://frag-leo.vercel.app/integration.js')).text();
    const styleContent = await (await fetch('https://frag-leo.vercel.app/integration.css')).text();

    eval(scriptContent);
    const style = document.createElement('style');
    style.textContent = styleContent;
    document.head.appendChild(style);
}
test();