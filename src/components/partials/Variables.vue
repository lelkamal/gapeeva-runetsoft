<template>
  <div>
    <div class="variables-layout">
      <b-button @click="addSymbolToExpression()" variant="light" class="mb-1">Number</b-button>
      <b-button
        v-for="v in variables"
        :key="v"
        @click="addSymbolToExpression(v)"
        class="buttons mb-1"
        variant="light"
      >
        {{ v }}
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class Variables extends Vue {
  @Prop() variables!: string[];

  @Emit("change")
  addSymbolToExpression(symbol?: string): string | number {
    return symbol ?? 1;
  }
}
</script>
<style scoped lang="scss">
.variables-layout {
  width: 100px;
  display: flex;
  flex-direction: column;
}
</style>
