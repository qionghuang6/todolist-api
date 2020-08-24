const express = require('express')
const app = express()
const port = 3000
const knex = require('knex')
const pass = require('./pass') //pass.js is hidden from github!

const db = knex({                   
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'butter',
      password : pass.password,
      database : 'todolist'
    }
  });

db.select('*').from('entries').then(data => {
    console.log(data);
});


app.listen(port, ()=> {
    console.log('app is running on port ' + port);
})