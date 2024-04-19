console.log("hello, node 🖐️");

const express = require('express');
const app = express();
const port = 3000;

app.get("/", (req,res) => res.send("hello again, express ! 🖐️"));

app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`))