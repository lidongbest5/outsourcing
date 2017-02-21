function fnReload()
{
	location.reload();
}

function fnReloadTo(url)
{
	location.href=url;
}

function in_array(a, v) {
	var i;
	for (i = 0; i < a.length; i++) {
		if (v === a[i]) {
			return i;
		}
	}
	return -1;
}

//获取url参数
function GetRequest(str) {
	if ( str != '' && str != undefined ) {
		if (str.indexOf("?") != -1) {
			var url = str.split('?');
			var theRequest = new Object();
			
			var str = url[1];
			var strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
	} else {
		var url = location.search; //获取url中"?"符后的字串
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			var strs = str.split("&");
			for(var i = 0; i < strs.length; i ++) {
				theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
			}
		}
	}
	
	return theRequest;
}

/**
 * 获得文件后缀名
 */
function GetFileExt(file)
{
    return file.replace(/.+\./,"");
}
/**
 * 检测普通上传文件是否是所允许的扩展名
 * PermitExt = "jpg;jpeg;jpe;gif"
 */
function CheckImageFile(ImgFilename){
	ImgFilename = ImgFilename.toLowerCase();
	PermitExt ='jpg;jpeg;jpe;gif';
	FileExtName = GetFileExt(ImgFilename);
	if(PermitExt.indexOf(FileExtName)==-1){
		return false;
	}
	return true;
}

function OnlyJpg(ImgFilename){
	ImgFilename = ImgFilename.toLowerCase();
	//PermitExt ='jpg;jpeg;jpe';
	PermitExt ='jpg;jpeg';
	FileExtName = GetFileExt(ImgFilename);
	if(PermitExt.indexOf(FileExtName)==-1){
		return false;
	}
	return true;
}

/**
 * 通过flash设定剪贴板,flash8以下版本可以，目前在firefox下不可用
 */
function copy(text, msg) {
	if ($.browser.msie) {
		window.clipboardData.setData("Text", text);
	} else {
		if (!document.getElementById('flashcopier')) {
			$('<div id="flashcopier"></div>').appendTo('body');
		}
		//$('#flashcopier').css("display", "none");
		$('#flashcopier').html('<embed src="/images/clipboard.swf" FlashVars="clipboard='+text+'" width="0" height="0" style="position:absolute; top:-2000px;" type="application/x-shockwave-flash"></embed>');
	}
	if (msg) {
		alert(msg);
	}
}

/**
 * 通用复制到剪贴板js脚本
 */
function copyToClipboard(txt,msg) {
	if(window.clipboardData) {
		window.clipboardData.clearData();
		window.clipboardData.setData("Text", txt);
	}else if(navigator.userAgent.indexOf("Opera") != -1) {
		window.location = txt;
	} else if (window.netscape) {
		try {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		} catch (e) {
			//alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
			denymsg = '被浏览器拒绝！<br/>请在浏览器地址栏输入about:config并回车<br/>然后将signed.applets.codebase_principal_support设置为true';
			//self.parent.tb_show("注意：","/album/ajax_show.php?type=ShowMessage&width=350&height=180&url=" + encodeURI(txt) + "&message=" + encodeURI(denymsg) ,"");
			var content = '<center>';
			content += '	<br/><h3 style="font-size: 12px; color: blue;">';
			content += '		<br/>' + denymsg; 
			content += '	</h3>';
			content += '	<br /><button onclick="$.modal.close();">知道了</button>';
			content += '</center>';
			popNotice("tip_message",1,content,330,180);
		}
		var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
		if (!clip) return;
		var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
		if (!trans) return;
		trans.addDataFlavor('text/unicode');
		var str = new Object();
		var len = new Object();
		var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
		var copytext = txt;
		str.data = copytext;
		trans.setTransferData("text/unicode",str,copytext.length*2);
		var clipid = Components.interfaces.nsIClipboard;
		if (!clip) return false;
		clip.setData(trans,null,clipid.kGlobalClipboard);
	}
    if (msg) {
		//alert(msg);
		//self.parent.tb_show("注意：","/album/ajax_show.php?type=ShowMessage&width=350&height=140&url=" + encodeURI(txt) + "&message=" + encodeURI(msg) ,"");
		var content = '<center>';
		content += '	<br/><h3 style="font-size: 12px; color: blue;">';
		content += '		<br/>' + msg; 
		content += '	</h3>';
		content += '	<br /><button onclick="$.modal.close();">知道了</button>';
		content += '</center>';
		popNotice("tip_message",1,content,300,110);
	}
}

