(function () {
    const screen = window.screen;
    if (!screen) return;
    const orientation = screen.orientation;
    const lock = orientation && orientation.lock
        ? orientation.lock.bind(orientation)
        : screen.lockOrientation || screen.mozLockOrientation;
    if (typeof lock !== 'function') return;

    try {
        const result = lock.call(screen, 'portrait');
        // Browsers can reject locking outside fullscreen or on desktop.
        if (result && typeof result.catch === 'function') result.catch(function () {});
    } catch (error) {
        // Orientation locking is optional; it must not interrupt the app.
    }
}());
