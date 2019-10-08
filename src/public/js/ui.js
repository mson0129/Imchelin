(function () {
    

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