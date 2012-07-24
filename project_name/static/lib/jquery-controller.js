(function(i){var f={undHash:/_|-/,colons:/::/,words:/([A-Z]+)([A-Z][a-z])/g,lowUp:/([a-z\d])([A-Z])/g,dash:/([a-z\d])([A-Z])/g,replacer:/\{([^\}]+)\}/g,dot:/\./},k=function(a,b,c){return a[b]!==undefined?a[b]:c&&(a[b]={})},l=function(a){return(a=typeof a)&&(a=="function"||a=="object")},m=function(a,b,c){a=a?a.split(f.dot):[];var g=a.length;b=i.isArray(b)?b:[b||window];var d,e,h,n=0;if(g==0)return b[0];for(;d=b[n++];){for(h=0;h<g-1&&l(d);h++)d=k(d,a[h],c);if(l(d)){e=k(d,a[h],c);if(e!==undefined){c===
false&&delete d[a[h]];return e}}}},j=i.String=i.extend(i.String||{},{getObject:m,capitalize:function(a){return a.charAt(0).toUpperCase()+a.substr(1)},camelize:function(a){a=j.classize(a);return a.charAt(0).toLowerCase()+a.substr(1)},classize:function(a,b){a=a.split(f.undHash);for(var c=0;c<a.length;c++)a[c]=j.capitalize(a[c]);return a.join(b||"")},niceName:function(a){return j.classize(a," ")},underscore:function(a){return a.replace(f.colons,"/").replace(f.words,"$1_$2").replace(f.lowUp,"$1_$2").replace(f.dash,
"_").toLowerCase()},sub:function(a,b,c){var g=[];g.push(a.replace(f.replacer,function(d,e){d=m(e,b,typeof c=="boolean"?!c:c);e=typeof d;if((e==="object"||e==="function")&&e!==null){g.push(d);return""}else return""+d}));return g.length<=1?g[0]:g},_regs:f})})(jQuery);
(function(i){var j=false,o=i.makeArray,p=i.isFunction,l=i.isArray,m=i.extend,s=i.String.getObject,q=function(a,c){return a.concat(o(c))},t=/xyz/.test(function(){})?/\b_super\b/:/.*/,r=function(a,c,d){d=d||a;for(var b in a)d[b]=p(a[b])&&p(c[b])&&t.test(a[b])?function(g,h){return function(){var f=this._super,e;this._super=c[g];e=h.apply(this,arguments);this._super=f;return e}}(b,a[b]):a[b]};clss=i.Class=function(){arguments.length&&clss.extend.apply(clss,arguments)};m(clss,{proxy:function(a){var c=
o(arguments),d;a=c.shift();l(a)||(a=[a]);d=this;return function(){for(var b=q(c,arguments),g,h=a.length,f=0,e;f<h;f++)if(e=a[f]){if((g=typeof e=="string")&&d._set_called)d.called=e;b=(g?d[e]:e).apply(d,b||[]);if(f<h-1)b=!l(b)||b._use_call?[b]:b}return b}},newInstance:function(){var a=this.rawInstance(),c;if(a.setup)c=a.setup.apply(a,arguments);if(a.init)a.init.apply(a,l(c)?c:arguments);return a},setup:function(a){this.defaults=m(true,{},a.defaults,this.defaults);return arguments},rawInstance:function(){j=
true;var a=new this;j=false;return a},extend:function(a,c,d){function b(){if(!j)return this.constructor!==b&&arguments.length?arguments.callee.extend.apply(arguments.callee,arguments):this.Class.newInstance.apply(this.Class,arguments)}if(typeof a!="string"){d=c;c=a;a=null}if(!d){d=c;c=null}d=d||{};var g=this,h=this.prototype,f,e,k,n;j=true;n=new this;j=false;r(d,h,n);for(f in this)if(this.hasOwnProperty(f))b[f]=this[f];r(c,this,b);if(a){k=a.split(/\./);e=k.pop();k=h=s(k.join("."),window,true);h[e]=
b}m(b,{prototype:n,namespace:k,shortName:e,constructor:b,fullName:a});b.prototype.Class=b.prototype.constructor=b;g=b.setup.apply(b,q([g],arguments));if(b.init)b.init.apply(b,g||[]);return b}});clss.callback=clss.prototype.callback=clss.prototype.proxy=clss.proxy})(jQuery);

