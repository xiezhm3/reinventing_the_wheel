var compileUtil = require('./compileUtil.js');

function Compile(el, vm) {
	this.$vm = vm;
	this.$el = this.isElementNode(el) ? el : document.querySelector(el);

	if (this.$el) {
		this.$fragment = this.node2Fragment(this.$el);
		this.init();
		this.$el.appendChild(this.$fragment);
	}
}

Compile.prototype = {
	init: function () {
		this.compileElement(this.$fragment);
	},
	// 将原生节点拷贝到fragment
	node2Fragment: function (el) {
		var fragment = document.createDocumentFragment(), child;
		while (child = el.firstChild) {
			fragment.appendChild(child);
		}
		return fragment;
	},
	compileElement: function (el) {
		var childNodes = el.childNodes;
		var self = this;

		[].slice.call(childNodes).forEach(function (node) {
			var text = node.textContent;
			var reg = /\{\{(.*)\}\}/;

			if(self.isElementNode(node)) {
				self.compile(node);
			} else if(self.isTextNode(node) && reg.test(text)) {
				self.compileText(node, RegExp.$1);
			}
			if(node.childNodes && node.childNodes.length) {
				self.compileElement(node);
			}
		});
	},
	compile: function (node) {
		var nodeAttrs = node.attributes;
		var self = this;

		[].slice.call(nodeAttrs).forEach(function (attr) {
			var attrName = attr.name;
			if(self.isDirective(attrName)) {
				var exp = attr.value;
				var dir = attrName.substring(2);
				// event directive
				if(self.isEventDirective(dir)) {
					compileUtil.eventHandler(node, self.$vm, exp, dir);
				} else {
					// normal directive
					compileUtil[dir] && compileUtil[dir](node ,self.$vm, exp);
				}
				node.removeAttribute(attrName);
			}
		});
	},
	compileText: function(node, exp) {
		compileUtil.text(node, this.$vm, exp);
	},
	isElementNode: function (node) {
		return node.type === 1;
	},
	isTextNode: function(el) {
		return node.type === 3;
	},
	isDirective: function (attr) {
		return attr.indexOf('v-') === 0;
	},
	isEventDirective: function (dir) {
		return dir.indexOf('on') === 0;
	}
};
