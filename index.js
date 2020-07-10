const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const { User } = require('./models/Users');
const mongoose = require('mongoose');

const config = require('./config/key');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json()); //이게 있어야 클라이언트의 정보를 받아줘서 req.body를 사용할 수 있음.

mongoose.connect(config.mongoURI
    , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
).then(() => { console.log("mongoDB connected") })
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!~~안녕'));

app.post('/register', (req, res) => {

    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res, json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    }); //몽고디비에서 사용할 수 있는거 mongodb에 user가 저장돰
}); //회원가입을 이용한 라우트









app.listen(port, () => console.log('Example app listening on port' + port + '!'));
