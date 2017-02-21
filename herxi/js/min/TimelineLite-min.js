/*!
 * VERSION: 1.15.0
 * DATE: 2014-12-03
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var r=function(t){e.call(this,t),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var i=this.vars,r,s;for(s in i)r=i[s],o(r)&&-1!==r.join("").indexOf("{self}")&&(i[s]=this._swapSelfInParams(r));o(i.tweens)&&this.add(i.tweens,0,i.align,i.stagger)},s=1e-10,n=i._internals,a=n.isSelector,o=n.isArray,h=n.lazyTweens,l=n.lazyRender,_=[],u=_gsScope._gsDefine.globals,m=function(t){var e={},i;for(i in t)e[i]=t[i];return e},d=function(t,e,i,r){var s=t._timeline,n=s._totalTime;!e&&this._forcingPlayhead||s._rawPrevTime===t._startTime||(s.pause(t._startTime),e&&e.apply(r||s,i||_),this._forcingPlayhead&&s.seek(n))},f=function(t){var e=[],i=t.length,r;for(r=0;r!==i;e.push(t[r++]));return e},c=r.prototype=new e;return r.version="1.15.0",c.constructor=r,c.kill()._gc=c._forcingPlayhead=!1,c.to=function(t,e,r,s){var n=r.repeat&&u.TweenMax||i;return e?this.add(new n(t,e,r),s):this.set(t,r,s)},c.from=function(t,e,r,s){return this.add((r.repeat&&u.TweenMax||i).from(t,e,r),s)},c.fromTo=function(t,e,r,s,n){var a=s.repeat&&u.TweenMax||i;return e?this.add(a.fromTo(t,e,r,s),n):this.set(t,s,n)},c.staggerTo=function(t,e,s,n,o,h,l,_){var u=new r({onComplete:h,onCompleteParams:l,onCompleteScope:_,smoothChildTiming:this.smoothChildTiming}),d;for("string"==typeof t&&(t=i.selector(t)||t),t=t||[],a(t)&&(t=f(t)),n=n||0,0>n&&(t=f(t),t.reverse(),n*=-1),d=0;d<t.length;d++)s.startAt&&(s.startAt=m(s.startAt)),u.to(t[d],e,m(s),d*n);return this.add(u,o)},c.staggerFrom=function(t,e,i,r,s,n,a,o){return i.immediateRender=0!=i.immediateRender,i.runBackwards=!0,this.staggerTo(t,e,i,r,s,n,a,o)},c.staggerFromTo=function(t,e,i,r,s,n,a,o,h){return r.startAt=i,r.immediateRender=0!=r.immediateRender&&0!=i.immediateRender,this.staggerTo(t,e,r,s,n,a,o,h)},c.call=function(t,e,r,s){return this.add(i.delayedCall(0,t,e,r),s)},c.set=function(t,e,r){return r=this._parseTimeOrLabel(r,0,!0),null==e.immediateRender&&(e.immediateRender=r===this._time&&!this._paused),this.add(new i(t,0,e),r)},r.exportRoot=function(t,e){t=t||{},null==t.smoothChildTiming&&(t.smoothChildTiming=!0);var s=new r(t),n=s._timeline,a,o;for(null==e&&(e=!0),n._remove(s,!0),s._startTime=0,s._rawPrevTime=s._time=s._totalTime=n._time,a=n._first;a;)o=a._next,e&&a instanceof i&&a.target===a.vars.onComplete||s.add(a,a._startTime-a._delay),a=o;return n.add(s,0),s},c.add=function(s,n,a,h){var l,_,u,m,d,f;if("number"!=typeof n&&(n=this._parseTimeOrLabel(n,0,!0,s)),!(s instanceof t)){if(s instanceof Array||s&&s.push&&o(s)){for(a=a||"normal",h=h||0,l=n,_=s.length,u=0;_>u;u++)o(m=s[u])&&(m=new r({tweens:m})),this.add(m,l),"string"!=typeof m&&"function"!=typeof m&&("sequence"===a?l=m._startTime+m.totalDuration()/m._timeScale:"start"===a&&(m._startTime-=m.delay())),l+=h;return this._uncache(!0)}if("string"==typeof s)return this.addLabel(s,n);if("function"!=typeof s)throw"Cannot add "+s+" into the timeline; it is not a tween, timeline, function, or string.";s=i.delayedCall(0,s)}if(e.prototype.add.call(this,s,n),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(d=this,f=d.rawTime()>s._startTime;d._timeline;)f&&d._timeline.smoothChildTiming?d.totalTime(d._totalTime,!0):d._gc&&d._enabled(!0,!1),d=d._timeline;return this},c.remove=function(e){if(e instanceof t)return this._remove(e,!1);if(e instanceof Array||e&&e.push&&o(e)){for(var i=e.length;--i>-1;)this.remove(e[i]);return this}return"string"==typeof e?this.removeLabel(e):this.kill(null,e)},c._remove=function(t,i){e.prototype._remove.call(this,t,i);var r=this._last;return r?this._time>r._startTime+r._totalDuration/r._timeScale&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},c.append=function(t,e){return this.add(t,this._parseTimeOrLabel(null,e,!0,t))},c.insert=c.insertMultiple=function(t,e,i,r){return this.add(t,e||0,i,r)},c.appendMultiple=function(t,e,i,r){return this.add(t,this._parseTimeOrLabel(null,e,!0,t),i,r)},c.addLabel=function(t,e){return this._labels[t]=this._parseTimeOrLabel(e),this},c.addPause=function(t,e,r,s){var n=i.delayedCall(0,d,["{self}",e,r,s],this);return n.data="isPause",this.add(n,t)},c.removeLabel=function(t){return delete this._labels[t],this},c.getLabelTime=function(t){return null!=this._labels[t]?this._labels[t]:-1},c._parseTimeOrLabel=function(e,i,r,s){var n;if(s instanceof t&&s.timeline===this)this.remove(s);else if(s&&(s instanceof Array||s.push&&o(s)))for(n=s.length;--n>-1;)s[n]instanceof t&&s[n].timeline===this&&this.remove(s[n]);if("string"==typeof i)return this._parseTimeOrLabel(i,r&&"number"==typeof e&&null==this._labels[i]?e-this.duration():0,r);if(i=i||0,"string"!=typeof e||!isNaN(e)&&null==this._labels[e])null==e&&(e=this.duration());else{if(n=e.indexOf("="),-1===n)return null==this._labels[e]?r?this._labels[e]=this.duration()+i:i:this._labels[e]+i;i=parseInt(e.charAt(n-1)+"1",10)*Number(e.substr(n+1)),e=n>1?this._parseTimeOrLabel(e.substr(0,n-1),0,r):this.duration()}return Number(e)+i},c.seek=function(t,e){return this.totalTime("number"==typeof t?t:this._parseTimeOrLabel(t),e!==!1)},c.stop=function(){return this.paused(!0)},c.gotoAndPlay=function(t,e){return this.play(t,e)},c.gotoAndStop=function(t,e){return this.pause(t,e)},c.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var r=this._dirty?this.totalDuration():this._totalDuration,n=this._time,a=this._startTime,o=this._timeScale,u=this._paused,m,d,f,c,p;if(t>=r?(this._totalTime=this._time=r,this._reversed||this._hasPausedChild()||(d=!0,c="onComplete",0===this._duration&&(0===t||this._rawPrevTime<0||this._rawPrevTime===s)&&this._rawPrevTime!==t&&this._first&&(p=!0,this._rawPrevTime>s&&(c="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:s,t=r+1e-4):1e-7>t?(this._totalTime=this._time=0,(0!==n||0===this._duration&&this._rawPrevTime!==s&&(this._rawPrevTime>0||0>t&&this._rawPrevTime>=0))&&(c="onReverseComplete",d=this._reversed),0>t?(this._active=!1,this._rawPrevTime>=0&&this._first&&(p=!0),this._rawPrevTime=t):(this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:s,t=0,this._initted||(p=!0))):this._totalTime=this._time=this._rawPrevTime=t,this._time!==n&&this._first||i||p){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==n&&t>0&&(this._active=!0),0===n&&this.vars.onStart&&0!==this._time&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||_)),this._time>=n)for(m=this._first;m&&(f=m._next,!this._paused||u);)(m._active||m._startTime<=this._time&&!m._paused&&!m._gc)&&(m._reversed?m.render((m._dirty?m.totalDuration():m._totalDuration)-(t-m._startTime)*m._timeScale,e,i):m.render((t-m._startTime)*m._timeScale,e,i)),m=f;else for(m=this._last;m&&(f=m._prev,!this._paused||u);)(m._active||m._startTime<=n&&!m._paused&&!m._gc)&&(m._reversed?m.render((m._dirty?m.totalDuration():m._totalDuration)-(t-m._startTime)*m._timeScale,e,i):m.render((t-m._startTime)*m._timeScale,e,i)),m=f;this._onUpdate&&(e||(h.length&&l(),this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||_))),c&&(this._gc||(a===this._startTime||o!==this._timeScale)&&(0===this._time||r>=this.totalDuration())&&(d&&(h&&h.length&&l(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[c]&&this.vars[c].apply(this.vars[c+"Scope"]||this,this.vars[c+"Params"]||_)))}},c._hasPausedChild=function(){for(var t=this._first;t;){if(t._paused||t instanceof r&&t._hasPausedChild())return!0;t=t._next}return!1},c.getChildren=function(t,e,r,s){s=s||-9999999999;for(var n=[],a=this._first,o=0;a;)a._startTime<s||(a instanceof i?e!==!1&&(n[o++]=a):(r!==!1&&(n[o++]=a),t!==!1&&(n=n.concat(a.getChildren(!0,e,r)),o=n.length))),a=a._next;return n},c.getTweensOf=function(t,e){var r=this._gc,s=[],n=0,a,o;for(r&&this._enabled(!0,!0),a=i.getTweensOf(t),o=a.length;--o>-1;)(a[o].timeline===this||e&&this._contains(a[o]))&&(s[n++]=a[o]);return r&&this._enabled(!1,!0),s},c.recent=function(){return this._recent},c._contains=function(t){for(var e=t.timeline;e;){if(e===this)return!0;e=e.timeline}return!1},c.shiftChildren=function(t,e,i){i=i||0;for(var r=this._first,s=this._labels,n;r;)r._startTime>=i&&(r._startTime+=t),r=r._next;if(e)for(n in s)s[n]>=i&&(s[n]+=t);return this._uncache(!0)},c._kill=function(t,e){if(!t&&!e)return this._enabled(!1,!1);for(var i=e?this.getTweensOf(e):this.getChildren(!0,!0,!1),r=i.length,s=!1;--r>-1;)i[r]._kill(t,e)&&(s=!0);return s},c.clear=function(t){var e=this.getChildren(!1,!0,!0),i=e.length;for(this._time=this._totalTime=0;--i>-1;)e[i]._enabled(!1,!1);return t!==!1&&(this._labels={}),this._uncache(!0)},c.invalidate=function(){for(var e=this._first;e;)e.invalidate(),e=e._next;return t.prototype.invalidate.call(this)},c._enabled=function(t,i){if(t===this._gc)for(var r=this._first;r;)r._enabled(t,!0),r=r._next;return e.prototype._enabled.call(this,t,i)},c.totalTime=function(e,i,r){this._forcingPlayhead=!0;var s=t.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,s},c.duration=function(t){return arguments.length?(0!==this.duration()&&0!==t&&this.timeScale(this._duration/t),this):(this._dirty&&this.totalDuration(),this._duration)},c.totalDuration=function(t){if(!arguments.length){if(this._dirty){for(var e=0,i=this._last,r=999999999999,s,n;i;)s=i._prev,i._dirty&&i.totalDuration(),i._startTime>r&&this._sortChildren&&!i._paused?this.add(i,i._startTime-i._delay):r=i._startTime,i._startTime<0&&!i._paused&&(e-=i._startTime,this._timeline.smoothChildTiming&&(this._startTime+=i._startTime/this._timeScale),this.shiftChildren(-i._startTime,!1,-9999999999),r=0),n=i._startTime+i._totalDuration/i._timeScale,n>e&&(e=n),i=s;this._duration=this._totalDuration=e,this._dirty=!1}return this._totalDuration}return 0!==this.totalDuration()&&0!==t&&this.timeScale(this._totalDuration/t),this},c.usesFrames=function(){for(var e=this._timeline;e._timeline;)e=e._timeline;return e===t._rootFramesTimeline},c.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},r},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t){"use strict";var e=function(){return(_gsScope.GreenSockGlobals||_gsScope)[t]};"function"==typeof define&&define.amd?define(["TweenLite"],e):"undefined"!=typeof module&&module.exports&&(require("./TweenLite.js"),module.exports=e())}("TimelineLite");