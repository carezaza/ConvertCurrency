import axios from "axios";

export const getCurrencyId = async () => {
  const res = await axios.get("/api/get_countries_currency");
  return Object.values(res.data);
};

export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  const query = fromCurrency + "_" + toCurrency;
  const res = await axios.get(
    `/api/convert_currency?q=${query}&amount=${amount}`
  );

  return res.data;
};
