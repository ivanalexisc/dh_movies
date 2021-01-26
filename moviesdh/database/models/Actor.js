const { sequelize, dataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    const actor = sequelize.define('Actor', {
        first_name: dataTypes.STRING,
        last_name: dataTypes.STRING,
        rating: dataTypes.INTEGER
    }, {
        timestamps: false
    })
    actor.associate = (models => {
        actor.belongsToMany(models.Movie, {
            as: 'peliculas',
            through: 'actor_movie'
        });
    })
    return actor;
}