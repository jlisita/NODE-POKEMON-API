const { Pokemon } = require('../db/sequelize');
const { Op } = require('sequelize'); 

module.exports = (app) => {
    app.get('/api/pokemons', (req,res) => {
        if(req.query.name)
        {
            const name = req.query.name;
            return Pokemon.findAll({
                where: {
                    name: {         // 'name' est la propriété du modèle pokémon
                        [Op.like]:`%${name}%` // 'name' est le critère de la recherche
                    }
                }
            })
            .then(pokemons => {
                const message = `il y a ${pokemons.length} pokémons qui correspeondent au terme de recherche ${name}`
                res.json({message,data:pokemons})
            })
        }
        else
        {
            Pokemon.findAll()
            .then(pokemons => {
                const message = 'la liste des pokemons a bien été récupérée.'
                res.json({message, data: pokemons})
            })
            .catch(error => {
                const message = "la liste des pokemons n'a pas pu être récupérée. Reéssayer dans quelques instants."
                res.status(500).json({message, data: error});
            })
        }

    })
}