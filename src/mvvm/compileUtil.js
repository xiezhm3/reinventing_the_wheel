'use strict';

var Watcher = require('./Watcher.js');

var compileUtil = {
	text: function (node, vm, exp) {
		this.bind(node, vm, exp, 'text');
	},
	html: function (node, vm, exp) {
		this.bind(node, vm, exp, 'html');
	},
	model: function (node, vm, exp) {
		this.bind(node, vm, exp, 'model');

		var self = this,
			val = this._getVMVal(vm, exp);
		node.addEventListener('input', function (e) {
			var newValue = e.target.value;
			if (newValue === val) {
				return;
			}
			self._setVMVal(vm, exp, newValue);
			val = newValue;
		});
	},
	class: function (node, vm, exp) {
		this.bind(node, vm, exp, 'class');
	},
	bind: function (node, vm, exp, dir) {
		var updateFn = updater[dir + 'Updater'];

		updateFn && updateFn(node, this._getVMVal(vm, exp));

		new Watcher(vm, exp, function (value, oldValue) {
			updateFn && updateFn(node, value, oldValue);
		})
	},
	eventHandler: function (node, vm, exp, dir) {
		var eventType = dir.split(':')[1],
			fn = vm.$options.methods && vm.$options.methods[exp];

		if (eventType && fn) {
			node.addEventListener(eventType, fn.bind(vm), false);
		}
	},
	_getVMVal: function (vm, exp) {
		var val = vm;
		exp = exp.split('.');
		exp.forEach(function (key) {
			val = exp[key];
		});
		return val;
	},
	_setVMVal: function (vm, exp, value) {
		var val = vm;
		exp = exp.split('.');
		exp.forEach(function (k, i) {
			// 非最后一个key,更新val的值
			if (i < exp.length - 1) {
				val = val[k];
			} else {
				val[k] = value;
			}
		})
	}
};

var updater = {
	textUpdater: function (node, value) {
		node.textContent = typeof value == 'undefined' ? '' : value;
	},
	htmlUpdater: function (node, value) {
		node.innerHTML = typeof value == 'undefined' ? '' : value;
	},
	classUpdater: function (node, value, oldValue) {
		var className = node.className;
		className = className.replace(oldValue, '').replace(/\s$/, '');

		var space = className && String(value) ? ' ' : '';

		node.className = className + space + value;
	},
	modelUpdater: function (node, value, oldValue) {
		node.value = typeof  value == 'undefined' ? '' : value;
	}
};

module.exports = compileUtil;