/*!
 * cyn.js
 *	
 * Author: Nick Harvey (diego.perini at gmail.com)
 * Summary: Main 'application' logic
 * Updated: 20120510
 * License: MIT - see LICENSE file in the root of the project
 * Version: 0.2
 *
 * URL:
 * https://github.com/bluemini/slim-start
 */

// cyn().bind(
// 	window.applicationCache,
// 	'updateready',
// 	function() {
// 		window.applicationCache.swapCache();
// 		console.log("appcache updateread");
// 	}
// );

window.applicationCache.addEventListener(
	'updateready', 
	function() {
		window.applicationCache.swapCache();
		console.log("appcache updateread");
	},
	false
);

// when window loads..
cyn().loader(function() {
	cyn('top').after(document.createElement("hr"));
	cyn('red').click(function() {
		cyn('demotext').color('#F00');
	});
	cyn('blue').click(function() {
		cyn('demotext').color('#00F');
	});
});

// you can do multiple onload handlers..
cyn().loader(function() {
	console.log("loader has been called");
})