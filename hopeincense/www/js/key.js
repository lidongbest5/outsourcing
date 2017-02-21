// JavaScript Document
function key(){ 
if(event.shiftKey){
window.close();}
//½ûÖ¹Shift
if(event.altKey){
window.close();}
//½ûÖ¹Alt
if(event.ctrlKey){
window.close();}
//½ûÖ¹Ctrl
return false;}
document.onkeydown=key;
if (window.Event)
document.captureEvents(Event.MOUSEUP);
function nocontextmenu(){
event.cancelBubble = true
event.returnValue = false;
return false;}
function norightclick(e){
if (window.Event){
if (e.which == 2 || e.which == 3)
return false;}
else
if (event.button == 2 || event.button == 3){
event.cancelBubble = true
event.returnValue = false;
return false;}
}
//½ûÓÒ¼ü
document.oncontextmenu = nocontextmenu;  // for IE5+
document.onmousedown = norightclick;  // for all others
