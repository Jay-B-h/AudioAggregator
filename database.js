const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'database-2.cdkoqoy26e89.us-east-2.rds.amazonaws.com',
    user: 'cwh0015',
    password: 'g4se1Me0wuTx0onX9X3r',
    database: 'AudioAggregator'
})
module.exports = {connection}
