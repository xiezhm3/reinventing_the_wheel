<template>
  <div class="container">
    <div :style="indent" @click="!this.showChildren">{{ label }}</div>
    <div v-if="showChildren">
      <menu
        v-for="(node, index) in nodes"
        :key="index"
        :nodes="node.nodes"
        :label="node.label"
        :depth="depth+1"
      />
    </div>
  </div>
</template>

<script>
const mockData = {
  label: "root",
  nodes: [
    {
      label: "item-1",
      nodes: [
        {
          label: "item-1-1"
        },
        {
          label: "item-1-2"
        },
        {
          label: "item-1-3",
          nodes: [
            {
              label: "item-1-3-1",
              nodes: [
                {
                  label: "item-1-3-1-1",
                  nodes: [
                    {
                      label: "item-1-3-1-1-1"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      label: "item-2",
      nodes: [
        {
          label: "item-2-1"
        },
        {
          label: "item-2-2"
        },
        {
          label: "item-2-3"
        },
        {
          label: "item-2-3"
        },
        {
          label: "item-2-4"
        }
      ]
    }
  ]
};
export default {
  name: "treeMenu",
  props: {
    nodes: {
      type: Object,
      default: () => {
        return mockData;
      }
    },
    label: {
      type: String,
      default: "root"
    },
    depth: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showChildren: false
    };
  },
  computed: {
    indent() {
      return {
        transform: `translate(${this.depth * 50}px)`
      };
    }
  }
};
</script>

