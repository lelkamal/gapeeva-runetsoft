<template>
  <div class="operators-layout">
    <b-button v-for="o in operators" :key="o" @click="addSymbolToExpression(o)" class="mb-1" variant="light">
      {{ o }}
    </b-button>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class Operators extends Vue {
  @Prop() operators!: string[];

  @Emit("change")
  addSymbolToExpression(symbol: string): string {
    return symbol;
  }
}
</script>

<style scoped lang="scss">
.operators-layout {
  width: 100px;
  display: flex;
  flex-direction: column;
}
</style>
