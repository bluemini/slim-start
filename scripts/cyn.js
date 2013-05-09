cyn = function() {
	var scope = {};
	scope.win = window;
	scope.doc = window.document;
	scope.pre = scope.doc.addEventListener ? '' : 'on';
	scope.add = scope.doc.addEventListener ? 'addEventListener' : 'attachEvent';
	scope.__eventlist = {};
         
	return function(t) {
		cynscope = scope;
		if (typeof t === 'string') {
			cynscope.elem = cyn().__get__(t);
		} else if (typeof t === 'object') {
			cynscope.elem = t;
		}
		return {
			core: cynscope.elem || null,

			// DOM manipulators
			before: function(elem) {
				insertBefore(elem, this.core);
			},
			after: function(elem) {
				// add a child after this element
				if (this.core.lastChild) {
					this.core.appendChild(elem);
				} else {
					insertBefore(elem, this.core.nextSibling);
				}
				return this;
			},

			// style shortcuts
			color: function(color) {
				this.__dostyle__("color", color);
			},
			__dostyle__: function(attr, value) {
				if (this.core && (this.core.style[attr]) !== undefined) {
					this.core.style[attr] = value;
				}
			},

			/* 	some handlers */
			/*	BIND
				====
				When we have a wrapped element, the bind method will set an event handler
				against a particular eventName for this entity. The this scope, for the
				bound event handler, will be set to the element to which it is bound, by
				default...for now
			 */
			bind: function(eventName, fn) {
				if (this.core){
					if (!(eventName in cynscope.__eventlist)) {
						cynscope.__eventlist[eventName] = [];
					}
					cynscope.__eventlist[eventName].push({'this': this.core, 'fn': fn});
					this.core[cynscope.add](cynscope.pre + eventName, fn, false);
				}
			},
			// loader is a shorthand for binding an event to the window onload event
			loader: function(fn) {
				cyn(scope.win).bind('onload', fn);
			},
			// click is a shorthand way to bind to the click event
			click: function(handler) {
				this.bind('click', handler);
				return this;
			},
			__fire__: function(elem, eventName) {
				//  && eventName in window.lister[elem]
				if (cynscope.__eventlist && eventName in cynscope.__eventlist) {
					for (f in cynscope.__eventlist[eventName]) {
						if (typeof cynscope.__eventlist[eventName][f].fn === 'function') {
							cynscope.__eventlist[eventName][f].fn.call(cynscope.__eventlist[eventName][f].this);
						}
					}
				}
			},
			
			// DOM finder
			__get__: function(elem_name) {
				return document.getElementById(elem_name);
			},

			// some feature detection
			localStorage: function() {
				try {
					return 'localStorage' in window && window['localStorage'] !== null;
				} catch (e) {
					return false;
				}
			}
		}
	}
}();

/*!
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 *
 */

// @win window reference
// @fn function reference
s = function(win, fn) {

	var done = false,
		top = true,

		doc = win.document, 
		root = doc.documentElement,

		add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
		rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
		pre = doc.addEventListener ? '' : 'on',

		init = function(e) {
			if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
			(e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
			if (!done && (done = true)) fn.call(win, e.type || e);
		},

		poll = function() {
			try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
			init('poll');
		};

	if (doc.readyState == 'complete') fn.call(win, 'lazy');
	else {
		if (doc.createEventObject && root.doScroll) {
			try { top = !win.frameElement; } catch(e) { }
			if (top) poll();
		}
		doc[add](pre + 'DOMContentLoaded', init, false);
		doc[add](pre + 'readystatechange', init, false);
		win[add](pre + 'load', init, false);
	}

}(window, function() {
	cyn().__fire__(window, 'onload')
})