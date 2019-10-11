const express = require('express')
const app = express()
const mysql = require('mysql2')
const fs = require('fs')

const port = process.env.PORT || 3000
const connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-02.cleardb.net',
  user: 'b4a233a820586a',
  database: 'heroku_7b047b086f614a8',
  password: '94c84c05',
  multipleStatements: true
})
// mysql://b4a233a820586a:94c84c05@us-cdbr-iron-east-02.cleardb.net/heroku_7b047b086f614a8?reconnect=true
// console.log(process.env.CLEARDB_DATABASE_URL)
// const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL)

connection.connect(err => {
  if (!err) {
    console.log('connected to db.')
  }
  connection.query(`show tables like 'contacts'`, (err, rows) => {
    if (rows.length === 0) {
      const sql = String(fs.readFileSync('./db.sql'))
      connection.query(sql, (err) => {
        if (!err) {
          console.log('database created.')
        }
      })
    }
  })
})

const user =
{
    user: "syscoin",
    password: "meEscolhe"
}

var str = '"mensagem": "Credenciais erradas."'

function getUser(req, res) {
    if (String(req.query.user).replace('"', '').replace('"', '') == user["user"]
        && String(req.query.password).replace('"', '').replace('"', '') == user["password"]) {
        res.send({
            "mensagem": "Meu nome completo é " + req.get('host') + ". Eu quero essa vaga!"
        });

    }
    else
        res.send(str)
};

app.get('/provasyscoin', function (req, res) {
    getUser(req, res);
})


app.listen(port, err => {
  if (!err) {
    console.log('server listening on port', port)
  } else {
    console.log(err)
  }
})