//------------------通用检测函数----------------------
//检查是否电子邮件
function isEmail(str){
	res = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	var re = new RegExp(res);
	return !(str.match(re) == null);
}

//判断是否是数字
function CheckNumber(val){
	//判断字符串是否为数字
	//判断正整数 /^[1-9]+[0-9]*]*$/
	var re = /^[0-9]*$/;
	return re.test(val);
}

//判断是否是折扣，9.9 小数点前后各一位
function CheckIsDiscount(val){
	var re = /^[0-9]?.?[0-9]([0-9])?$/;
	return re.test(val);
}

//判断是否是浮点数
function CheckIsFloat(val){
	var re = /^[0-9]*.?[0-9]([0-9])?$/;
	return re.test(val);
}

//判断是否全是同一个字母
function CheckOneChar(str){
	for(var i=0;i<str.length;i++){
		if(str.charAt(0)!=str.charAt(i)){
			return false;
		}
	}
	return true;
}

//只能输入数字字母和小数点
function CheckChar(str){
	res = /^[a-zA-Z0-9.]+$/;
	var re = new RegExp(res);
	return !(str.match(re) == null);
}

//只能输入数字和-
function CheckTele(str){
	res = /^[\-0-9.]+$/;
	var re = new RegExp(res);
	return !(str.match(re) == null);
}

function checkmobile(str)
{
  var mobilereg = /^(((13[0-9]{1})+\d{8}))|(((15[0-9]{1})+\d{8}))$/;
  return mobilereg.test(str);
}

function checktel(str){
	var telreg = /^(((0[0-9]{2})+(\-)+\d{8}))|(((0[0-9]{3})+(\-)+\d{8}))|(((0[0-9]{3})+(\-)+\d{7}))$/;
	return telreg.test(str);
}

function ValidateEmail(j)
{
    var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailReg.test(j);
}

//设置焦点用
function setFocus(id){
	if ($.browser.msie) {
		$('#' + id).focus();
	} else { //firefox下使用
		window.setTimeout(function(){document.getElementById(id).focus();}, 0);
	}
}

//******************************限制输入框***********************************
//限制只能输入数字
function OnlyCanInputNum(e){
	var k = window.event ? e.keyCode:e.which;
	if (((k >= 48) && (k <= 57)) || k==8 || k==0){
	}else{
		if(window.event){
			window.event.returnValue = false;
		} else { //for firefox
			e.preventDefault();
		}
	}
}

function checkFloat(str){
	var floatReg = /^[1-9]d*.d*|0.d*[1-9]d*$/;
    return floatReg.test(str);
}

//限制只能输入数字和小数点
function OnlyCanInputFloat(e){
	var k = window.event ? e.keyCode:e.which;
	if (((k >= 48) && (k <= 57)) || k==46 || k==8 || k==0){
	}else{
		if(window.event){
			window.event.returnValue = false;
		} else { //for firefox
			e.preventDefault();
		}
	}
}

function CheckInputIntFloat(oInput)
{
    if('' != oInput.value.replace(/\d{1,}\.{0,1}\d{0,}/,''))
    {
        oInput.value = oInput.value.match(/\d{1,}\.{0,1}\d{0,}/) == null ? '' :oInput.value.match(/\d{1,}\.{0,1}\d{0,}/);
    }
}


//只能输入浮点数
function CheckFloat(id){
	var value = $('#' + id ).val();
	if('' == value.replace(/\d{1,}\.{0,1}\d{0,}/, '')) {
		value = value.match(/\d{1,}\.{0,1}\d{0,}/) == null ? '' : value.match(/\d{1,}\.{0,1}\d{0,}/);
	}
	$('#' + id).attr('value', value);
}

//动态生成的input在KeyPress时触发事件
function CheckKeyPress(id, type, event){
	var ev;
	if ($.browser.msie) {
		ev = window.event;
	}else{
		ev = event;
	}
	if(type==1){
		OnlyCanInputNum(ev);
	} else {
		OnlyCanInputFloat(ev);
	}
	OnlyCanInputNum(ev);
}

//动态生成的input在KeyUp时触发事件
function CheckKeyUp(id, type, event){
	var ev;
	if ($.browser.msie) {
		ev = window.event;
	}else{
		ev = event;
	}
	if(type==1){
		OnlyCanInputNum(ev);
		isSpecialChar(id);
	} else {
		//CheckFloat(id);
		OnlyCanInputFloat(ev);
		isSpecialChar(id);
	}
	OnlyCanInputNum(ev);
	isSpecialChar(id);
}

