;(function(){
    var 

    init				=	function(){
        drawCanvas();
    	bindEventListener();
    },

    drawCanvas 			=	function(){
    	var canvas 		=	$('.canvas')[0];
    	if( canvas == null ){
    		return false;
    	}
    	var context 	=	canvas.getContext('2d');
    	
    	// context.fillRect(0, 0, 100, 100);
    	// //实践表明在不设施strokeStyle下的默认strokeStyle=black
    	// context.strokeRect(120, 0, 100, 100);
    	
    	// //设置纯色
    	// context.fillStyle = "red";
    	// context.strokeStyle = "blue";
    	// context.fillRect(0, 120, 100, 100);
    	// context.strokeRect(120, 120, 100, 100);
    	
    	// //设置透明度实践证明透明度值>0,<1值越低，越透明，值>=1时为纯色，值<=0时为完全透明
    	// context.fillStyle = "rgba(255,0,0,0.2)";
    	// context.strokeStyle = "rgba(255,0,0,0.2)";
    	// context.fillRect(240,0 , 100, 100);
    	// context.strokeRect(240, 120, 100, 100);

    	// context.clearRect(50, 50, 240, 120);

    	context.beginPath();
        context.arc(250, 250, 100, Math.PI, Math.PI*2, true);
        //不关闭路径路径会一直保留下去，当然也可以利用这个特点做出意想不到的效果
        context.closePath();
        context.fillStyle = 'rgba(0,255,0,0.25)';
        context.fill();
    },

    bindEventListener	=	function(){
        
    };

    $(init);
})();



