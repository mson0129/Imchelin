function createTable(event, table, data, callback) {
	var db = event.target.result;
	db.deleteObjectStore(table);
	callback(db, data);
}

function initDatabase(callback) {
	var database = 'imchelin';
	var databaseVersion = 8;

	return $.get('/api/getDishes', function(data) {
		var tableDishes = JSON.parse(data);
		$.get('/api/restaurants', function(data) {
			var tableRestaurants = JSON.parse(data);
			var request = indexedDB.open(database, databaseVersion);
			console.log('indexedDB');
			request.onerror = function(event) {
				console.log('DB NOT Opened');
				console.log(event);
			};
			request.onupgradeneeded = function(event) {
				createTable(event, 'restaurants', tableRestaurants, function(db, data) {
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
					data.forEach(function(value, index) {
						objectStore.add(value);
					});
					console.log('Restaurants Upgraded');
				});
				createTable(event, 'dishes', tableDishes, function(db, data) {
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
					data.forEach(function(value, index) {
						objectStore.add(value);
					});	
					console.log('Dishes Upgraded');
				});
			}
			request.onsuccess = callback;
		});
	});
}