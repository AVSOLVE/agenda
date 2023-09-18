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
let qryOrderAsc = 'SELECT * FROM ?? ORDER BY ?? ASC';
let qrySearchTable1Field = 'SELECT ?? FROM ?? WHERE ?? LIKE ?';
let qrySearchTable2Fields = 'SELECT ??, ?? FROM ?? WHERE ?? LIKE ? AND ?? LIKE ?';
let qrySearchTable4Fields = 'SELECT ??, ??, ??, ?? FROM ?? WHERE ?? LIKE ? AND ?? LIKE ? AND ?? LIKE ? AND ?? LIKE ?';
let qrySearchTableById = 'SELECT * FROM ?? WHERE id = ?';
let qrySearchTableAll = 'SELECT * FROM ??';
let qryInsertTable = 'INSERT INTO ?? SET ?';
let qryDeleteTable = 'DELETE FROM ?? WHERE id = ?';
let qryUpdateTable = 'UPDATE ?? SET ? WHERE id = ?';
let qrySortTable = 'SELECT ?? FROM ?? ORDER BY ?? ASC;';

// GET ANY
app.get('/:id', (req, res) => {
  const { table } = req.headers;
  const field1 = 'name';
  db.query(qrySortTable, [field1, table, field1])

  if (req.params.id === 'user' || req.params.id === 'agenda' || req.params.id === 'procedure' || req.params.id === 'hours') {
    db.query(qrySearchTableAll, [table], (err, result) => {
      if (err) res.status(400).send({ message: 'Dados não carregados!' });
      else {
          db.query(qryOrderAsc, [table, field1], (err, result) => {
          res.status(200).send({ message: 'Dados carregados!', data: result });
        });
      }
    })
  }

  else {
    db.query(qrySearchTableById, [req.params.id], (err, result) => {
      if (err) res.status(400).send({ message: 'Dados do id:' + req.params.id + 'não carregados!' });
      else res.status(200).send({ message: 'Dados do id:' + req.params.id + ' carregados!' });
    })
  }
})


// DELETE ANY
app.delete('/:id', (req, res) => {
  const { table } = req.headers;
  let deleteDataQry = mysql.format(qryDeleteTable, [table, req.params.id]);

  db.query(deleteDataQry, (err, result) => {
    if (err) res.status(400).send({ message: 'Dados do id:' + req.params.id + 'não deletados!' });
    else res.status(200).send({ message: 'Dados do id:' + req.params.id + ' deletados!' });
  })
  db.query(qryIndexReset, [table, table, table])
})

// POST ANY
app.post('/:id', (req, res) => {
  const { data, table } = req.body;
  const field1 = 'name';
  const setName = '%' + data.name + '%';
  const setEmail = '%' + data.email + '%';
  const setDate = '%' + data.date + '%';
  const setProcedure = '%' + data.procedure + '%';
  const setHours = '%' + data.hours + '%';
  let insertDataQry = mysql.format(qryInsertTable, [table, data]);
  db.query(qryIndexReset, [table, table, table]);

  if (req.params.id === 'clients' || req.params.id === 'staff' || req.params.id === 'users') {
    const field2 = 'email';
    const msg = (req.params.id === 'clients' ? 'Cliente' : (req.params.id === 'staff' ? 'Colaborador' : 'Usuário'));
    let searchDataQry = mysql.format(qrySearchTable2Fields, [field1, field2, table, field1, setName, field2, setEmail]);
    db.query(searchDataQry, (err, result) => {
      if (result.length > 0) res.status(400).send({ message: msg + ' existente', data: result });
      else {
        db.query(insertDataQry, (err, result) => {
          if (err) res.status(404).send({ message: msg + ' não cadastrado!' });
          else res.status(202).send({ message: msg + ' cadastrado!', data: result });
        })
      }
    })
  }

  if (req.params.id === 'agenda') {
    const field2 = 'date';
    const field3 = 'procedure';
    const field4 = 'hours';

    let searchDataQry = mysql.format(qrySearchTable4Fields, [field1, field2, field3, field4, table, field1, setName, field2, setDate, field3, setProcedure, field4, setHours]);

    db.query(searchDataQry, (err, result) => {
      if (result.length > 0) res.status(400).send({ message: 'Agendamento existente!', data: result });
      else {
        db.query(insertDataQry, (err, result) => {
          if (err) res.status(404).send({ message: 'Agendamento não cadastrado!' });
          else res.status(202).send({ message: 'Agendamento cadastrado!', data: result });
        })
      }
    })
  }

  if (req.params.id === 'procedures') {
    let searchDataQry = mysql.format(qrySearchTable1Field, [field1, table, field1, setName]);

    db.query(searchDataQry, (err, result) => {
      if (result.length > 0) res.status(400).send({ message: 'Procedimento existente' })
      else {
        db.query(insertDataQry, (err, result) => {
          if (err) res.status(404).send({ message: 'Procedimento não cadastrado!' });
          else res.status(202).send({ message: 'Procedimento cadastrado!', data: result });
        })
      }
    })
  }
})

// PUT ANY
app.put('/:id', (req, res) => {
  const { data, table } = req.body;

  let updateDataQry = mysql.format(qryUpdateTable, [table, data, req.params.id]);

  db.query(qryIndexReset, [table, table, table]);
  db.query(updateDataQry, (err, result) => {
    if (err) res.status(400).send({ message: 'Dados do id:' + req.params.id + 'não atualizados!' });
    else res.status(200).send({ message: 'Dados do id:' + req.params.id + ' atualizados!' });
  })
})
