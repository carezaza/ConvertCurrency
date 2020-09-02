const axios = require("axios");
const { API_KEY } = require("./config");

// https://www.currencyconverterapi.com

async function convertCurrency(ctx, next) {
  const { q, amount } = ctx.query;
  const currency = q.split("_");
  fromCurrency = encodeURIComponent(currency[0]);
  toCurrency = encodeURIComponent(currency[1]);
  var query = q;

  var url =
    "https://free.currconv.com/api/v7/convert?q=" +
    query +
    "&compact=ultra&apiKey=" +
    API_KEY;

  try {
    const res = await axios.get(url);
    const total = amount * res.data[query];

    const result = {
      from: {
        value: amount,
        currency: fromCurrency,
      },
      to: {
        value: Math.round(total * 100) / 100,
        currency: toCurrency,
      },
    };
    ctx.response.status = 200;
    ctx.result = result;
    next();
  } catch (error) {
    ctx.response.status = 400;
    throw error;
  }
}

async function getCurrencies(ctx, next) {
  const url = "https://free.currconv.com/api/v7/currencies?apiKey=" + API_KEY;
  try {
    const res = await axios.get(url);
    ctx.response.status = 200;
    ctx.result = res.data.results;
    next();
  } catch (error) {
    ctx.response.status = 400;
    throw error;
  }
}

module.exports = { convertCurrency, getCurrencies };
