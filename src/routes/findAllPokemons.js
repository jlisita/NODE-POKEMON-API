const { Pokemon } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/pokemons', (req,res) => {
        Pokemon.findAll()
        .then(pokemons => {
            const message = 'la liste des pokemons a bien été récupérée.'
            res.json({message, data: pokemons})
        })
    })
}