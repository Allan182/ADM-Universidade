const sql = require('mysql');

const connMySQL = () => {
    return sql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'universidade'
    });
}

module.exports = () => {
    return connMySQL;
}