const {sequelize, dataType} = require('sequelize');

module.exports= (sequelize, dataType) => {
    const migration = sequelize.define("Migration", {
        migration: dataType.STRING,
        batch: dataType.INTEGER
    }, {
        timestamps: false
    })
    
    return migration;
}