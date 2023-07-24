<template>
  <li class="accordions-item" :class="{ active: isExpandedState }">
    <div type="button" class="accordions-control">
      <span class="list-item__title">{{ list.name }}</span>
      <button :class="{active: isExpandedState}" class="list-item__filter" @click.stop="shuffleItems">
        <template v-if="!isShuffle">Перемешать</template>
        <template v-else>Сортировать</template>
      </button>
    </div>
    <div class="accordions-item-wrapper">
      <div class="accordions-content__block">
        <template v-if="!isShuffle">
          <div
              v-for="item in list.items"
              :key="item.id"
              class="accordions-content__item">
            <button
                type="button"
                v-for="count in item.counter"
                :key="count"
                @click="deleteSquare(item)"
                class="accordions-content__square"
                :style="{ backgroundColor: item.color }"></button>
          </div>
        </template>
        <template v-else>
          <div class="accordions-content__item">
            <button type="button"
                    v-for="item in shuffleSquares"
                    :key="item.id"
                    @click.stop="deleteSquare(item)"
                    class="accordions-content__square"
                    :style="{ backgroundColor: item.color }"
            ></button>
          </div>
        </template>
      </div>
    </div>
  </li>
</template>

<script>

export default {
  props: {
    list: Object,
    isExpanded: Boolean,
  },
  name: 'list-item-graph',
  data() {
    return {
      isShuffle: false,
      isExpandedState: this.isExpanded,
    }
  },
  methods: {
    toggleGraph() {
      return this.toggleGraph();
    },
    deleteSquare(item) {
      const index = this.shuffleSquares.indexOf(item);
      if (index !== -1) {
        this.shuffleSquares.splice(index, 1);
      }
      if (item.counter > 0) {
        item.counter--;
      }
    },
    shuffleItems() {
      this.isShuffle = !this.isShuffle;
    },
  },
  computed: {
    shuffleSquares() {
      const squares = [];
      this.list.items.forEach((item) => {
        for (let i = 0; i < item.counter; i++) {
          squares.push(item);
        }
      });
      for (let i = squares.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [squares[i], squares[j]] = [squares[j], squares[i]];
      }
      return squares;
    },
    isExpandedState() {
      const hasActiveItems = this.list.items.some(item => item.isCheckedItem);
      return hasActiveItems ? this.isExpanded : false;
    },
  },
}
</script>

<style src="@/styles/list-item-graph.scss" lang="scss" scoped>

</style>