(function($){
	var code_container = $('.code-container'),
		code_change = $('.code-change');

	var ct = {
		initialise : function(){

		}
	};

	var bindEvent = function(){
		code_change.on("click",function(){
			code_container.attr("src","/code/");
		});
	};

	ct.initialise();
	bindEvent();
})(jQuery)