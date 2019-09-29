(function () {
    const app = document.getElementById('app');
    const nav = document.getElementById('nav');
    
    window.addEventListener('popstate', e => {
        console.log('[PopState]', e.state);
        app.innerHTML = JSON.stringify(e);
    });
    nav.addEventListener('click', e => {
        e.preventDefault();
        const path = e.target.getAttribute('href');
        history.pushState({ path }, null, path);
        console.log('[Nav]', 'hi');
        app.innerHTML = 'helloworld';
    });
}());