require.config({
　　　paths: {
　　　　　　"jquery": "jquery",
　　　}
});

require(['math'], function(math){
	math.foo();
});