(function(a){var e=jQuery.cleanData;a.cleanData=function(b){for(var c=0,d;(d=b[c])!==undefined;c++)a(d).triggerHandler("destroyed");e(b)}})(jQuery);
(function(e){var v=function(a,b,c){var d,f=a.bind&&a.unbind?a:e(j(a)?[a]:a);if(b.indexOf(">")===0){b=b.substr(1);d=function(i){i.target===a&&c.apply(this,arguments)}}f.bind(b,d||c);return function(){f.unbind(b,d||c);a=b=c=d=null}},p=e.makeArray,w=e.isArray,j=e.isFunction,k=e.extend,q=e.String,r=e.each,x=Array.prototype.slice,y=function(a,b,c,d){var f=a.delegate&&a.undelegate?a:e(j(a)?[a]:a);f.delegate(b,c,d);return function(){f.undelegate(b,c,d);f=a=c=d=b=null}},s=function(a,b,c,d){return d?y(a,d,
b,c):v(a,b,c)},l=function(a,b){var c=typeof b=="string"?a[b]:b;return function(){a.called=b;return c.apply(a,[this.nodeName?e(this):this].concat(x.call(arguments,0)))}},z=/\./g,A=/_?controllers?/ig,t=function(a){return q.underscore(a.replace("jQuery.","").replace(z,"_").replace(A,""))},B=/[^\w]/,u=/\{([^\}]+)\}/g,C=/^(?:(.*?)\s)?([\w\.\:>]+)$/,m,n=function(a,b){return e.data(a,"controllers",b)};e.Class("jQuery.Controller",{setup:function(){this._super.apply(this,arguments);if(!(!this.shortName||this.fullName==
"jQuery.Controller")){this._fullName=t(this.fullName);this._shortName=t(this.shortName);var a=this,b=this.pluginName||this._fullName,c;e.fn[b]||(e.fn[b]=function(d){var f=p(arguments),i=typeof d=="string"&&j(a.prototype[d]),D=f[0];return this.each(function(){var g=n(this);if(g=g&&g[b])i?g[D].apply(g,f.slice(1)):g.update.apply(g,f);else a.newInstance.apply(a,[this].concat(f))})});this.actions={};for(c in this.prototype)if(!(c=="constructor"||!j(this.prototype[c])))if(this._isAction(c))this.actions[c]=
this._action(c)}},hookup:function(a){return new this(a)},_isAction:function(a){return B.test(a)?true:e.inArray(a,this.listensTo)>-1||e.event.special[a]||o[a]},_action:function(a,b){u.lastIndex=0;if(!b&&u.test(a))return null;a=b?q.sub(a,[b,window]):a;b=w(a);var c=(b?a[1]:a).match(C);return{processor:o[c[2]]||m,parts:c,delegate:b?a[0]:undefined}},processors:{},listensTo:[],defaults:{}},{setup:function(a,b){var c=this.constructor;a=a.jquery?a[0]:a;var d=c.pluginName||c._fullName;this.element=e(a).addClass(d);
(n(a)||n(a,{}))[d]=this;this.options=k(k(true,{},c.defaults),b);this.called="init";this.bind();return this.element},bind:function(a,b,c){if(a===undefined){this._bindings=[];a=this.constructor;b=this._bindings;c=a.actions;var d=this.element;for(funcName in c)if(c.hasOwnProperty(funcName)){ready=c[funcName]||a._action(funcName,this.options);b.push(ready.processor(ready.delegate||d,ready.parts[2],ready.parts[1],funcName,this))}var f=l(this,"destroy");d.bind("destroyed",f);b.push(function(i){e(i).unbind("destroyed",
f)});return b.length}if(typeof a=="string"){c=b;b=a;a=this.element}return this._binder(a,b,c)},_binder:function(a,b,c,d){if(typeof c=="string")c=l(this,c);this._bindings.push(s(a,b,c,d));return this._bindings.length},_unbind:function(){var a=this.element[0];r(this._bindings,function(b,c){c(a)});this._bindings=[]},delegate:function(a,b,c,d){if(typeof a=="string"){d=c;c=b;b=a;a=this.element}return this._binder(a,c,d,b)},update:function(a){k(this.options,a);this._unbind();this.bind()},destroy:function(){if(this._destroyed)throw this.constructor.shortName+
" controller already deleted";var a=this.constructor.pluginName||this.constructor._fullName;this._destroyed=true;this.element.removeClass(a);this._unbind();delete this._actions;delete this.element.data("controllers")[a];e(this).triggerHandler("destroyed");this.element=null},find:function(a){return this.element.find(a)},_set_called:true});var o=e.Controller.processors;m=function(a,b,c,d,f){return s(a,b,l(f,d),c)};r("change click contextmenu dblclick keydown keyup keypress mousedown mousemove mouseout mouseover mouseup reset resize scroll select submit focusin focusout mouseenter mouseleave".split(" "),
function(a,b){o[b]=m});var h,E=function(a,b){for(h=0;h<b.length;h++)if(typeof b[h]=="string"?a.constructor._shortName==b[h]:a instanceof b[h])return true;return false};e.fn.extend({controllers:function(){var a=p(arguments),b=[],c,d,f;this.each(function(){c=e.data(this,"controllers");for(f in c)if(c.hasOwnProperty(f)){d=c[f];if(!a.length||E(d,a))b.push(d)}});return b},controller:function(){return this.controllers.apply(this,arguments)[0]}})})(jQuery);


// =================== 
// ! RootController   
// =================== 

//provides some convenience methods to subclasses

$.Controller.extend('RootController', {
	init: function() {
		this.$d = $(document);
		this.$w = $(window);
	},

	trigger: function() {
/*
		arguments[0] += '.' + this.Class.fullName;
		return this.element.trigger.apply(this.element, arguments);
*/

		this.bubble.apply(this, arguments);
		this.broadcast.apply(this, arguments);
	},
	
	bubble: function() {
		arguments[0] += '.' + this.Class.fullName;
		return this.element.trigger.apply(this.element, arguments);	
	},
	
	broadcast: function(){
		arguments[0] += '_' + this.Class.fullName;
		return $.event.trigger.apply($.event, arguments);	
	}
});