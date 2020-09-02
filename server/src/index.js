const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa-cors");
const bodyParser = require("koa-bodyparser");

const { convertCurrency, getCountries } = require("./services/convertCurrency");

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

router.get("/", (ctx) => {
  ctx.body = "<h3>Server is running...</h3>";
});

router.get("/api/convert_currency", convertCurrency, (ctx) => {
  ctx.body = ctx.result;
});

router.get("/api/get_countries_currency", getCountries, (ctx) => {
  ctx.body = ctx.result;
});

app.use(router.routes());

app.on("error", (err) => {
  console.error("Got error: ", err);
});

app.listen(5000, () => {
  console.log(`Server is listening on http://localhost:${5000}`);
});
