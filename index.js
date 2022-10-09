const app = require("./app");
const port = process.env.PORT || 3977;

app.listen(port, () => {
  console.log(`Servidor SGL API REST @ puerto ${port}`);
});
