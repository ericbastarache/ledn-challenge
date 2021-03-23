const express = require('express');
const cors = require('cors');
const accountsData = require('./data/accounts.json');
const app = express();

app.use(cors());

app.get('/data', (req, res) => {
    res.send(accountsData);
});


app.listen(3001, () => {
    console.log('App listening on 3001');
});
