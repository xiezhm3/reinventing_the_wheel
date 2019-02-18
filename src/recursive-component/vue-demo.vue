<scirpt type="text/x-template" id="item-template">
  <li>
    <div
      :class="{bold: isFolder}"
      @click="toggle"
      @dblclick="changeType">
      {{ model.name }}
      <span v-if="isFolder">[{{ open ? '-' : '+' }}]</span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <item
        class="item"
        v-for="(model, index) in model.children"
        :key="index"
        :model="model">
      </item>
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>
  <!-- the demo root element -->
<ul id="demo">
  <item
    class="item"
    :model="treeData">
  </item>
</ul>
</scirpt>

<script>
var data = {
  name: "My Tree",
  children: [
    { name: "hello" },
    { name: "wat" },
    {
      name: "child folder",
      children: [
        {
          name: "child folder",
          children: [{ name: "hello" }, { name: "wat" }]
        },
        { name: "hello" },
        { name: "wat" },
        {
          name: "child folder",
          children: [{ name: "hello" }, { name: "wat" }]
        }
      ]
    }
  ]
};

vue.component("item", {
  template: "#item-template",
  props: {
    model: Object
  },
  data() {
    return {
      open: false
    };
  },
  computed: {
    isFolder() {
      return this.model.children && this.model.children.length;
    }
  },
  methods: {
    toogle() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },
    changeType() {
      if (!this.isFolder) {
        Vue.set(this.model, "children", []);
        this.addChild();
        this.open = true;
      }
    },
    addChild() {
      this.model.children.push({
        name: "new stuff"
      });
    }
  }
});

var demo = new Vue({
  el: "#demo",
  data: {
    treeData: data
  }
});
</script>
