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

// QUERRIES
let qryIndexReset = 'SET @count = 0; ' + 'UPDATE ?? SET ??.`id` = @count:= @count + 1; ' + 'ALTER TABLE ?? AUTO_INCREMENT = 1;';
let qrySearchTableByFields = 'SELECT ??, ?? FROM ?? WHERE ?? LIKE ? AND ?? LIKE ?';
let qrySearchTableById = 'SELECT * FROM ?? WHERE id = ?';
let qrySearchTableAll = 'SELECT * FROM ??';
let qryInsertTable = 'INSERT INTO ?? SET ?';
let qryDeleteTable = 'DELETE FROM ?? WHERE id = ?';
let qryUpdateTable = 'UPDATE ?? SET ? WHERE id = ?';

app.get('/user', (req, res) => {
  const { table } = req.headers;
  db.query(qrySearchTableAll, [table], (err, result) => {
    if (err) { console.log(err, 'erro'); }
    if (result.length > 0) {
      res.send({ message: 'all user data', data: result });
    } else res.send({ message: 'data not found', data: result });
  })
})

app.get('/user/:id', (req, res) => {
  db.query(qrySearchTableById, [req.params.id], (err, result) => {
    if (err) { console.log(err, 'erro'); }
    if (result.length > 0) { res.send({ message: 'all user data', data: result }); }
    else { res.send({ message: 'data not found', data: result }); }
  })
})

app.post('/person', (req, res) => {
  const { table } = req.body;
  const { data } = { name, email, phone, gender, dob } = req.body;

  const setName = '%' + data.name + '%';
  const setEmail = '%' + data.email + '%';
  const fieldA = 'name';
  const fieldB = 'email';

  let sortDataQry = mysql.format(qryIndexReset, [table, table, table]);
  let searchDataQry = mysql.format(qrySearchTableByFields, [fieldA, fieldB, table, fieldA, setName, fieldB, setEmail]);
  let insertDataQry = mysql.format(qryInsertTable, [table, data]);

  db.query(sortDataQry);
  db.query(searchDataQry, (error, result) => {
    if (error) throw error;
    if (result.length > 0) console.log("usuario existente");
    else {
      db.query(insertDataQry, (error, result) => {
        if (error) throw error;
        if (result.length > 0) console.log(result.insertId)
      })
    }
  })
})


// PUT
app.put('/user/:id', (req, res) => {
  const { table } = req.body;
  const values = { name, email, phone, gender, dob } = req.body;
  db.query(resetIndex, [table, table, table]);
  db.query(qryUpdateTable, [table, values, req.params.id], (err, result) => {
    if (err) { console.log(err, 'erro'); }
    if (result.length > 0) { res.send({ message: 'all user data', data: result }); }
    else { res.send({ message: 'data not found', data: result }); }
  })
  db.end();
})

// DELETE
app.delete('/user/:id', (req, res) => {
  const { table } = req.headers;
  db.query(qryDeleteTable, [table, req.params.id], (err, result) => {
    if (err) { console.log(err, 'erro'); }
    if (result.length > 0) {
      res.send({ message: 'all user data', data: result });
    } else res.send({ message: 'data not found', data: result });
  })
  db.query(resetIndex, [table, table, table])
  db.end();
})


