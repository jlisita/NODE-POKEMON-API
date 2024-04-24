const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const { success, getUniqueId } = require('./helper.js')
let pokemons = require('./mock-pokemon');

const app = express();
const port = 3000;


const sequelize = new Sequelize(
    'pokedex',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT+1'
        },
        logging: false
    }
)

sequelize.authenticate()
.then(_=> console.log("la connexion à la base de données a bien été établie"))
.catch(error =>console.error(`impossible de se connecter à la base de données ${error}`))

const logger = (req, res, next) => {
    console.log(`URL: ${req.url}`);
    next();
}

app
    .use(favicon((__dirname + '/favicon.ico')))
    .use(morgan('dev'))
    .use(bodyParser.json())

app.get("/", (req,res) => res.send("hello again, express ! 🖐️"));

// app.get("/api/pokemons/1", (req,res) => res.send("hello Bulbizarre !"));

// récupérer un pokemon

app.get("/api/pokemons/:id", (req,res) => 
{
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id);
    const message = "un pokémon a bien été trouvé"
    res.json(success(message,pokemon));
});

// Récupérer l'ensmble des pokemons 

app.get("/api/pokemons", (req,res) => 
{
    //res.send(`Il y a ${pokemons.length} pokémons dans le pokédex pour le moment!`)
    const message = "la liste des pokémons a bien été récupérée";
    res.json(success(message,pokemons));
});

// ajouter un nouveau pokemon

app.post("/api/pokemons", (req,res) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = {...req.body, ...{id:id ,created:new Date}}
    pokemons.push(pokemonCreated);
    const message = `Le pokemon ${pokemonCreated.name} a bien été créé`;
    res.json(success(message, pokemonCreated));
});


// modifier un pokemon

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
     return pokemon.id === id ? pokemonUpdated : pokemon
    });
     
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
   });
   
// supprimer un pokemon

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
  });

app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`))