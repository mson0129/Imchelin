(function () {
    const app = document.getElementById('app');
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches
    const isNotSpecified = window.matchMedia('(prefers-color-scheme: no-preference)').matches
    const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;

    window.matchMedia('(prefers-color-scheme: dark)').addListener(e => e.matches && activateDarkMode())
    window.matchMedia('(prefers-color-scheme: light)').addListener(e => e.matches && activateLightMode())

    function activateDarkMode() {
        console.log('[color]', 'DarkMode');
    }

    function activateLightMode() {
        console.log('[color]', 'LightMode');
    }

    if(isDarkMode) activateDarkMode()
    if(isLightMode) activateLightMode()
    if(isNotSpecified || hasNoSupport) {
        console.log('You specified no preference for a color scheme or your browser does not support it. I Schedule dark mode during night time.')
        now = new Date();
        hour = now.getHours();
        if (hour < 4 || hour >= 16) {
            activateDarkMode();
        }
    }

    window.screen.orientation.lock('portrait');
    ScreenOrientation.lock('portrait');
    window.screen.mozOrientation.lock('portrait');
    window.screen.lockOrientation('portrait');
}());