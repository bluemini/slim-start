var db;
var request = window.indexedDB.open("MyGraphDatabase");

request.onsuccess = function(e) {
	db = request.result;
};

request.onupgradeneeded = function(e) {
	var db = e.target.result;
	var  objectStore = db.createObjectStore("nodes", { keyPath: "node_id" });

	objectStore.createIndex("project_id", "project_id", { unique: false });
};



// we bind to the 'save' button a static JS Object to the db
cyn("save").bind("click", function() {
	var transaction = db.transaction(["nodes"], "readwrite");

	transaction.oncomplete = function(e) {
		// 
		alert("all done!");
	};

	transaction.onerror = function(e) {
		// do something about it
		console.log(e);
	};

	var objectStore = transaction.objectStore("nodes");
	var data = { node_id: 1, project_id: 1234500, name: "My First Job", client: "Big Website Required Inc." };
	var insRequest = objectStore.put(data);
	insRequest.onsuccess = function(e) {
		alert(e.target.result);
	}
});

// when you click on the 'Fetch' button (id==get), then retrieve and display the record
cyn("get").bind("click", function() {
	var transaction = db.transaction(["nodes"]);

	var objectStore = transaction.objectStore("nodes");
	var readRequest = objectStore.get(1);

	readRequest.onsuccess = function(e) {
		alert("Found: " + JSON.stringify(e.target.result));
	}
});