function initDatabase(callback) {
	var database = 'imchelin';
	var databaseVersion = 6;

	return $.get('/api/getDishes', function(data) {
		var tableDishes = JSON.parse(data);
		$.get('/api/restaurants', function(data) {
			var db;
			var tableRestaurants = JSON.parse(data);
			if(!window.indexedDB) {
				var request = window.msIndexedDB.open(database, databaseVersion);
				console.log('msIndexedDB');
			} else {
				var request = indexedDB.open(database, databaseVersion);
				console.log('indexedDB');
			}
			request.onerror = function(event) {
				console.log('DB NOT Opened');
				console.log(event);
			};
			request.onupgradeneeded = function(event) {
				var db = event.target.result;
				if(db.objectStoreNames.length>0) {
					for(i=0; i < db.objectStoreNames.length; i++) {
						db.deleteObjectStore(db.objectStoreNames.item(i));
					}
				}
				var objectStore = db.createObjectStore('restaurants', {keyPath: 'no'});
				objectStore.createIndex('status', 'status', {unique: false});
				objectStore.createIndex('name', 'name', {unique: false});
				objectStore.createIndex('description', 'description', {unique: false});
				objectStore.createIndex('picture', 'picture', {unique: false});
				objectStore.createIndex('telephone', 'telephone', {unique: false});
				objectStore.createIndex('opentime', 'opentime', {unique: false});
				objectStore.createIndex('closetime', 'closetime', {unique: false});
				objectStore.createIndex('opendate', 'opendate', {unique: false});
				objectStore.createIndex('closedate', 'closedate', {unique: false});
				objectStore.createIndex('runningday', 'runningday', {unique: false});
				objectStore.createIndex('tags', 'tags', {unique: false});
				objectStore.createIndex('spots_no', 'spots_no', {unique: false});
				objectStore.createIndex('spots', 'spots', {unique: false});
				objectStore.createIndex('kinds_no', 'kinds_no', {unique: false});
				objectStore.createIndex('kinds', 'kinds', {unique: false});

				tableRestaurants.forEach(function(value, index) {
					objectStore.add(value);
				});
				
				console.log('Restaurants Upgraded');

				var objectStore = db.createObjectStore('dishes', {keyPath: 'no'});
				objectStore.createIndex('name', 'name', {unique: false});
				objectStore.createIndex('description', 'description', {unique: false});
				objectStore.createIndex('price', 'price', {unique: false});
				objectStore.createIndex('grade', 'grade', {unique: false});
				objectStore.createIndex('title', 'title', {unique: false});
				objectStore.createIndex('comment', 'comment', {unique: false});
				objectStore.createIndex('restaurants_no', 'restaurants_no', {unique: false});
				objectStore.createIndex('restaurants', 'restaurants', {unique: false});
				objectStore.createIndex('spots_no', 'spots_no', {unique: false});
				objectStore.createIndex('spots', 'spots', {unique: false});
				objectStore.createIndex('tags', 'tags', {unique: false});

				tableDishes.forEach(function(value, index) {
					objectStore.add(value);
				});
				
				console.log('Dishes Upgraded');
			}
			request.onsuccess = callback;
		});
	});
}
