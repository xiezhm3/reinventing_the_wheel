function Watcher(vm, expOrFn, cb) {
	this.cb = cb;
	this.vm = vm;
	this.expOrFn = expOrFn;
	this.depIds = {};
	
	if(typeof expOrFn === 'function') {
		this.getter = expOrFn;
	} else {
		this.getter = this.parseGetter(expOrFn);
	}

	this.value = this.get();
}

Watcher.prototype = {
	update: function() {
		this.run();
	},
	run: function() {
		var value = this.get();
	},
	addDep: function(dep) {

	},
	get: function() {
		Dep.target = this;
		var value = this.getter.call(this.vm, this.vm);
		Dep.target = null;
		return value;
	},
	parseGetter: function (exp) {

	}
};

module.exports = Watcher;