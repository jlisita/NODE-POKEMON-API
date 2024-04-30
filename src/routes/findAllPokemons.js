const { Pokemon } = require('../db/sequelize');
const { Op } = require('sequelize'); 
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons', auth, (req,res) => {
        if(req.query.name)
        {
            const name = req.query.name;
            const limitReq = parseInt(req.query.limit) || 5;
            if (name.length < 2)
            {
                const message = 'Le terme de requête doit contenir au moins 2 caractères'
                return res.status(400).json({message})
            }
            return Pokemon.findAndCountAll({
                where: {
                    name: {         // 'name' est la propriété du modèle pokémon
                        [Op.like]:`%${name}%` // 'name' est le critère de la recherche
                    }
                },
                order:['name'],
                limit:limitReq
            })
            .then(({count,rows}) => {
                const message = `il y a ${count} pokémons qui correspondent au terme de recherche ${name}`
                res.json({message,data:rows})
            })
        }
        else
        {
            Pokemon.findAll({
                order:['name']
            })
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