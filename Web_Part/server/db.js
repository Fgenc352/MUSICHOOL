const sql = require('mssql/msnodesqlv8')

const conn = new sql.ConnectionPool({
    server:'DESKTOP-TFFU6H3',
    database: 'MUSICHOOL',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true,
    }
})

module.exports = { conn }
