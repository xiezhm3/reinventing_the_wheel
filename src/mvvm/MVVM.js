/*
* 1. 实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者；
*
* 2. 实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数；
*   {
*       compile主要做的事情是解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，
*       添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图.
*   }
* 3. 实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图；
*
* 4. MVVM入口函数，整合以上三者。
* */

function MVVM(options) {
	this.$options = options || {};
	var data = this._data = this.$options.data;
	var self = this;

	Object.keys(data).forEach(function (key) {
		self._proxy(key);
	});

	this._initComputed();

	observe(data, this);

	this.$compile = new Compile(options.el || document.body, this);
}

MVVM.prototype = {
	$watch: function (key, cb, options) {
		new Watcher(this, key, cb);
	},
	_proxy: function (key, setter, getter) {
		var self = this;
		Object.defineProperty(self, key, {
			configurable: false,
			enumerable: true,
			set: function (newVal) {
				self._data[key] = newVal;
			},
			get: function () {
				return self._data[key]
			}
		})
	},
	_initComputed: function () {
		var self = this;
		var computed = this.$options.computed;
		if (typeof computed === 'object') {
			Object.keys(computed).forEach(function (key) {
				Object.defineProperty(self, key, {
					get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
					set: function () {
					}
				});
			});
		}
	}
};

module.exports = MVVM;