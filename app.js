const express = require('express');
const app = express();
const port = 3000;
const knex = require('knex');
const pass = require('./pass'); //Low-security security :D
const bp = require('body-parser');

app.use(bp.json());

const db = knex({                   
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'butter',
      password : pass.password,
      database : 'todolist'
    }
  });

app.get('/', (req,res) => {
  db.select('*').from('entries').then(data => {
    res.json({entries: data});
  });
})

app.post('/addentry', (req,res) => {
  const {title, info, deadline, priority, star} = req.body; 
  db('entries').insert({
    title: title,
    info: info,
    deadline: deadline,
    priority: priority,
    star: star
  })
  .then(res.send('Added'))
  .catch(err => {res.status(400).send('Error')})
});

app.post('/delete', (req,res) => {
  const {id} = req.body;
  db('entries').where({id: id}).del()
  .then(res.send('Deleted'))
  .catch(err => {res.status(400).send('Error')})
})

app.listen(port, () => {
  console.log('app is running on port ' + port);
});