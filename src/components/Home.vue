<template>
  <div id="home-view">
    <div class="title">Set Expression</div>
    <div class="d-flex align-self-start">
      <Variables :variables="variables" @change="addSymbolToExpression" />

      <div class="expression-layout mx-2 p-2">
        <div class="test">
          <div v-for="(exp, index) in expression" :key="index" class="expression-symbol mr-1 mb-1">
            <b-form-input
              :value="exp"
              class="expression-input"
              :disabled="typeof exp === 'string'"
              :type="typeof exp === 'string' ? 'text' : 'number'"
              @input="changeNumberInExpression($event, index)"
            />
            <b-icon-x-circle @click="removeSymbolsFromExpression(index)" class="remove-icon" />
          </div>
        </div>
      </div>

      <Operators :operators="[...operators, ...brackets]" @change="addSymbolToExpression" />
    </div>

    <div class="final-expression">
      <span class="mr-2">Result:</span>
      <span :class="{ error: !validation }">{{ validation ? expression.join("") : "#error" }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { validateBrackets, validateOperators, validateVariables } from "@/common/validators";

import Variables from "./partials/Variables.vue";
import Operators from "./partials/Operators.vue";

@Component({ components: { Variables, Operators } })
export default class Home extends Vue {
  variables: string[] = ["x", "y", "z"];
  operators: string[] = ["+", "-", "×", "÷"];
  brackets: string[] = ["(", ")"];

  expression: (string | number)[] = [];

  get result(): string {
    if (this.expression.length === 0) return "";

    return this.expression.join("");
  }

  get validation(): boolean {
    return (
      validateVariables(this.expression, this.variables) &&
      validateOperators(this.expression, this.operators) &&
      validateBrackets(this.expression, this.brackets)
    );
  }

  addSymbolToExpression(symbol?: string): void {
    if (symbol) this.expression.push(symbol);
    else this.expression.push(1);
  }

  removeSymbolsFromExpression(index: number): void {
    const length = this.expression.length;
    this.expression = this.expression.slice(-length, -length + index);
  }

  changeNumberInExpression(value: string, index: number): void {
    this.expression[index] = Number(value);
    this.expression = [...this.expression];
  }
}
</script>
<style lang="scss">
#home-view {
  margin: 0 auto;
  width: 90%;

  .expression-layout {
    width: 100%;
    background-color: #ebf5f5;

    .test {
      min-height: 50px;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;

      .expression-symbol {
        width: 80px;
        height: 40px;
        display: flex;
      }

      .expression-input {
        width: 70px;
        text-align: center;

        &:disabled {
          background-color: #eef1f5 !important;
        }

        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }
      }
      .remove-icon {
        margin-left: -7px;
        margin-top: -5px;
        color: #ff0000;
        background: #fff;
        border-radius: 50%;

        &:hover {
          cursor: pointer;
          background: #f3a4a4;
        }
      }
    }
  }

  .final-expression {
    width: 100%;
    height: 50px;
    padding: 15px;
    margin-top: 10px;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    background: #c7dcee;

    .error {
      color: red;
    }
  }

  .title {
    width: 100%;
    height: 50px;
    padding: 15px;
    margin-bottom: 10px;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    background: #c7eec7;
  }
}
</style>
