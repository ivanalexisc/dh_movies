const { sequelize, dataTypes } = require('sequelize');

module.exports = (sequelize, dataType) => {
    const season = sequelize.define('Season', {
        title: dataType.STRING,
        number: dataType.INTEGER,
        release_date: dataType.DATE,
        end_date: dataType.DATE
    }, {
        timestamps: false
    })
    return season;
}