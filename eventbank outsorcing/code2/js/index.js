(function($){
	var ID 			=	'eventTemplateView',
		$dom		=	$('#'+ID),
		$language	=	$dom.find('.language'),
		$speaker	=	$dom.find('.speaker li'),
		$speaker_desc	=	$dom.find('.img-desc'),
		$map_con		=	$dom.find('.map-container'),
		$showmap		=	$dom.find('.data-r-r a'),
		$nav 			=	$dom.find('.nav li'),
		$viewMore 		=	$dom.find('.agenda-showmore'),
		$agendaTop 		=	$dom.find('.agenda-top-con'),
		$agendaMain 	=	$dom.find('.agenda-main ul'),
		$avatarDot 		=	$dom.find('.avatar-dot'),

		agenda_len 		=	$agendaTop.find('li').length,
		agenda_index 	=	3,

	init 	=	function(){
		initEventHandlers();
	},

	onLanguageToggle 	=	function(){
		var $this 		=	$(this),
			$language_con	=	$language.find('ul'),
			display 	=	$this.css('display');

		TweenQuick.slideHorizontally( $language_con );
	},

	onSpeakerClick		=	function(){
		var $this		=	$(this);

		$this.find('div').addClass('selected');
		$this.siblings().find('div').removeClass('selected');

		$speaker_desc.find('p:eq(0)').html($this.attr('data-title'));
		$speaker_desc.find('p:eq(1)').html($this.attr('data-desc'));

		TweenQuick.slideHorizontally($speaker_desc, false);
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
		if( parseInt($map_con.css('top')) == '290' ){
			TweenLite.fromTo($map_con, 0.5, {top:'290px', autoAlpha:1}, {top:'-200px', autoAlpha:0});
		}
		else{
			$map_con.show();
			TweenLite.fromTo($map_con, 0.5, {top:'-200px', autoAlpha:0}, {top:'290px', autoAlpha:1});
		}
	},

	onNavClick 			=	function(){
		$(this).parents('.nav').find('a').removeClass('selected');
		$(this).find('a').addClass('selected');
	},

	onViewMore 			=	function(){
		var $this 		=	$(this),
			$cutoff 	=	$this.parent().find('.agenda-cutoff'),
			$more 	=	$this.parent().find('.agenda-detail');

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
		TweenLite.to($agendaTop.find('ul'), 0.5, {left:-(agenda_index-3)*260});
	},

	onAgendaClick 		=	function(){
		var $this 		=	$(this),
			index 		=	parseInt($this.attr('data-index'));

		$this.addClass('selected').siblings().removeClass('selected');
		TweenLite.to($agendaMain, 0.5, {left:-index*780});
	},

	onAvatarSlide 		=	function(){
		var $this 		=	$(this),
			index 		=	$this.attr('data-index');

		$this.addClass('selected').siblings().removeClass('selected');
		TweenLite.to($this.parents('.agenda-avatar').find('ul'), 0.5, {left:-index*95});
	},

	initEventHandlers 	=	function(){
		$language.on('mouseenter',onLanguageToggle);
		$language.on('mouseleave',onLanguageToggle);
		$speaker.on('click',onSpeakerClick);
		$showmap.on('click',onMapShow);
		$nav.on('click',onNavClick);
		$viewMore.on('click',onViewMore);
		$agendaTop.find('a').on("click",onAgendaSlide);
		$agendaTop.find('li').on('click',onAgendaClick);
		$avatarDot.find('a').on('click',onAvatarSlide);
	};

	$(init);
})(jQuery)