/* L’API Rest et la Base de données : Créer un modèle Sequelize */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: 'Le nom doit contenir des caractères.'},
          notNull: {msg: 'Le nom est une propriété requise.'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg: 'Utilisez uniquement des nombres entiers pour les points de vie.'},
          notNull: {msg: 'Les points de vie sont une propriété requise.'}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg: 'Utilisez uniquement des entiers pour points de dégâts.'},
          notNull: {msg: 'Les points de dégâts sont une propriété requise'}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {msg: 'Utilisez un URL valide pour l\'image;'},
          notNull: {msg: 'L\'URL de l\'image est une propriété requise'}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            return this.getDataValue('types').split(",");
        },
        set(types) {
            this.setDataValue('types',types.join());
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }