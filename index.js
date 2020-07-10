const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://wonhyung:0201@test.pkfgo.mongodb.net/<dbname>?retryWrites=true&w=majority'
    , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
).then(() => { console.log("mongoDB connected") })
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!~~안녕'));

app.listen(port, () => console.log('Example app listening on port' + port + '!'));
