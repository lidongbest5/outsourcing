(function($){
	var ID 			=	'eventTemplateView',
		$dom		=	$('#'+ID),
		$language	=	$dom.find('.language'),
		$map_con		=	$dom.find('.map-container'),
		$showmap		=	$dom.find('.detail a'),
		$speaker_con		=	$dom.find('.speaker ul'),
		$speaker		=	$dom.find('.speaker li'),
		$speaker_btn	=	$dom.find('.speak-btn'),
		$agenda_date	=	$dom.find('.agenda-date'),
		$agenda_con		=	$dom.find('.agenda-con'),
		$agenda_arrow 	=	$dom.find('.agenda-arrow'),
		$viewMore 		=	$dom.find('.agenda-showmore'),

		speaker_len		=	$speaker.length,
		count_len		=	3,
		agenda_index 	=	3,
		agenda_len 		=	$agenda_date.length,
		width 			=	parseInt($dom.find('.agenda-top').width());
		agenda_width	=	$dom.find('.agenda-main').eq(0).width();

	init 	=	function(){
		$agenda_date.css({"width":width*0.31,"margin-left":width*0.01,"margin-right":width*0.01})

		initEventHandlers();
	},

	onLanguageToggle 	=	function(){
		var $this 		=	$(this),
			$language_con	=	$language.find('ul'),
			display 	=	$this.css('display');

		TweenQuick.slideHorizontally( $language_con );
	},

	onMapShow			=	function(){
		if( window.location.host.indexOf('.com') == -1 ){
			    var address = $('.search-data').text();
			    var mapObj = new AMap.Map("map");
			    var marker = new Array();
				var windowsArr = new Array();
			    var MSearch;

			    mapObj.plugin(["AMap.ToolBar"],function(){     
			        toolBar = new AMap.ToolBar();
			        mapObj.addControl(toolBar);    
			    });

			    mapObj.plugin(["AMap.PlaceSearch"], function() {       
			        MSearch = new AMap.PlaceSearch({
			            pageSize:10,
			            pageIndex:1,
			            city:"" 
			        });
			        AMap.event.addListener(MSearch, "complete", keywordSearch_CallBack);
			        MSearch.search(address); 
			    });

			    function addmarker(i, d) {
			        var lngX = d.location.getLng();
			        var latY = d.location.getLat();
			        var markerOption = {
			            map:mapObj,
			            icon:"http://webapi.amap.com/images/" + (i + 1) + ".png",
			            position:new AMap.LngLat(lngX, latY)
			        };
			        var mar = new AMap.Marker(markerOption);         
			        marker.push(new AMap.LngLat(lngX, latY));
			     
			        var infoWindow = new AMap.InfoWindow({
			            content:"<h3><font color=\"#00a6ac\">  " + (i + 1) + ". " + d.name + "</font></h3>" + TipContents(d.type, d.address, d.tel),
			            size:new AMap.Size(300, 0),
			            autoMove:true, 
			            offset:new AMap.Pixel(0,-30)
			        });
			        windowsArr.push(infoWindow);
			        var aa = function (e) {infoWindow.open(mapObj, mar.getPosition());};
			        AMap.event.addListener(mar, "click", aa);
			    }
			    function keywordSearch_CallBack(data) {
			        var resultStr = "";
			        var poiArr = data.poiList.pois;
			        var resultCount = poiArr.length;
			        addmarker(0, poiArr[0]);
			        mapObj.setFitView();
			    }
			    function TipContents(type, address, tel) {
			        if (type == "" || type == "undefined" || type == null || type == " undefined" || typeof type == "undefined") {
			            type = "暂无";
			        }
			        if (address == "" || address == "undefined" || address == null || address == " undefined" || typeof address == "undefined") {
			            address = "暂无";
			        }
			        if (tel == "" || tel == "undefined" || tel == null || tel == " undefined" || typeof address == "tel") {
			            tel = "暂无";
			        }
			        var str = "  地址：" + address + "<br />  电话：" + tel + " <br />  类型：" + type;
			        return str;
			    }
		}
		else{
			var geocoder = new google.maps.Geocoder();
			var address = $('#map').text();

			var mapOptions = {
			    center: new google.maps.LatLng(-34.397, 150.644),
			    zoom: 15,
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(document.getElementById("map"), mapOptions);

			geocoder.geocode( { 'address': address}, function(results, status) {
			  map.setCenter(results[0].geometry.location);
			  var marker = new google.maps.Marker({
			      map: map,
			      position: results[0].geometry.location
			  });
			});
		}
		if( parseInt($map_con.css('top')) == '110' ){
			TweenLite.fromTo($map_con, 0.5, {top:'110px', autoAlpha:1}, {top:'-200px', autoAlpha:0});
		}
		else{
			$map_con.show();
			TweenLite.fromTo($map_con, 0.5, {top:'-200px', autoAlpha:0}, {top:'110px', autoAlpha:1});
		}
	},

	onSpeakerSlide		=	function(){
		var $this		=	$(this),
			type 		=	$this.attr('data-type');
		if( type == 'left' ){
			if( count_len <= 3 ){
				count_len = speaker_len;
			}
			else{
				count_len--;
			}
		}	
		else{
			if( count_len >= speaker_len ){
				count_len = 3;
			}
			else{
				count_len++;
			}
		}
		TweenLite.to($speaker_con, 0.5, {left:(count_len - 3)*-$dom.find('.speaker li').width()});
	},

	onAgendaDate		=	function(){
		var	$this		=	$(this),
			index 		=	parseInt($this.attr('data-index'));

		$this.addClass('selected').siblings().removeClass('selected');
		TweenLite.to($agenda_con, 0.5, {left:-index*parseInt(agenda_width)});
	},

	onViewMore 			=	function(){
		var $this 		=	$(this),
			$cutoff 	=	$this.parent().find('.agenda-cutoff'),
			$more 	=	$this.parent().find('.agenda-more');

		if( $this.hasClass('isShow') ){
		    TweenQuick.slideHorizontally( $more, true );
		    TweenQuick.slideHorizontally( $cutoff, false );
		    $this.removeClass('isShow').text('View More');
		}
		else{
		    TweenQuick.slideHorizontally( $more, false );
		    TweenQuick.slideHorizontally( $cutoff, true );
		    $this.addClass('isShow').text('View Less');
		}
	},

	onAgendaSlide 		=	function(){
		var $this 		=	$(this),
			type 		=	$this.attr('data-type');

		if( type == "left" ){
			if( agenda_index <= 3 ){
				agenda_index = 3;
			}
			else{
				agenda_index--;
			}	
		}
		else{
			if( agenda_index >= agenda_len ){
				agenda_index = agenda_len;
			}
			else{
				agenda_index++;
			}
		}
		TweenLite.to($dom.find('.agenda-top-container'), 0.5, {left:-(agenda_index-3)*width*0.33});
	},

	initEventHandlers 	=	function(){
		$language.on('mouseenter',onLanguageToggle);
		$language.on('mouseleave',onLanguageToggle);
		$showmap.on('click',onMapShow);
		$speaker_btn.on('click',onSpeakerSlide);
		$agenda_date.on('click',onAgendaDate);
		$viewMore.on('click',onViewMore);
		$agenda_arrow.on('click',onAgendaSlide);
	};

	$(init);
})(jQuery)