<html>
	<head></head>
	<body>
        <script src="/static/lifan/js/jquery.js"></script>
		<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
		<script>
			var my_title = 'WeMedia携手BMW共邀自媒体看车展';
            var my_desc = '上海车展炫酷来袭，WeMedia携手BMW邀您玩转现场！精美视频、高清大图轮番上阵，直击车展。';
            var my_imgUrl = 'http://7vil5t.com2.z0.glb.clouddn.com/o_19j17g51pd9n19cq1ish11ottdv15.jpg';
            $(function(){
            $.ajax({
                type : "GET",
                url : "http://ex.wyyun.com/getWechatJSSDK/",
                success : function(result){
                    // if(result.code == 0){
                        result = JSON.parse(result);
                        callback(result);
                    // }
                }
            });

            function callback(config){
                wx.config(config);
                wx.ready(function(){
                    wx.onMenuShareAppMessage({
                        title: my_title,
                        desc: my_desc,
                        link: "http://apps.h6app.com/circle/preview?appid=39",
                        imgUrl: my_imgUrl,
                        trigger: function (res) {

                        },
                        success: function (res) {

                        },
                        cancel: function (res) {

                        },
                        fail: function (res) {
                            alert(JSON.stringify(res));
                        }
                    });
                    wx.onMenuShareTimeline({
                        title: my_title,
                        desc: my_desc,
                        link: "http://apps.h6app.com/circle/preview?appid=39",
                        imgUrl: my_imgUrl,
                        trigger: function (res) {

                        },
                        success: function (res) {

                        },
                        cancel: function (res) {

                        },
                        fail: function (res) {
                            alert(JSON.stringify(res));
                        }
                    });
                    wx.onMenuShareQQ({
                        title: my_title,
                        desc: my_desc,
                        link: "http://apps.h6app.com/circle/preview?appid=39",
                        imgUrl: my_imgUrl,
                        trigger: function (res) {

                        },
                        complete: function (res) {

                        },
                        success: function (res) {

                        },
                        cancel: function (res) {

                        },
                        fail: function (res) {
                            alert(JSON.stringify(res));
                        }
                    });
                    wx.onMenuShareWeibo({
                        title: my_title,
                        desc: my_desc,
                        link: "http://apps.h6app.com/circle/preview?appid=39",
                        imgUrl: my_imgUrl,
                        trigger: function (res) {

                        },
                        complete: function (res) {

                        },
                        success: function (res) {

                        },
                        cancel: function (res) {

                        },
                        fail: function (res) {
                            alert(JSON.stringify(res));
                        }
                    });
                });
            }
        });
		</script>
	</body>
</html>