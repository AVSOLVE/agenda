const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('server running');
})

const db = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'root',
  database: 'teste',
  multipleStatements: true,
});

db.connect(err => {
  if (err) { console.error('error connecting: ' + err.stack); }
  console.log('connected as id ' + db.threadId);
});

// RESET AUTO_INCREMENT AND ORGANIZE IDS
const resetIndex = 'SET @count = 0;' + 'UPDATE ?? SET ??.`id` = @count:= @count + 1;' + 'ALTER TABLE ?? AUTO_INCREMENT = 1;';

// GETTERS
app.get('/user', (req, res) => {
  const { table } = req.headers;
  let qry = 'SELECT * FROM ??';
  db.query(qry, [table], (err, result) => {
    if (err) { console.log(err, 'erro'); }
    if (result.length > 0) {
      res.send({ message: 'all user data', data: result });
    } else res.send({ message: 'data not found', data: result });
  })
})



app.get('/user/:id', (req, res) => {
  let qry = 'SELECT * FROM pessoa WHERE id = ' + req.params.id;
  db.query(qry, (err, result) => {
    if (err) { console.log(err, 'erro'); }
    if (result.length > 0) { res.send({ message: 'all user data', data: result }); }
    else { res.send({ message: 'data not found', data: result }); }
  })
})

// POSTERS
app.post('/user', (req, res) => {

  const { table } = req.body;
  const { data } = { name, email, phone, gender, dob } = req.body;

  db.query(resetIndex, [table, table, table])

  var query = db.query('INSERT INTO ?? SET ?', [table, data], (err, result) => {

    if (err) { console.log(err, 'erro'); }
    if (result.length > 0) { res.send({ message: 'all user data', data: result }); }
    else { res.send({ message: 'data not found', data: result }); }
  })

  console.log(query.sql);
});

// PUT
app.put('/user/:id', (req, res) => {
  const table = 'pessoa';
  const values = { name, email, phone, gender, dob } = req.body;
  const id = req.params.id;
  const qr = 'UPDATE ?? SET ? WHERE id = ?';

  db.query(resetIndex, [table, table, table])

  var query = db.query(qr, [table, values, id], (err, result) => {

    if (err) { console.log(err, 'erro'); }
    if (result.length > 0) { res.send({ message: 'all user data', data: result }); }
    else { res.send({ message: 'data not found', data: result }); }
  })
  console.log(query.sql);
})

// DELETE
app.delete('/user/:id', (req, res) => {
  const { table } = req.headers;
  let qry = 'DELETE FROM ?? WHERE id = ' +req.params.id;
  db.query(qry, [table], (err, result) => {
    if (err) { console.log(err, 'erro'); }
    if (result.length > 0) {
      res.send({ message: 'all user data', data: result });
    } else res.send({ message: 'data not found', data: result });
  })
  db.query(resetIndex, [table, table, table])
})
