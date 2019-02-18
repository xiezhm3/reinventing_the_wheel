function Observer(data) {
	this.data = data;
	this.walk(data);
}

Observer.prototype = {
	walk: function (data) {
		var self = this;
		Object.keys(data).forEach(function (key) {
			self.convert(key, data[key]);
		})
	},
	convert: function (key, val) {
		this.defineReactive(this.data, key, val);
	},
	defineReactive: function (data, key, val) {

		var dep = new Dep();
		var childObj = observe(val);

		Object.defineProperty(data, key, {
			enumerable: true,
			configurable: false,
			get: function () {
				if (Dep.target) {// TODO
					Dep.depend();
				}
				return val;
			},
			set: function (newVal) {
				if (val === newVal) {
					return;
				}
				val = newVal;
				childObj = observe(val);
				// 通知订阅者
				dep.notify();
			}
		});
	}
};

function observe(value, vm) {
	if(!value || typeof value !== 'object') {
		return;
	}
	return new Observer(value);
}

var uid = 0;

function Dep() {
	this.id = uid++;
	this.subs = [];
}

Dep.prototype = {
	addSub: function (sub) {
		this.subs.push(sub);
	},
	depend: function () {
		Dep.target.addDep(this);
	},
	removeSub: function (sub) {
		var index = this.subs.indexOf(sub);
		if (index !== -1) {
			this.subs.slice(index, 1);
		}
	},
	notify: function () {
		this.subs.forEach(function (sub) {
			sub.update();
		})
	}
};

Dep.target = null;

module.exports = Observer;