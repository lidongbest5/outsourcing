/*
 *	TweenQuick is a util-class to tween elements with predefined tweens
 *
 *	@author	Edwin Veldhuizen <info@edwin.pw>
 */
var TweenQuick = (function (){
	var cache 		= 	[],

	checkIfCached			=	function($element, tweenFunction, reverse, callback){
		if($element.length < 1){
			console.log('ERROR::TweenQuick::'+tweenFunction+'		the provided element is null');
			return;
		}

		var elementID	 	=	$element.attr('data-tweenquick');
		if(elementID == null || elementID == '' ){
			elementID		=	cache.length;
			$element.attr('data-tweenquick', elementID);
		}
		if (cache[elementID] == null)		cache[elementID] = [];

		var timeline		=	cache[elementID][tweenFunction];
		if (timeline == null){
			// create new timeline
			timeline		=	new TimelineLite({
			    align:'sequence',
			    onComplete:callback,
			    onCompleteParams:[$element],
			    onReverseComplete:callback,
			    onReverseCompleteParams:[$element]
			 });
			cache[elementID][tweenFunction]	=	timeline;
			return timeline;
		}else{
            timeline.vars.onComplete           =   callback;
            timeline.vars.onReverseComplete    =   callback;

			// play from cache
			if(reverse || ( !timeline.reversed() && reverse == null)  ){
				timeline.timeScale(2).reverse();
			}else if( !reverse && timeline.totalProgress() == 0 || ( timeline.reversed() && reverse == null) ){
				timeline.timeScale(1).restart();
			}
		}
	},

	getCssProperties		=	function( $element, horizontal, vertical){
		var props		=	{};
		if(horizontal){
			props.marginTop		=	getClearCssValue($element,'margin-top');
			props.marginBottom	=	getClearCssValue($element,'margin-bottom');
			props.paddingTop	=	getClearCssValue($element,'padding-top');
			props.paddingBottom	=	getClearCssValue($element,'padding-bottom');
		}else{
            props.marginLeft    =	getClearCssValue($element,'margin-left');
			props.marginRight	=	getClearCssValue($element,'margin-right');
			props.paddingLeft	=	getClearCssValue($element,'padding-left');
			props.paddingRight	=	getClearCssValue($element,'padding-right');
		}
		return props;
	},

	getClearCssValue		=	function( $element, value ){
		return +$element.css(value).replace('px','');
	},

	slideHorizontally		=	function( $element, reverse, callback ) {
		console.log('TweenQuick::slideHorizontally');
		if($element.length>1){
			var len = $element.length;
			while(len--){
				slideHorizontally( $( $element[len] ), reverse, (len == 0 ? callback : '') );
			}
			return;
		}

		var timeline 	=	checkIfCached($element, 'slideHorizontally', reverse, callback);
		if(timeline!=null){
			// get the right display-parameter
			$element.show().removeClass('hidden');
			var display		=	$element.css('display');
			$element.hide();
			timeline.set($element, {'display':display})

			// for tablerows we need the inner content instead of the row
			var isTableRow		=	$element.is('tr');
			var $afterElements	=	$element;
			if(isTableRow){
				$element 		=	$element.find('td, th');
				$afterElements	=	$element.wrapInner('<div/>').children();
			}

			// get the right height and some other css-properties
			$element.show();
			var properties		=	getCssProperties($element, true, false)
			var height			=	$element.height();


			/*
			 *	Step 1:	paddingTop, marginTop and marginBottom
			 */

			var step1 			=	{from:{}, to:{}, distance:0, speed:0};
			step1.from.paddingTop	=	0;
			step1.to.paddingTop		=	properties.paddingTop;

			step1.from.marginTop	=	0;
			step1.to.marginTop		=	properties.marginTop;

			step1.from.marginBottom	=	0;
			step1.to.marginBottom	=	properties.marginBottom;

			step1.to.ease			=	Power1.EaseIn;
			step1.distance			=	properties.paddingTop+properties.marginTop+properties.marginBottom;
			step1.speed				=	0.05+step1.distance/200;

			/*
			 *	Step 2:	height and paddingBottom
			 */
			var step2 				=	{from:{}, to:{}, distance:0, speed:0};
			step2.from				=	{	paddingBottom:	0,
											height:			0};
			step2.to 				=	{	height:			height,
											paddingBottom:	properties.paddingBottom,
											ease:			Power1.EaseOut};

			step2.distance			=	height+properties.paddingBottom;
			step2.speed				=	0.2+step2.distance/750;


			if(isTableRow){
				$element.css(step1.from).css(step2.from).css({'vertical-align':'top'})
			}

			/*
			 *	fill the timeline with the tweens
			 */
			$afterElements.css('overflow','hidden');

			if(step1.distance>0){
				timeline.fromTo($afterElements, step1.speed, step1.from, step1.to);
			}
			timeline.fromTo($afterElements, step2.speed, step2.from, step2.to);
			timeline.set($afterElements,{height:'auto', overflow:''})

			if(reverse){
			    timeline.totalProgress(1);
    			checkIfCached($element, 'slideHorizontally', true, callback);
			}
		}
	},

	slideVertically		=	function( $element, reverse, callback ) {
		console.log('TweenQuick::slideVertically');
		if($element.length>1){
			var len = $element.length;
			while(len--){
				slideVertically( $( $element[len] ), reverse, (len == 0 ? callback : '') );
			}
			return;
		}

		var timeline 	=	checkIfCached($element, 'slideVertically', reverse, callback);
		if(timeline!=null){
			// get the right display-parameter
			$element.show().removeClass('hidden');
			var display		=	$element.css('display');
			$element.hide();
			timeline.set($element, {'display':display})

			// get the right height and some other css-properties
			$element.show();
			var properties		=	getCssProperties($element, false, false)
			var width			=	$element.width();


			/*
			 *	Step 1:	paddingLeft, marginLeft and marginRight
			 */

			var step1 			=	{from:{}, to:{}, distance:0, speed:0};
			step1.from.paddingLeft	=	0;
			step1.to.paddingLeft	=	properties.paddingLeft;

			step1.from.marginLeft	=	0;
			step1.to.marginLeft		=	properties.marginLeft;

			step1.from.marginRight	=	0;
			step1.to.marginRight	=	properties.marginRight;

			step1.to.ease			=	Power1.EaseIn;
			step1.distance			=	properties.paddingLeft+properties.marginLeft+properties.marginRight;
			step1.speed				=	0.05+step1.distance/200;

			/*
			 *	Step 2:	height and paddingBottom
			 */
			var step2 				=	{from:{}, to:{}, distance:0, speed:0};
			step2.from				=	{	paddingRight:	0,
											width:			0};
			step2.to 				=	{	width:			width,
											paddingRight:	properties.paddingRight,
											ease:			Power1.EaseOut};

			step2.distance			=	width+properties.paddingRight;
			step2.speed				=	0.2+step2.distance/750;

			/*
			 *	fill the timeline with the tweens
			 */
			$element.css('overflow','hidden');

			if(step1.distance>0){
				timeline.fromTo($element, step1.speed, step1.from, step1.to);
			}
			timeline.fromTo($element, step2.speed, step2.from, step2.to);
			timeline.set($element,{width:'', overflow:''})

			if(reverse){
			    timeline.totalProgress(1);
    			checkIfCached($element, 'slideVertically', true, callback);
			}
		}
	},

	replaceContent		=	function( $element, replacement, extraCss, callback ) {
		console.log('TweenQuick::replaceContent');
		if($element.length>1){
			var len = $element.length,
			    timeline;
			while(len--){
				timeline    =   replaceContent( $( $element[len] ), replacement.clone(), (len == 0 ? callback : '') );
			}
			return timeline;
		}

        timeline		=	new TimelineLite({
		    align:'sequence',
		    onComplete:callback,
		    onCompleteParams:[$element],
		    onReverseComplete:callback,
		    onReverseCompleteParams:[$element]
        });

        var currentHeight   =   $element.height(),
            currentWidth    =   $element.width(),
            currentHtml     =   $element.contents().detach(),
            currentLeft     =   $element.css('left'),
            newHeight       =   $element.css('left', 0).append(replacement).height(),
            newWidth        =   $element.width(),

            distance        =   newHeight-newWidth > 0 ? newHeight-newWidth : newWidth-newHeight,
            speed		    =	0.2+distance/750;

        $element.html( currentHtml ).css('left',currentLeft);

        var from            =   {height:currentHeight, width:currentWidth, overflow:'hidden', whiteSpace:'nowrap' };
        var to              =   {height:newHeight, width:newWidth };
        if( extraCss != null )   to     =   $.extend(extraCss, to);

        timeline.fromTo($element, speed, from, to );

        timeline.insert( TweenLite.fromTo(currentHtml, speed/2, {autoAlpha:1}, {autoAlpha:0}));
        timeline.insert( TweenLite.fromTo(replacement, speed/2, {autoAlpha:0}, {delay:speed/2, autoAlpha:1, onStart:function(){
            $element.html( replacement );
        }}));

        timeline.set(currentHtml, {autoAlpha:1});
        timeline.set($element, {overflow:'', height:'', width:'', whiteSpace:''});
        return timeline;
    };


    return {
        slideHorizontally: 	slideHorizontally,
        slideVertically: 	slideVertically,
        replaceContent:     replaceContent
    };
}());