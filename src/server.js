import express from 'express';
import pg from 'pg';
import cors from 'cors';

let app = express();
let pgConfig = {
  user: 'observer',
  password: 'password',
  database: 'bradyshicom',
  host: 'localhost',
  port: '5432',
  max: 50,
  idleTimeoutMillis: 1000,
};

let pool = new pg.Pool(pgConfig);

app.use(cors());
app.get('/blog', function(req, res) {
  pool.connect(function(err, client, release) {
    if (err) {
      res.status(500).send({
        error: 'Could not connect to the database!',
      });
    }

    client.query('SELECT * FROM blogposts', [], function(err, result) {
      if (err) {
        res.status(500).send({
          error: 'Blog could not be queried.',
          trace: err,
        });
      } else {
        res.send(result.rows);
      }
    });

    release();
  });
});

app.get('/projects', function(req, res) {
  pool.connect(function(err, client, release) {
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

    release();
  });
});

app.listen(8080, function() {
  console.log('Listening on port 8080!');
});
