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
let qrySearchTable1Field = 'SELECT ?? FROM ?? WHERE ?? LIKE ?';
let qrySearchTable2Fields = 'SELECT ??, ?? FROM ?? WHERE ?? LIKE ? AND ?? LIKE ?';
let qrySearchTable4Fields = 'SELECT ??, ??, ??, ?? FROM ?? WHERE ?? LIKE ? AND ?? LIKE ? AND ?? LIKE ? AND ?? LIKE ?';
let qrySearchTableById = 'SELECT * FROM ?? WHERE id = ?';
let qrySearchTableAll = 'SELECT * FROM ??';
let qryInsertTable = 'INSERT INTO ?? SET ?';
let qryDeleteTable = 'DELETE FROM ?? WHERE id = ?';
let qryUpdateTable = 'UPDATE ?? SET ? WHERE id = ?';
let qrySortTable = 'SELECT ?? FROM ?? ORDER BY ?? ASC;';

app.get('/user', (req, res) => {

  const { table } = req.headers;
  let sortDataQry = mysql.format(qrySortTable, ['name', table, 'name']);

  let qry = db.query(sortDataQry)
  console.log(qry.sql);
  db.query(qrySearchTableAll, [table], (err, result) => {
    if (err) { console.log(err, 'erro'); }
    if (result.length > 0) {
      res.send({ message: 'all user data', data: result });
    } else res.send({ message: 'data not found', data: result });
  })
})


app.get('/procedure', (req, res) => {

  const { table } = req.headers;
  let sortDataQry = mysql.format(qrySortTable, ['name', table, 'name']);

  db.query(sortDataQry, (err, result) => {
    if (err) throw err;
    if (result.length > 0) res.send({ message: 'all user data', data: result });
    else res.send({ message: 'data not found', data: result });
  })
})


app.get('/user/:id', (req, res) => {
  db.query(qrySearchTableById, [req.params.id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) { res.send({ message: 'all user data', data: result }); }
    else { res.send({ message: 'data not found', data: result }); }
  })
})


// MENU CADASTRO - CLIENTE
app.post('/cadastrarUsuario', (req, res) => {
  const { table } = req.body;
  const { data } = { name, email, phone, gender, dob } = req.body;

  const setName = '%' + data.name + '%';
  const setEmail = '%' + data.email + '%';
  const field1 = 'name';
  const field2 = 'email';

  let sortDataQry = mysql.format(qryIndexReset, [table, table, table]);
  let searchDataQry = mysql.format(qrySearchTable2Fields, [field1, field2, table, field1, setName, field2, setEmail]);
  let insertDataQry = mysql.format(qryInsertTable, [table, data]);

  db.query(sortDataQry);
  db.query(searchDataQry, (err, result) => {
    if (err) throw err;
    if (result.length > 0) console.log("usuario existente");
    else {
      db.query(insertDataQry, (error, result) => {
        if (error) throw error;
        if (result.length > 0) res.send({ message: 'user inserted', data: result.insertId })
      })
    }
  })
})

// MENU AGENDAMENTO
app.post('/cadastrarAgendamento', (req, res) => {
  const { table } = req.body;
  const { data } = { name, date, procedure, hours } = req.body;

  const setName = '%' + data.name + '%';
  const setDate = '%' + data.date + '%';
  const setProcedure = '%' + data.procedure + '%';
  const setHours = '%' + data.hours + '%';
  const field1 = 'name';
  const field2 = 'date';
  const field3 = 'procedure';
  const field4 = 'hours';

  let sortDataQry = mysql.format(qryIndexReset, [table, table, table]);
  let searchDataQry = mysql.format(qrySearchTable4Fields, [field1, field2, field3, field4, table, field1, setName, field2, setDate, field3, setProcedure, field4, setHours]);
  let insertDataQry = mysql.format(qryInsertTable, [table, data]);

  db.query(sortDataQry);
  db.query(searchDataQry, (err, result) => {
    if (err) throw err;
    if (result.length > 0) console.log("agendamento existente");
    else {
      db.query(insertDataQry, (error, result) => {
        console.log("agendamento inexistente");
        if (error) throw error;
        if (result.length > 0) res.send({ message: 'user inserted', data: result.insertId })
      })
    }
  })
})

// MENU PROCEDIMENTO
app.post('/cadastrarProcedimento', (req, res) => {
  const { table } = req.body;
  const { data } = { name } = req.body;

  const setName = '%' + data.name + '%';
  const field1 = 'name';

  let sortDataQry = mysql.format(qryIndexReset, [table, table, table]);
  let searchDataQry = mysql.format(qrySearchTable1Field, [field1, table, field1, setName]);
  let insertDataQry = mysql.format(qryInsertTable, [table, data]);

  db.query(sortDataQry);
  db.query(searchDataQry, (err, result) => {
    if (err) throw err;
    if (result.length > 0) console.log("procedimento existente");
    else {
      db.query(insertDataQry, (error, result) => {
        if (error) throw error;
        if (result.length > 0) res.send({ message: 'procedimento inserido', data: result.insertId })
      })
    }
  })
})

// UPDATE
app.put('/atualizarAgendamento/:id', (req, res) => {
  const { table } = req.body;
  const { data } = { name, date, procedure, hours } = req.body;

  let sortDataQry = mysql.format(qryIndexReset, [table, table, table]);
  let updateDataQry = mysql.format(qryUpdateTable, [table, data, req.params.id]);

  db.query(sortDataQry);
  db.query(updateDataQry, (err, result) => {
    if (err) throw err;
    if (result.length > 0) { res.send({ message: 'user updated', data: result }); }
    else res.send({ message: 'data not found' });
  })
})

// DELETE
app.delete('/deletar/:id', (req, res) => {
  const { table } = req.headers;
  let sortDataQry = mysql.format(qryIndexReset, [table, table, table]);
  let deleteDataQry = mysql.format(qryDeleteTable, [table, req.params.id]);

  db.query(deleteDataQry, (err, result) => {
    if (err) throw err
    if (result.length > 0) res.send({ message: 'data deleted', data: result.affectedRows });
    else res.send({ message: 'data not found' });
  })
  db.query(sortDataQry)
})


