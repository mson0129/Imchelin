(function () {
    function initRouter() {
        const app = document.getElementById('app');
        const nav = document.getElementById('nav');
        
        //History(Back and Prev)
        window.addEventListener('popstate', e => {
            console.log('[PopState]', e.state);
            app.innerHTML = JSON.stringify(e);
        });
        //Click
        nav.addEventListener('click', e => {
            e.preventDefault();
            const path = e.target.getAttribute('href');
            history.pushState({ path }, null, path);
            app.innerHTML = path;
        });
    }

    if(typeof(MutationObserver) === 'function') {
        const target = document.querySelector('body');
        var observer = new MutationObserver(initRouter);
        var configs = {attributes: false, childList: true, characterData: false};
        observer.observe(target, configs);
    } else {
        document.body.addEventListener('DOMSubtreeModified', initRouter, false);
    }
}());