const { Pokemon } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/pokemons', (req,res) => {
        Pokemon.findAll()
        .then(pokemons => {
            const message = 'la liste des pokemons a bien été récupérée.'
            res.json({message, data: pokemons})
        })
        .catch(error => {
            const message = "la liste des pokemons n'a pas pu être récupérée. Reéssayer dans quelques instants."
            res.status(500).json({message, data: error});
        })
    })
}