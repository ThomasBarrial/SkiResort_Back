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

app.get('/api/MyWave/', (req, res) => {
  connection.query('SELECT * FROM SurfSpot', (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database');
    } else {
      res.status(200).json(result);
    }
  });
});

app.get('/api/MyWave/:id', (req, res) => {
  const spotId = req.params.id
 
connection.query('SELECT * FROM SurfSpot WHERE id = ?' ,[spotId], (err, result) => {
  
if (err) {  
  res.status(500).send('Error retrieving data from database');
} else {
  res.status(200).json(result);
}
});
});


app.post('/api/MyWave/', (req, res) => {
  const {  name, photo, description, webcam, condition, niveaux_ID, break_ID, lieu, acces_ID } = req.body
  connection.query(
    'INSERT INTO `SurfSpot` (`name`, `photo`, `description`, `webcam`, `condition`, `niveaux_ID`, `break_ID`, `lieu`, `acces_ID`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, photo, description, webcam, condition, niveaux_ID,  break_ID, lieu, acces_ID],
    (err, result) => {
      if(err) {
        res.status(500).send('Error saving the Spot');
        console.log(name)
        console.log(req.body)
        console.log(err)
      } else { 
        console.log(req.body)
        res.status(201).send('Spot successfully saved')
      }
    }
   )
})

app.put('/api/MyWave/:id', (req, res) => {
  const spotId = req.params.id
  console.log(spotId)
  const userPropsToUpdate = req.body;
  console.log(req.body)

  connection.query('UPDATE SurfSpot SET ? WHERE id = ?', [userPropsToUpdate, spotId], (err) => { if(err) {
    console.log(err)
    res.status(500).send('Error updating a user');
  } else {
    res.status(200).send('User updated successfully 🎉');
  }});
});


app.delete('/api/Mywave/:id', (req, res) => {
  const spotID = req.params.id
  console.log(spotID);
  connection.query('DELETE FROM SurfSpot WHERE id = ?', [spotID], (err) => {
    if(err) {
      console.log(err)
      res.status(500).send('Error deleting files')
    } else {
      res.status(200).send('Delete success')
    }
  })
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



