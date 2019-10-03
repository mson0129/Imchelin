(function () {
    //Display Light or Dark Mode
    const body = document.querySelector('body');
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches
    const isNotSpecified = window.matchMedia('(prefers-color-scheme: no-preference)').matches
    const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;

    window.matchMedia('(prefers-color-scheme: dark)').addListener(e => e.matches && activateDarkMode())
    window.matchMedia('(prefers-color-scheme: light)').addListener(e => e.matches && activateLightMode())

    function activateDarkMode() {
        body.classList.add('dark');
        body.classList.remove('light');
    }

    function activateLightMode() {
        body.classList.add('light');
        body.classList.remove('dark');
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

    //Screen Orientation
    if(typeof(ScreenOrientation.lock) === "function") {
        //Draft
        ScreenOrientation.lock('portrait');
    } else if(typeof(window.screen.lockOrientation) === "function") {
        //IE
        window.screen.lockOrientation('portrait');
    } else if(typeof(window.screen.mozOrientation.lock) === "function") {
        //moz
        window.screen.mozOrientation.lock('portrait');
    } else if(typeof(window.screen.orientation.lock) === "function") {
        //ETC
        window.screen.orientation.lock('portrait');
    }
}());