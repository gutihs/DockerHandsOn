const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 4000;
let EMAIL_MANAGER_URL = process.env.EMAIL_MANAGER_URL;


app.get("/status", (req, res) => {
    console.log('[GET] /status')
    res.send({ status: "Funcionando" })
});


app.post("/task", (req, res) => {
    console.log('[POST] /tasks')
    const { employee, email, task } = req.body;

    console.log(`Creando tarea para empleado ${employee}`);
    const newTask = { 
        id: "786tIJHjkjkK578jd8jd8dD8j87397Jjosj",
        employee,
        email,
        task
    }
    console.log(newTask);

    if(EMAIL_MANAGER_URL) {
        console.log('Enviando data a EmailsApp...')

        axios.post(`${EMAIL_MANAGER_URL}/email`, newTask)
            .then(function ({ data }) {
                console.log(data);
            })
            .catch(function (error) {
                console.log(error);
          } );
    }

    res.send({
        status: "Creada", 
        task: newTask
    })
});


app.listen(port, () => console.log(`TasksApp escuchando en puerto ${port}!`));