const db = require("../db/connection")

exports.findElectronics = () => {
    return db.query(`SELECT * FROM electronics`).then(({rows}) => {
        return rows;
    })
}