localProxy = (function() {

	return {

		connect: function() {
			var args = Array.prototype.slice.call(arguments, ''),
				frame = null,
				framelist = null,
				fr = null;
			if (args[0] == undefined) {
				return null;
			} else if (args[0] === '_parent') {
				frame = window.parent;
			} else if (args[0].slice(0,1) === '#') {
				frame = document.getElementById(args[0].slice(1));
			} else {
				framelist = Array.prototype.slice.call(window.frames, '');
				framelist.map(function(fr) {
					if (fr.location.href == args[0]) frame = fr;
				});
			}

			if (frame != null) {
				console.log("found frame:" + frame.src);
			} else {
				console.log("frame not found");
			}
		}

	}
	
}());

var localProxyWrapper = function(event) {
	localProxy.handshake.call(localProxy, event);
}


// preferred method of use
// localProxy.connect("_parent") // connects to the parent window
// localProxy.connect("#testframe"); // connects to the frame with the specified id
localProxy.connect("http://localhost/slimstart/frame_content.html"); // connects to the frame with this source


// localProxy.connect(selector, onsuccess, onfailure, timeout)