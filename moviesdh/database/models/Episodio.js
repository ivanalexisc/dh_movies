const {sequelize, dataType} = require('sequelize');

module.exports= (sequelize, dataType) => {
    const episode = sequelize.define("Episode", {
        title: dataType.STRING,
        number: dataType.INTEGER,
        release_date: dataType.DATE,
        rating: dataType.INTEGER
    }, {
        timestamps: false
    })
    return episode;
}