//去除中文全角半角字符
function isSpecialChar(id){
	var iptData=document.getElementById(id);
	if(iptData.value.match(/[^\x00-\xff]/ig)){
		iptData.value=iptData.value.replace(/[^\x00-\xff]/ig,'');
	}
}

//去除全角字符
function toTrimDBC(Str) {
	var DBCStr = "" ;
	for (var i= 0 ; i<Str.length; i++){
		var c = Str.charCodeAt(i);
		if (c ==  12288  ||c ==  32 ) {
			continue ;
		}
		if  (c >  65280  && c <  65375 ) {
			DBCStr += String.fromCharCode(c - 65248 );
			continue ;
		}
		DBCStr += String.fromCharCode(c);
	}
	return  DBCStr;
}
//*****************************************************************

//图片按比例缩放
function DrawImage(ImgD){
	var image=new Image();
	image.src=ImgD.src;
	if(image.width>0 && image.height>0){
		flag=true;
		if(image.width/image.height>= iwidth/iheight){
			if(image.width>iwidth){
				ImgD.width=iwidth;
				ImgD.height=(image.height*iwidth)/image.width;
			}else{
				ImgD.width=image.width;
				ImgD.height=image.height;
			}
			ImgD.alt=image.width+"×"+image.height;
		}else{
			if(image.height>iheight){
				ImgD.height=iheight;
				ImgD.width=(image.width*iheight)/image.height;
			}else{
				ImgD.width=image.width;
				ImgD.height=image.height;
			}
			ImgD.alt=image.width+"×"+image.height;
		}
	}
}

//整除
function Div(exp1, exp2){
    var n1 = Math.round(exp1); //四舍五入
    var n2 = Math.round(exp2); //四舍五入
    var rslt = n1/n2; //除
    if (rslt >= 0){
        rslt = Math.floor(rslt); //返回小于等于原rslt的最大整数。
    }else{
        rslt = Math.ceil(rslt); //返回大于等于原rslt的最小整数。
    }
    return rslt;
}

//计算字符串长度
function strlen(str) {
	return str.replace(/[^\x00-\xff]/g,"rr").length;
}

//js截取字符串，中英文都能用
//如果给定的字符串大于指定长度，截取指定长度返回，否者返回源字符串。
function cutstr(str,len, format){
	var str_length = 0;
	var str_len = 0;
	str_cut = new String();
	str_len = str.length;
	for(var i = 0;i<str_len;i++){
		a = str.charAt(i);
		str_length++;
		if(escape(a).length > 4){
			// 中文字符的长度经编码之后大于4
			str_length++;
		}
		str_cut = str_cut.concat(a);
		if(str_length>=len) {
			str_cut = str_cut.concat(format);
			return str_cut;
		}
	}
	// 如果给定字符串小于指定长度，则返回源字符串；
	if(str_length<len){
		return  str;
	}
}

//截取字符串 包含中文处理
//(串,长度,增加...)
function subString(str, len, hasDot)
{
    var newLength = 0;
    var newStr = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = "";
    var strLength = str.replace(chineseRegex,"**").length;
    for(var i = 0;i < strLength;i++)
    {
        singleChar = str.charAt(i).toString();
        if(singleChar.match(chineseRegex) != null)
        {
            newLength += 2;
        }
        else
        {
            newLength++;
        }
        if(newLength > len)
        {
            break;
        }
        newStr += singleChar;
    }

    if(hasDot && strLength > len)
    {
        newStr += "...";
    }
    return newStr;
}

//获取字符串长度
function getStrLength(str) {
	var cArr = str.match(/[^\x00-\xff]/ig);
	return str.length + (cArr == null ? 0 : cArr.length);
}

//取得当前的时间戳
function timestamp() {
	var timestamp = Date.parse(new Date());
	return timestamp;
}

//替换全部符合条件的字符串
function replaceAll(src, oldStr, newStr){
	return src.replace(new RegExp(oldStr, 'g'),newStr);
}

//过滤特殊字符
function stripscript(s)
{
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）—|{}【】‘；：”“'。，、？]")
	var rs = "";
	for (var i = 0; i < s.length; i++) {
		rs = rs+s.substr(i, 1).replace(pattern, '');
	}
	return rs;
}

//--------------------------------------------------------------------------------

/*
 * 跳出提示层,通过simplemodal
 */
