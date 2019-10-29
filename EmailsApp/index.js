const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;

app.get("/status", (req, res) => {
    console.log('[GET] /status')
    res.send({ status: "Funcionando" })
});

app.post("/email", (req, res) => {
    console.log('[POST] /email')
    const { employee, email, task } = req.body;

    console.log(`Enviando email a ${employee}`);
    const newEmail = {
        to: email,
        text: task
    };
    console.log(newEmail);
    
    res.send({
        status: "Enviado",
        email: newEmail
    });
});


app.listen(port, () => console.log(`EmailsApp escuchando en puerto ${port}!`));