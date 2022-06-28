import express from "express";
import mercadopago from "mercadopago";
const app = express();
const port = 7000;

mercadopago.configure({
  sandbox: true,
  access_token:
    "TEST-5503566842266474-062622-ba85d681ded3c475af881adc34b5d02f-774185910",
});

app.get("/", (req, res) => {
  res.send("Olá mundo!");
});

app.get("/pagar", async (req, res) => {
  let id = "" + Date.now();
  let email = "diones334@gmail.com";

  let dados = {
    payer_email: email,
    items: [
      {
        id: id,
        title: 'Notebook Dell Inspiron 15',
        unit_price: parseFloat(1000),
        quantity: 1,
      }
    ]
  };

  try {
    let pagamento = await mercadopago.preferences.create(dados);
    console.log(pagamento);
    return res.redirect(pagamento.body.init_point);
  } catch (err) {
    console.log(err);
    return res.send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando no endereço http://localhost:${port}`);
});
