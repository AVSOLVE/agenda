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



// FUNCTION QUERIES ###############################################################################################################
function sortTableQuery(selectField, table, orderByField) {
  return mysql.format('SELECT ?? FROM ?? ORDER BY ?? ASC;', [selectField, table, orderByField]);
}

function searchAllQuery(table) {
  return mysql.format('SELECT * FROM ??;', [table]);
}

function orderAscQuery(table, orderByField) {
  return mysql.format('SELECT * FROM ?? ORDER BY ?? ASC;', [table, orderByField]);
}

function searchByIdQuery(table, id) {
  return mysql.format('SELECT * FROM ?? WHERE id = ?;', [table, id]);
}

function insertStaffQuery(table, data) {
  return mysql.format('INSERT INTO ?? (id, name, services, weekday, time) VALUES (?, ?, ?, ?, ?);', [table, data.id, data.name, JSON.stringify(data.services), data.weekday, JSON.stringify(data.time)]);
}

function insertUserQuery(table, data) {
  return mysql.format('INSERT INTO ?? (name, cpf, cep, dob, email, gender, phone, state, city, neighborhood, address, number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [table, data.name, data.cpf, data.cep, data.dob, data.email, data.gender, data.phone, data.state, data.city, data.neighborhood, data.address, data.number]);
}

function insertGenericQuery(table, data) {
  return mysql.format('INSERT INTO ?? SET ?;', [table, data]);
}

function searchOneFieldQuery(selectField, table, searchTerm) {
  return mysql.format('SELECT ?? FROM ?? WHERE ?? LIKE ?;', [selectField, table, selectField, `%${searchTerm}%`]);
}

function searchFourFieldsQuery(selectField1, selectField2, selectField3, selectField4, table, searchTerm1, searchTerm2, searchTerm3, searchTerm4) {
  return mysql.format('SELECT ??, ??, ??, ?? FROM ?? WHERE ?? LIKE ? AND ?? LIKE ? AND ?? LIKE ? AND ?? LIKE ?;', [selectField1, selectField2, selectField3, selectField4, table, selectField1, `%${searchTerm1}%`, selectField2, `%${searchTerm2}%`, selectField3, `%${searchTerm3}%`, selectField4, `%${searchTerm4}%`]);
}

function searchTwoFieldsQuery(table, selectField1, selectField2, whereField1, whereField2, searchTerm1, searchTerm2) {
  return mysql.format('SELECT ??, ?? FROM ?? WHERE ?? LIKE ? AND ?? LIKE ?;', [selectField1, selectField2, table, whereField1, `%${searchTerm1}%`, whereField2, `%${searchTerm2}%`]);
}

function deleteQuery(table, id) {
  return mysql.format('DELETE FROM ?? WHERE id = ?;', [table, id]);
}

function updateQuery(table, data, id) {
  return mysql.format('UPDATE ?? SET ? WHERE id = ?;', [table, data, id]);
}

function indexResetQuery(table) {
  return `
    SET @count = 0;
    UPDATE \`${table}\` SET \`${table}\`.\`id\` = @count := @count + 1;
    ALTER TABLE \`${table}\` AUTO_INCREMENT = 1;
  `;
}

function getQueryById(id, table, data) {
  if (id === 'staff') return insertStaffQuery(table, data);
  if (id === 'user') return insertUserQuery(table, data);
  else return insertGenericQuery(table, data);
}

function responseMsg(id) {
  if (id === 'clients') return 'Cliente'
  if (id === 'staff') return 'Colaborador'
  if (id === 'users') return 'Usuário'
}


// GET ANY  ###############################################################################################################
app.get('/:id', (req, res) => {
  const { table } = req.headers;
  const selectField = 'name';
  db.query(sortTableQuery(selectField, table, selectField))

  if (req.params.id === 'staff' || req.params.id === 'agenda' || req.params.id === 'user' || req.params.id === 'procedure' || req.params.id === 'hours') {
    db.query(searchAllQuery(table), (err, result) => {
      if (err) res.status(400).send({ message: 'Dados não carregados!', data: err });
      else {
        db.query(orderAscQuery(table, selectField), (err, result) => {
          res.status(200).send({ message: 'Dados carregados!', data: result });
        });
      }
    })
  }

  else {
    db.query(searchByIdQuery(table, req.params.id), (err, result) => {
      if (err) res.status(400).send({ message: 'Dados do id:' + req.params.id + 'não carregados!', data: err });
      else res.status(200).send({ message: 'Dados do id:' + req.params.id + ' carregados!', data: result });
    })
  }
})

// DELETE ANY  ###############################################################################################################
app.delete('/:id', (req, res) => {
  const { table } = req.headers;
  db.query(deleteQuery(table, req.params.id), (err, result) => {
    if (err) res.status(400).send({ message: 'Dados do id:' + req.params.id + 'não deletados!', data: err });
    else res.status(200).send({ message: 'Dados do id:' + req.params.id + ' deletados!', data: result });
  })
  db.query(indexResetQuery(table))
})





// POST ANY  ###############################################################################################################
app.post('/:id', (req, res) => {
  const { data, table } = req.body;
  const field1 = 'name';
  const setName = '%' + data.name + '%';
  const setEmail = '%' + data.email + '%';
  const setDate = '%' + data.date + '%';
  const setService = '%' + data.service + '%';
  const setHours = '%' + data.hours + '%';


  function generateInsertStaffQuery(data, table) {
    const name = data.name;
    const services = JSON.stringify(data.services);
    const weekday = JSON.stringify(data.weekday);
    const time = JSON.stringify(data.time);

    const query =
      `INSERT INTO ${table} (name, services, weekday, time) VALUES (
      '${name}',
      '${services}',
      '${weekday}',
      '${time}')`;

    return query;
  }

  const msg = responseMsg(req.params.id);
  db.query(indexResetQuery(table));
  if (req.params.id === 'clients' || req.params.id === 'staff' || req.params.id === 'users') {
    db.query(searchOneFieldQuery(field1, table, setName), (err, result) => {
      if (result.length > 0) res.status(400).send({ message: msg + ' existente', data: result });
      else {
        db.query(generateInsertStaffQuery(data, table), (err, result) => {
          if (err) res.status(404).send({ message: msg + ' não cadastrado!', data: err });
          else res.status(202).send({ message: msg + ' cadastrado!', data: result });
        })
      }
    })
  }

  if (req.params.id === 'agenda') {
    const field2 = 'date';
    const field3 = 'service';
    const field4 = 'hours';
    db.query(searchFourFieldsQuery(field1, field2, field3, field4, table, setName, setDate, setService, setHours), (err, result) => {
      if (result.length > 0) res.status(400).send({ message: 'Agendamento existente!', data: result });
      else {
        db.query(insertGenericQuery(table, data), (err, result) => {
          if (err) res.status(404).send({ message: 'Agendamento não cadastrado!', data: err });
          else res.status(202).send({ message: 'Agendamento cadastrado!', data: result });
        })
      }
    })
  }

  if (req.params.id === 'procedures') {
    db.query(searchOneFieldQuery(field1, table, setName), (err, result) => {
      if (result.length > 0) res.status(400).send({ message: 'Procedimento existente' })
      else {
        db.query(insertGenericQuery(table, data), (err, result) => {
          if (err) res.status(404).send({ message: 'Procedimento não cadastrado!', data: err });
          else res.status(202).send({ message: 'Procedimento cadastrado!', data: result });
        })
      }
    })
  }
})

// PUT ANY  ###############################################################################################################
app.put('/:id', (req, res) => {
  const { data, table } = req.body;
  db.query(indexResetQuery(table));
  db.query(updateQuery(table, data, req.params.id), (err, result) => {
    if (err) res.status(400).send({ message: 'Dados do id: ' + req.params.id + ' não atualizados!', data: err });
    else res.status(200).send({ message: 'Dados do id: ' + req.params.id + ' atualizados!', data: result });
  })
})
