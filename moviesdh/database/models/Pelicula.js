const { sequelize, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const movie = sequelize.define('Movie', {
        title: DataTypes.STRING,
        rating: DataTypes.DOUBLE,
        awards: DataTypes.INTEGER,
        release_date: DataTypes.DATEONLY,
        length: DataTypes.INTEGER,
        genre_id: DataTypes.INTEGER
    }, {
        timestamps: false
    })
    movie.associate = (models => {
        movie.belongsTo(models.Genre);
        movie.belongsToMany(models.Actor, {
            as: 'actores',
            through: 'actor_movie'
        })
    })
    return movie;
};