function popNotice(){
	var args = new Array();
	for (var i=0;i<arguments.length;i++) {
		args[i] = arguments[i];
	}
	if(args[2]!=''){ //替换内容
		$("#tip_content").attr('innerHTML', args[2]);
	}
	if(args[3]==undefined || args[3]=="" || args[3]<=0) { //宽度
		args[3] = '350';
	}
	if(args[4]==undefined || args[3]=="" || args[4]<=0) { //高度
		args[4] = '150';
	}
	if(args[5]!=''){ //关闭按钮文字
		$('#btnClose').attr('value', args[5]);
	}
	if(args[6]!='' && args[6]!=undefined){ //更改click行为
		$('#btnClose').hide();
		var redirect = '<button class="btn1" id="btnRedirect" onclick="window.location.href=\'' + args[6] + '\';">成功</button>';
		$("#btnClose").before(redirect);
	}
	if(args[1]==1){ // 判断js是否加载完毕
		//是否显示右侧滚动条
		if( args[7] == 1 && args[7] != undefined) {
			$('#' + args[0]).css('overflow-y', 'scroll');
		} else {
			$('#' + args[0]).css('overflow', 'hidden');
		}
		$("#" + args[0]).css({ width: (args[3] - 20) + 'px', height: (args[4] - 10) + 'px'}).modal({
			minWidth: args[3],
			minHeight: args[4],
			onClose: function(dialog){
				try {
					$('#btnClose').click();
				} catch(e){
				} finally {
					$.modal.close();
				}
			}
		});

		$('#simplemodal-container').css({ width: (args[3]) + 'px', height: (args[4]) + 'px'});

		//矫正层不居中的问题
		var divLeft =  parseInt( document.documentElement.clientWidth/2 - $("#" + args[0]).width()/2 );
		var divTop =  parseInt( document.documentElement.clientHeight/2 - $("#" + args[0]).height()/2 );
		$("#simplemodal-container").css({ left: divLeft + 'px', top: divTop + 'px' });
	}
}

/*
 * 跳出提示层,通过jqueryui
 */
function popWin() {
	var width = 480;
	var height = 500;
	var obj = '';
	var args = new Array();
	for (var i=0;i<arguments.length;i++) {
		args[i] = arguments[i];
	}

	if(args[0]==undefined || args[0]=="" ) { //目标id
		obj = '#edit-container';
	} else {
		var obj = args[0];
	}

	if(args[1]==undefined || args[1]=="" || args[1]<=0) { //宽度
		if( $.browser.msie ) width = 480;
	} else {
		var aWidth = args[1].split(',');
		if( $.browser.msie ) {
			width = aWidth[0];
		} else {
			width = aWidth[1];
		}
	}
	if(args[2]==undefined || args[2]=="" || args[2]<=0) { //高度
		if( $.browser.msie ) height = 410;
	} else {
		var aHeight = args[2].split(',');
		if( $.browser.msie ) {
			height = aHeight[0];
		} else {
			height = aHeight[1];
		}
	}

	$(obj).dialog({
		width: width,
		height: height,
		modal: true,
		title: '',
		closeOnEscape: false
	});
	$('.ui-dialog-titlebar').hide();
}

/**
 * 水平和垂直居中显示，随层滚动居中
 */
function setCenter(){
	var args = new Array();
	for (var i=0;i<arguments.length;i++) {
		args[i] = arguments[i];
	}
	var divLeft =  document.documentElement.clientWidth/2 - $("#" + args[0]).width()/2;
	var divTop =  document.documentElement.clientHeight/2 - $("#" + args[0]).height()/2;
	$("#" + args[0]).css({"left":divLeft,"top":divTop});
}

/*
 * 弹出层，通过thickbox
 * args[0]		层标题,title
 * args[1]		层ajax内容,url
 * args[2]		宽度width
 * args[3]		高度height
 * args[4]		是否传递参数parameters
 */
function popBox(){
	var args = new Array();
	for (var i=0;i<arguments.length;i++) {
		args[i] = arguments[i];
	}
	var url = args[1];
	url += "?modal=true&dragable=true&width=" + args[2] + "&height=" + args[3];
	if( args[4] != '') url += args[4];
	tb_show(args[0], url,"");
}

/**
 *改变当前弹出层宽度和高度
 */
function fnChangeWindowSize(w,h){
	WindowWidth = parseInt( $("#TB_ajaxContent").css("width").replace('px', '') );
	WindowHeight = parseInt( $("#TB_ajaxContent").css("height").replace('px', '') );
	//alert(w + ' ' + h + ' ' + WindowWidth + ' ' + WindowHeight);
	if(w!='' && w > WindowWidth){
		$("#TB_ajaxContent").css({width: w + "px"});
		$("#TB_window").css({width: (w + 30) + "px"});
	}
	if(h!='' && h > WindowHeight) {
		$("#TB_ajaxContent").css({height: h + "px"});
	}
	tb_position();
}

