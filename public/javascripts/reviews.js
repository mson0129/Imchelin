var paths = location.pathname.split('/');

var getRestaurant = function() {
    console.log('DB Opened');
    var db = event.target.result;
    var transaction = db.transaction('restaurants');
	var objectStore = transaction.objectStore('restaurants');
    var request = objectStore.get(Number(paths[paths.length-1]));
    request.onerror = function(event) {
        console.log(error);
        throw error;
    };
    request.onsuccess = function(event) {
        $('h4')[0].innerHTML = event.target.result.name;
        $('p.description')[0].innerHTML = event.target.result.description;
        for(i=0; i<7; i++) {
            if(event.target.result.runningday.substr(i, 1)==0) {
                $('ul.runningDay > li:nth-child('+(i+1)+')').addClass('closed');
            }
        }
        if(event.target.result.picture != null) {
            var img = document.createElement("img");
            img.setAttribute("src", event.target.result.picture);
            $('p.description').append(img);
        }
    };

    var transaction2 = db.transaction('dishes');
	var objectStore2 = transaction2.objectStore('dishes');
    var index = objectStore2.index('restaurants_no');
    var request2 = index.get(paths[paths.length-1]);
    request2.onerror = function(event) {
        console.log(error);
        throw error;
    };
    request2.onsuccess = function(event) {
        console.log(event.target.result);
    }
}

var getDish = function() {
    console.log('DB Opened');
    var db = event.target.result;
    var transaction = db.transaction('dishes');
	var objectStore = transaction.objectStore('dishes');
    var request = objectStore.get(Number(paths[paths.length-1]));
    request.onerror = function(event) {
        console.log(error);
        throw error;
    };
    request.onsuccess = function(event) {
        console.log(event.target.result);
    }
}