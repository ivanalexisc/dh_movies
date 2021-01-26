const { sequelize, dataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    const serie = sequelize.define('Serie', {
        title: dataTypes.STRING,
        release_date: dataTypes.DATE,
        end_date: dataTypes.DATE
    }, {
        timestamps: false
    })
    return serie;
}