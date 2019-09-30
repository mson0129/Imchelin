(function ()  {
    var network = {};
    network.check = {};
    network.status = 0;

    if (typeof window.addEventListener === "function") {
        window.addEventListener('online', e => {
            network.status = 1;
        }, false);
        window.addEventListener('offline', e => {
            network.status = 0;
        }, false);
    }

    network.check.fetch = function () {
        fetch('/favicon.ico?_=' + ((new Date()).getTime()))
        .then(res => {console.log('online')})
        .catch(err => {console.log(err)});
    }

    network.check.xhr = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', '/favicon.ico?_=' + ((new Date()).getTime()), true);
        if (xhr.timeout != null) {
            xhr.timeout = 5000;
        }
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState != 4) {
                return;
            }
            if (xhr.status == 200) {
                console.log('online');
            } else {
                console.log('offline');
            }
        };
        try {
            xhr.send();
        } catch (e) {
            console.log(e);
        }
    }

    network.check.img = function () {
        var img = document.createElement('img');
        img.onload = function () {console.log('online');};
        img.onerror = function () {console.log('offline, notfound or non-image');};
        img.src = '/favicon.ico?_=' + ((new Date()).getTime());
    }

    if(typeof(fetch) === "function") {
        setInterval(network.check.fetch, 1000);
    } else if(typeof(XMLHttpRequest) === "function") {
        setInterval(network.check.xhr, 1000);
    } else {
        setInterval(network.check.img, 1000);
    }
}());