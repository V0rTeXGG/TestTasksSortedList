<template>
  <li :class="{active: list.isExpanded}" class="accordions-item">
    <div type="button" class="accordions-control">
      <div class="accordions-item-top">
        <div class="accordions-check-wrapper">
          <input
              type="checkbox"
              class="accordions-check"
              :id="'list-check-' + list.id"
              v-model="isChecked"
              @click.stop="ActiveItems(), toggleAccordion(index)">

          <label :for="'list-check-' + list.id" class="accordions-check-container">
            <span class="accordions-check-icon"></span>
          </label>
          <label class="accordions-title">{{list.name}}</label>
        </div>
      </div>
      <div :class="{active: list.isExpanded}" class="accordion-arrow"></div>
    </div>
    <div class="accordions-item-wrapper left">
      <div v-for="item in list.items" :key="item.id" class="accordion-content__item">
        <div class="accordion-content__item__left">
          <input type="checkbox" class="item-check" v-model="item.isCheckedItem" @change="cheakItemsNotAll">
          <span class="item-title">{{item.name}}</span>
        </div>
        <div class="accordion-content__item__left">
          <div class="item-counter__wrapper">
            <button @click="counterMinus(item)" class="item-counter__minus"></button>
            <span class="item-counter__quantity">{{ item.counter }}</span>
            <button @click="item.counter++" class="item-counter__plus"></button>
          </div>
          <input type="color" class="item-color" v-model="item.color">
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    list: Object,
  },
  name: 'list-item',
  data() {
    return {
      isGraphExpanded: false,
    }
  },
  methods: {
    counterMinus(item) {
      if(item.counter > 0) {
        item.counter--
        this.$emit('counter-updated', item.counter);
      }
    },
    ActiveItems() {
      this.list.isChecked = !this.list.isChecked;
      this.list.items.forEach((item) => {
         item.isCheckedItem = this.list.isChecked;
      });
      this.$emit('reset-is-checked', this.list.id);
    },
    toggleAccordion(index) {
      this.isExpanded = !this.isExpanded;
      this.$emit('toggle-graph', this.isExpanded);
    },
    cheakItemsNotAll() {
      const checkedItems = this.list.items.filter(item => item.isCheckedItem);
      if (checkedItems.length !== this.list.items.length && checkedItems.length !== 0) {
        this.list.isChecked = true;
      } else if(checkedItems.length === this.list.items.length){
        this.list.items.forEach((item) => {
          item.isCheckedItem = false;
        })
        this.list.isChecked = false;
        this.list.isExpanded = false;
      } else {
        this.list.isChecked = false;
        this.list.isExpanded = false;
      }
    },
  },
  computed: {
    isChecked() {
      return this.list.isChecked;
    },
  },
}
</script>

<style src="@/styles/list-item.scss" lang="scss" scoped>

</style>