import express from 'express';
import pg from 'pg';

let app = express();
let pgConfig = {
  user: 'observer',
  password: 'password',
  database: 'bradyshicom',
  host: 'localhost',
  port: '5432',
};

let client = new pg.Client(pgConfig);

app.get('/projects', function(req, res) {
  client.connect(function(err) {
    if (err) {
      res.status(500).send({
        error: 'Could not connect to the database!',
      });
    }

    client.query('SELECT * FROM projects', [], function(err, result) {
      if (err) {
        res.status(500).send({
          error: 'Projects could not be queried.',
          trace: err,
        });
      } else {
        res.send(result.rows);
      }
    });
  });
});

app.listen(8080, function() {
  console.log('Listening on port 8080!');
});
