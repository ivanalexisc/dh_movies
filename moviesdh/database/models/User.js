const { sequelize, dataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    const user = sequelize.define('User', {
        name: dataTypes.STRING,
        email: dataTypes.STRING,
        password: dataTypes.DATE
    }, {
        timestamps: false
    })
    return user;
}