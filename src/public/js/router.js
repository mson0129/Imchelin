(function () {
    const app = document.getElementById('app');
    const listMarkup = app.innerHTML;

    function render(path) {
        if (document.body.classList.contains('signin')) return;
        if (path === '/' || path === '/history') {
            app.innerHTML = listMarkup;
        } else {
            app.textContent = path;
        }
    }

    window.addEventListener('popstate', function () {
        render(window.location.pathname);
    });

    // Delegate once so loading or removing navigation never duplicates handlers.
    document.addEventListener('click', function (event) {
        const link = event.target.closest('#nav a[href]');
        if (!link || event.button !== 0 || event.metaKey || event.ctrlKey ||
            event.shiftKey || event.altKey) return;
        event.preventDefault();
        const path = link.getAttribute('href');
        history.pushState({ path: path }, '', path);
        render(path);
    });
}());
