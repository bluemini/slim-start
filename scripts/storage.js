// attach an event listener to the 'storage' event
cyn(window).bind("storage", function(e) {
	console.log("storage action");
});

window.addEventListener("storage", handle_storage, false);

function handle_storage(e) {
	if (!e) { e = window.event; }
	console.log("native listener; storage action");
}

// check for local storage support and then push a key to the store
if (cyn().hasHTML5Storage()) {
	console.log("storage found");
	localStorage.setItem("name", "Bob");

	console.log(localStorage.getItem("name"));
} else{
	console.log("storage not found");
}