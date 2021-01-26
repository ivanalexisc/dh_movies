const {sequelize, dataType} = require('sequelize');

module.exports= (sequelize, dataType) => {
    const genre = sequelize.define("Genre", {
        name: dataType.STRING,
        ranking: dataType.INTEGER,
        active: dataType.INTEGER
    }, {
        timestamps: false,
        paranoid: true
    })
    genre.associate = (models => {
        genre.hasMany(models.Movie);
    })
    return genre;
}