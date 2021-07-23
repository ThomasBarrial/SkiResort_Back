const connection = require('./db-config');
const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3000;

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log('connected to database with threadId :  ' + connection.threadId);
  }
});

app.use(express.json());
app.use(cors());

app.get('/api/skiresort/', (req, res) => {
  connection.query('SELECT * FROM Resorts', (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database');
    } else {
      res.status(200).json(result);
    }
  });
});

app.get('/api/skiresort/:id', (req, res) => {
  const resortId = req.params.id;

  connection.query('SELECT * FROM Resorts WHERE id = ?', [resortId], (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database');
    } else {
      res.status(200).json(result[0]);
    }
  });
});

app.post('/api/skiresort/', (req, res) => {
  const { name, Description, siteWeb, condition, images, massifID, scopeID, typeID, Altitude } = req.body;
  connection.query(
    'INSERT INTO `Resorts` (`name`, `Description`, `siteWeb`, `condition`, `images`, `massifID`, `scopeID`, `typeID`, `Altitude` ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, Description, siteWeb, condition, images, massifID, scopeID, typeID, Altitude],
    (err, result) => {
      if (err) {
        res.status(500).send('Error saving the Spot');
        console.log(name);
        console.log(req.body);
        console.log(err);
      } else {
        console.log(req.body);
        res.status(201).send('Spot successfully saved');
      }
    },
  );
});

app.put('/api/skiresort/:id', (req, res) => {
  const resortId = req.params.id;
  const resortPropsToUpdate = req.body;
  console.log(req.body);

  connection.query('UPDATE Resorts SET ? WHERE id = ?', [resortPropsToUpdate, resortId], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error updating a user');
    } else {
      res.status(200).send('User updated successfully 🎉');
    }
  });
});

app.delete('/api/skiresort/:id', (req, res) => {
  const resortID = req.params.id;
  connection.query('DELETE FROM Resorts WHERE id = ?', [resortID], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting files');
    } else {
      res.status(200).send('Delete success');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
