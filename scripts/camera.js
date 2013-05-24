cyn().loader(function() {
	console.log('dom loaded');
	cyn('picData').bind('onchange', function() {
		cyn('result').text('got the picture!!');
	});
});