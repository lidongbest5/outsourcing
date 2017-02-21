/*
Flash Name: Dynamic Focus
Description: ���о۽�FlashͼƬ�ֲ�
*/
document.write('<div id="flash_cycle_image"></div>');
$importjs = (function()
{
    var uid = 0;
    var curr = 0;
    var remove = function(id)
    {
        var head = document.getElementsByTagName('head')[0];
        head.removeChild( document.getElementById('jsInclude_'+id) );
    };

    return function(file,callback)
    {
        var callback;
        var id = ++uid;
        var head = document.getElementsByTagName('head')[0];
        var js = document.createElement('script');
        js.setAttribute('type','text/javascript');
        js.setAttribute('src',file);
        js.setAttribute('id','jsInclude_'+id);
        if( document.all )
        {
            js.onreadystatechange = function()
            {
                if(/(complete|loaded)/.test(this.readyState))
                {
                    try
                    {
                        callback(id);remove(id);
                    }
                    catch(e)
                    {
                        setTimeout(function(){remove(id);include_js(file,callback)},2000);
                    }
                }
            };
        }
        else
        {
            js.onload = function(){callback(id); remove(id); };
        }
        head.appendChild(js);
        return uid;
    };
}
)();

function show_flash()
{
    var button_pos=4; //��Ťλ�� 1�� 2�� 3�� 4��
    var stop_time=3000; //ͼƬͣ��ʱ��(1000Ϊ1����)
    var show_text=1; //�Ƿ���ʾ���ֱ�ǩ 1��ʾ 0����ʾ
    var txtcolor="000000"; //����ɫ
    var bgcolor="DDDDDD"; //����ɫ

    var text_height = 18;
    var focus_width = swf_width;
    var focus_height = swf_height - text_height;
    var total_height = focus_height + text_height;

    document.getElementById('flash_cycle_image').innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cabversion=6,0,0,0" width="'+ focus_width +'" height="'+ total_height +'">'+'<param name="movie" value="data/flashdata/dynfocus/dynfocus.swf">'+'<param name="quality" value="high"><param name="wmode" value="opaque">'+'<param name="FlashVars" value="pics='+pics+'&links='+links+'&texts='+texts+'&pic_width='+focus_width+'&pic_height='+total_height+'&show_text='+show_text+'&txtcolor='+txtcolor+'&bgcolor='+bgcolor+'&button_pos='+button_pos+'&stop_time='+stop_time+'">'+'<embed src="data/flashdata/dynfocus/dynfocus.swf" FlashVars="pics='+pics+'&links='+links+'&texts='+texts+'&pic_width='+focus_width+'&pic_height='+total_height+'&show_text='+show_text+'&txtcolor='+txtcolor+'&bgcolor='+bgcolor+'&button_pos='+button_pos+'&stop_time='+stop_time+'" quality="high" width="'+ focus_width +'" height="'+ total_height +'" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="transparent"/>'+'</object>';
}

$importjs('data/flashdata/dynfocus/data.js', show_flash);