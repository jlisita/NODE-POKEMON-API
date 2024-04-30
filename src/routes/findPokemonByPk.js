const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons/:id', auth, (req,res) => {
        Pokemon.findByPk(req.params.id)
        .then(pokemon => {
            const message = 'un pokemon a bien été trouvé.'
            res.json({message, data: pokemon})
        })
        .catch(error => {
            const message = "le pokemon n'a pas pu être récupérée. Reéssayer dans quelques instants."
            res.status(500).json({message, data: error});
        })
    })
}