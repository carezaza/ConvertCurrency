import axios from "axios";

export const getCurrencies = async () => {
  const res = await axios.get("/api/get_currencies");
  return Object.values(res.data);
};

export const getConvertCurrency = async (amount, fromCurrency, toCurrency) => {
  const query = fromCurrency + "_" + toCurrency;
  const res = await axios.get(
    `/api/convert_currency?q=${query}&amount=${amount}`
  );

  return res.data;
};