/**
 * 停止默认行为
 * @param e
 */
function prevent(e){
	e.preventDefault();
}

/**
 * 去除数组中重复元素
 *unique the array
 *@param {Array} array array to unique
 *@return {Array} uniqued array ,note change parameter
 */
function undulpicate(array){
	for(var i=0;i<array.length;i++) {
		for(var j=i+1;j<array.length;j++) {
			//注意 ===
			if(array[i]===array[j]) {
				array.splice(j,1);
				j--;
			}
		}
	}
	return array;
}

/**
 * 动态加载js
 *
 * @param scriptUrls string
 */
function importScript(scriptUrls){ //动态加载js
	for( var i =0,l=scriptUrls.length; i < l; i++){
		var s = document.createElement('script');
		s.src = scriptUrls[i];
		document.getElementsByTagName('head')[0].appendChild(s);
	}
}
//importScript(['/resources/js/lib/jquery.js','/resources/js/lib/ext-core-debug.js']);

//===============浮点数相关===============
//浮点数加法运算
function FloatAdd(arg1,arg2){
var r1,r2,m;
try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
m=Math.pow(10,Math.max(r1,r2))
return (arg1*m+arg2*m)/m
}

//浮点数减法运算
function FloatSub(arg1,arg2){
var r1,r2,m,n;
try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
m=Math.pow(10,Math.max(r1,r2));
//动态控制精度长度
n=(r1>=r2)?r1:r2;
return ((arg1*m-arg2*m)/m).toFixed(n);
}

//浮点数乘法运算
function FloatMul(arg1,arg2)
{
var m=0,s1=arg1.toString(),s2=arg2.toString();
try{m+=s1.split(".")[1].length}catch(e){}
try{m+=s2.split(".")[1].length}catch(e){}
return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}


//浮点数除法运算
function FloatDiv(arg1,arg2){
var t1=0,t2=0,r1,r2;
try{t1=arg1.toString().split(".")[1].length}catch(e){}
try{t2=arg2.toString().split(".")[1].length}catch(e){}
with(Math){
r1=Number(arg1.toString().replace(".",""))
r2=Number(arg2.toString().replace(".",""))
return (r1/r2)*pow(10,t2-t1);
}
}

//数字进位，逢1进1
function MyCeil(fVal, position) {
	var newfVal = fVal.toFixed(2);
	var aVal = newfVal.split('.');
	
	if ( position > 0 ) {
		var aSecond = aVal[1].split('');
		for( var i in aSecond ) {
			if ( (parseInt(i) + 1) > position ) {
				aSecond[i] = '';
				continue;
			}

			if ( (parseInt(i) + 1) == position ) {
				if ( position == 1 ) {
					
					if ( (parseInt(aSecond[i]) + 1) == 0 ) {
						aSecond[i] = 0;
						aVal[0] = parseInt(aVal[0]) + 1;
					} else if (  (parseInt(aSecond[i]) + 1) == 10 ) {
						aSecond[i] = 0;
						aVal[0] = parseInt(aVal[0]) + 1;
					} else {
						aSecond[i] = parseInt(aSecond[i]) + 1;
					}
				}
			}
		}
		//alert(aSecond[0] + ' ' + aSecond[1]);
		fVal = aVal[0] + '.' + aSecond.join('');
	} else {
		
		if ( aVal[1] != '00' ) {
			fVal = parseInt(aVal[0]) + 1;
		} else {
			fVal = aVal[0];
		}
	}
	return fVal;
}

/* 2007-11-28 XuJian */ 
//截取字符串 包含中文处理 
//(串,长度,增加...) 
function subString(str, len, hasDot) 
{ 
		var newLength = 0;
		var newStr = "";
		var chineseRegex = /[^\x00-\xff]/g;
		var singleChar = "";
		var strLength = str.replace(chineseRegex,"**").length;
		for(var i = 0;i < strLength;i++)
		{
				singleChar = str.charAt(i).toString();
				if(singleChar.match(chineseRegex) != null)
				{
						newLength += 2;
				}
				else
				{
						newLength++;
				}
				if(newLength > len)
				{
						break;
				}
				newStr += singleChar;
		}
		
		if(hasDot && strLength > len)
		{
				newStr += "...";
		}
		return newStr;
}

