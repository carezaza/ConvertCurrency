<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div class="result">
      {{
        loading
          ? "Converting..."
          : result
          ? result.to.value + " " + result.to.currency
          : "?"
      }}
    </div>

    <div class="currencyBox">
      <input v-model="amount" placeholder="Amount" type="number" />
      <div class="to">FROM</div>
      <select v-model="fromCurrency">
        <option disabled value="">Select Currency</option>
        <option
          v-for="item in listCurrency"
          v-bind:value="item.id"
          v-bind:key="item.id"
          >{{ item.id }}</option
        >
      </select>
      <div class="to">TO</div>
      <select v-model="toCurrency">
        <option disabled value="">Select Currency</option>
        <option
          v-for="item in listCurrency"
          v-bind:value="item.id"
          v-bind:key="item.id"
          >{{ item.id }}</option
        >
      </select>

      <button v-on:click="convertSubmit">Convert</button>
    </div>

    <p v-if="error" class="error">Please select the currency fields.</p>
  </div>
</template>

<script>
import { getCurrencyId, convertCurrency } from "../services/CurrencyService.js";

export default {
  name: "ConvertCurrency",
  props: {
    msg: String,
  },
  data() {
    return {
      listCurrency: [],
      fromCurrency: "",
      toCurrency: "",
      error: false,
      result: null,
      amount: 0,
      loading: false,
    };
  },
  methods: {
    convertSubmit: async function() {
      this.error = false;
      if (!this.fromCurrency || !this.toCurrency) {
        return (this.error = true);
      }
      this.loading = true;
      const result = await convertCurrency(
        this.amount,
        this.fromCurrency,
        this.toCurrency
      );

      this.result = result;
      this.loading = false;
    },
  },
  beforeMount: async function() {
    const res = await getCurrencyId();
    this.listCurrency = res;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

input {
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  outline: none;
  border: 1px solid grey;
  width: 100px;
  text-align: center;
}

.result {
  padding: 10px 20px;
  font-size: 18px;
  background: #f3f3f3;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: black;
  width: 100%;
  max-width: 200px;
  margin: auto;
}

.error {
  padding: 5px;
  color: red;
}

.to {
  padding: 10px;
}

button {
  padding: 10px 20px;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #42b983;
  color: #fff;
  border-radius: 3px;
  font-size: 16px;
  margin: 0 10px;
}

select {
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
}

button:hover {
  background-color: #4ecfa2;
}

.currencyBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
</style>
