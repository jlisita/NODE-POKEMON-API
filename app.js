const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize')

const app = express();
const port = 3000;


app
    .use(favicon((__dirname + '/favicon.ico')))
    .use(morgan('dev'))
    .use(bodyParser.json())

    sequelize.initDb();

    // ici nous placerons nos futurs points de temrinaison.
    require('./src/routes/findAllPokemons')(app)
    require('./src/routes/findPokemonByPk')(app)
    require('./src/routes/createPokemon')(app)
    require('./src/routes/updatePokemon')(app)
    require('./src/routes/deletePokemon')(app)
    require('./src/routes/login')(app)

    // on ajoute la gestion des erreur 404
    app.use(({res}) =>  {
        const message = 'impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL'
        res.status(404).json({message})
    })

app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`))