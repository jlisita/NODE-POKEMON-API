console.log("hello, node 🖐️");

const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon')
const { success } = require('./helper.js')
let pokemons = require('./mock-pokemon');
const app = express();
const port = 3000;

const logger = (req, res, next) => {
    console.log(`URL: ${req.url}`);
    next();
}

app
    .use(favicon((__dirname + '/favicon.ico')))
    .use(morgan('dev'))

app.get("/", (req,res) => res.send("hello again, express ! 🖐️"));

// app.get("/api/pokemons/1", (req,res) => res.send("hello Bulbizarre !"));

app.get("/api/pokemons/:id", (req,res) => 
{
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id);
    //res.send(`Vous avez demandé le pokémon ${pokemon.name}!`)
    const message = "un pokémon a bien été trouvé"
    res.json(success(message,pokemon));
});

app.get("/api/pokemons", (req,res) => 
{
    //res.send(`Il y a ${pokemons.length} pokémons dans le pokédex pour le moment!`)
    const message = "la liste des pokémons a bien été récupérée";
    res.json(success(message,pokemons));
});


app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`))