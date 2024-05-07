const mysql = require('mysql')

function CreateConnection(host, user, password) {
    const connection = mysql.createConnection({
        host: host,
        user: user,
        password: password
    })

    connection.connect()

    return connection
}

function CreateUser(connection, username, password, name, surname, phoneNumber) {
    connection.query(`INSERT INTO Users(Username, Password, Name, Surname, PhoneNumber) VALUES ('${username}', '${password}', '${name}', '${surname}', '${phoneNumber}')`, function(err) {
        if (err) throw err;
        else console.log("user added")
    })
}

function GetUser(connection, username) {
    connection.query(`select Username, Name, Surname, PhoneNumber from Users where Username = '${username}';`, function(err, rows, fields) {
        
    })
}

