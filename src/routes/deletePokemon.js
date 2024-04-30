const { Pokemon} = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.delete('/api/pokemons/:id', auth, (req,res) => {
        const id = req.params.id;
        Pokemon.findByPk(id).then( pokemon => {
            if(pokemon === null)
            {
                const message = "le pokémon n'existe pas, essayer avec une autre identifiant"
                res.status(404).json({message, data: error});
            }
            const pokemonDeleted = pokemon;
            return Pokemon.destroy( {
                
                where: {id: pokemon.id}
            })
            .then(_=> {
                const message = `Le pokemon avec l'iditifiant n° ${pokemonDeleted.id} a bien été supprimé`
                res.json({message, data: pokemonDeleted})
            })
            .catch(error => {
                const message = "le pokémon n'a pas pu être supprimé. Reéssayer dans quelques instants."
                res.status(500).json({message, data: error});
            })
        })
    })
}
        
    