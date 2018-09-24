class Evt extends EventTarget{
	constructor() {
		super();
		this.listeners = {};

		this.addEventListener = function(type, callback) {
			if (!(type in this.listeners))
				this.listeners[type] = [];
			this.listeners[type].push(callback);
		}

		this.removeEventLister = function(type, callback) {
			if (!type in this.listeners) return;
			var stack = this.listener[type];
			for (var i = 0, l = stack.length; i < l; i++) {
				if (stack[i] === callback) {
					stack.splice(i, 1);
					return;
				}
			}
		}

		this.dispatchEvent = function(event) {
			if (!(event.type in this.listeners)) return true;
			var stack = this.listeners[event.type].slice();
			for (var i = 0, l = stack.length; i < l; i++)
				stack[i].call(this, event);
			return !event.defaultPrevented;
		}
	}
}