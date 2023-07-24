<template>
  <section class="list">
    <div class="wrapper list-wrapper">
      <div class="list-left list-block">
        <ul class="list-accordions">
          <list-item
              v-for="(item, index) in list"
              :key="item.id"
              :list="item"
              :is-expanded="index === activeIndex"
              :draggable="true"
              @toggle-graph="toggleGraph(index)"
              @dragstart="onDragStart(index)"
              @dragover="onDragOver(index)"
              @drop="onDrop(index)"
              @reset-is-checked="resetIsChecked">
          </list-item>
        </ul>
      </div>


      <div class="list-right list-block">
        <ul class="list-accordions">
          <list-item-graph
              v-for="(item, index) in list"
              :key="item.id"
              :list="item"
              :is-expanded="item.isExpanded"
              :active-index="activeIndex"
              :toggle-graph="toggleGraph">
          </list-item-graph>
        </ul>
      </div>

    </div>
  </section>
</template>

<script>
import ListItem from "@/components/list-item.vue";
import ListItemGraph from "@/components/list-item-graph.vue";

export default {
  name: 'home',
  components: {ListItemGraph, ListItem},
  data() {
    return {
      activeIndex: null,
      dragIndex: null,
      isChecked: false,
      list: [
        {id: 1, name: 'List 1', isChecked: false, items: [
            {name: 'Item 1', counter: 5, color: '#ff0000',},
            {name: 'Item 2', counter: 32, color: '#00ff0b',},
            {name: 'Item 3', counter: 22, color: '#0642ef',},
            {name: 'Item 4', counter: 14, color: '#ab1e8b',},
          ]},
        {id: 2, name: 'List 2', isChecked: false, items: [
            {name: 'Item 1', counter: 10, color: '#21a7ab',},
            {name: 'Item 2', counter: 4, color: '#a852c2',},
            {name: 'Item 3', counter: 12, color: '#b46363',},
            {name: 'Item 4', counter: 6, color: '#bd2571',},
            {name: 'Item 5', counter: 20, color: '#ab3434',},
            {name: 'Item 6', counter: 2, color: '#9164a2',},
          ]},
        {id: 3, name: 'List 3', isChecked: false, items: [
            {name: 'Item 1', counter: 3, color: '#c04f4f',},
            {name: 'Item 2', counter: 3, color: '#9d3a3a',},
            {name: 'Item 3', counter: 6, color: '#b61f1f',},
            {name: 'Item 4', counter: 2, color: '#3794a1',},
            {name: 'Item 5', counter: 12, color: '#ad5656',},
            {name: 'Item 6', counter: 8, color: '#d76c6c',},
          ]},
        {id: 4, name: 'List 4', isChecked: false, items: [
            {name: 'Item 1', counter: 5, color: '#662cab',},
            {name: 'Item 2', counter: 8, color: '#401d7c',},
            {name: 'Item 3', counter: 1, color: '#3f2e75',},
            {name: 'Item 4', counter: 4, color: '#7adfec',},
            {name: 'Item 5', counter: 22, color: '#cb4242',},
          ]},
        {id: 5, name: 'List 5', isChecked: false, items: [
            {name: 'Item 1', counter: 5, color: '#662cab',},
            {name: 'Item 2', counter: 8, color: '#401d7c',},
            {name: 'Item 3', counter: 1, color: '#3f2e75',},
            {name: 'Item 4', counter: 4, color: '#7adfec',},
            {name: 'Item 5', counter: 22, color: '#cb4242',},
            {name: 'Item 6', counter: 33, color: '#cb4242',},
            {name: 'Item 7', counter: 12, color: '#4f0505',},
            {name: 'Item 8', counter: 33, color: '#bf2cd3',},
            {name: 'Item 9', counter: 5, color: '#ec18c8',},
            {name: 'Item 10', counter: 6, color: '#205f77',},
          ]},
      ],
    }
  },
  methods: {
    toggleAccordion(index) {
      if (this.activeIndex === index) {
        this.activeIndex = null;
      } else {
        this.activeIndex = index;
      }
    },
    toggleGraph(index) {
      this.list.forEach((item, i) => {
        item.isExpanded = i === index && !item.isExpanded;
      });
    },
    onDragStart(index) {
      this.dragIndex = index;
    },
    onDragOver(index) {
      event.preventDefault();
      if (index !== this.dragIndex) {
        this.list.splice(index, 0, this.list.splice(this.dragIndex, 1)[0]);
        this.dragIndex = index;
      }
    },
    onDrop(index) {
      event.preventDefault();
    },
    resetIsChecked(currentItemId) {
      this.list.forEach((item) => {
        if (item.id !== currentItemId) {
          item.isChecked = false;
          item.items.forEach((item) => {
            item.isCheckedItem = false
          })
        }
      });
    },
  },
}
</script>

<style src="@/styles/home.scss" lang="scss" scoped>

</style>